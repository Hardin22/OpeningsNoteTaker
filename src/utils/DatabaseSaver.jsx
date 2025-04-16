import { doc, updateDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Classe per gestire salvataggi intelligenti
export class DatabaseSaver {
    constructor() {
        this.pendingChanges = false;
        this.lastSaveTime = Date.now();
        this.saveInterval = 60000; // 1 minuto come default
        this.minTimeBetweenSaves = 30000; // 30 secondi minimi tra salvataggi
        this.timer = null;
        this.currentlyFlushing = false;
        this.canvasData = null;
        this.userId = null;
        this.repertoireId = null;
        this.isSavingEnabled = true;
    }

    initialize(userId, repertoireId, initialData) {
        this.userId = userId;
        this.repertoireId = repertoireId;
        this.canvasData = initialData;

        // Salva anche l'ID del repertorio attivo in localStorage
        //localStorage.setItem('activeRepertoireId', repertoireId);

        // Avvia il timer di salvataggio
        this.startSaveTimer();

        // Registra gli eventi per salvataggio prima della chiusura pagina
        this.registerPageExitHandlers();

        console.log(`DatabaseSaver inizializzato con repertorio ID: ${repertoireId}`);
        return this;
    }

    setCanvasData(data) {
        this.canvasData = data;
        this.pendingChanges = true;
    }

    startSaveTimer() {
        // Pulisci il timer esistente se necessario
        if (this.timer) {
            clearInterval(this.timer);
        }

        // Avvia un nuovo timer
        this.timer = setInterval(() => this.checkAndSave(), this.saveInterval);
    }

    // Decide se salvare in base a vari fattori
    async checkAndSave() {
        // Non fare nulla se il salvataggio è disabilitato
        if (!this.isSavingEnabled) return;

        // Salta se non ci sono cambiamenti
        if (!this.pendingChanges) return;

        // Salta se è passato troppo poco tempo dall'ultimo salvataggio
        const timeSinceLastSave = Date.now() - this.lastSaveTime;
        if (timeSinceLastSave < this.minTimeBetweenSaves) return;

        // Salva i dati
        await this.flushToDatabase();
    }

    // Forza un salvataggio immediato
    async forceSave() {
        if (!this.userId || !this.repertoireId || !this.canvasData) {
            console.warn('Impossibile salvare: dati insufficienti', {
                userId: !!this.userId,
                repertoireId: this.repertoireId,
                hasCanvasData: !!this.canvasData,
            });
            return false;
        }

        return this.flushToDatabase();
    }

    // Effettua il salvataggio nel database
    async flushToDatabase() {
        // Evita salvataggi simultanei
        if (this.currentlyFlushing) return false;

        try {
            this.currentlyFlushing = true;

            const repertoireRef = doc(db, 'chessRepertoires', this.repertoireId);

            const dataToSave = {
                canvasData: JSON.stringify(this.canvasData),
                updatedAt: new Date().toISOString(),
                uid: this.userId,
            };

            await updateDoc(repertoireRef, dataToSave);

            // Salva anche in localStorage CON ID del repertorio
            

            this.lastSaveTime = Date.now();
            this.pendingChanges = false;
            console.log('Salvataggio nel database completato', new Date().toLocaleTimeString());

            return true;
        } catch (error) {
            console.error('Errore durante il salvataggio nel database:', error);
            return false;
        } finally {
            this.currentlyFlushing = false;
        }
    }

    // Crea un nuovo repertorio
    async createNewRepertoire(title) {
        if (!this.userId || !this.canvasData) {
            console.warn('Impossibile creare repertorio: dati insufficienti');
            return null;
        }

        try {
            const newRepertoireRef = doc(collection(db, 'chessRepertoires'));
            const repertoireData = {
                title: title || 'Nuovo Repertorio',
                canvasData: JSON.stringify(this.canvasData),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                uid: this.userId,
            };

            await setDoc(newRepertoireRef, repertoireData);

            // Aggiorna l'ID del repertorio attivo
            this.repertoireId = newRepertoireRef.id;

            // Salva in localStorage con il nuovo ID
            
            this.lastSaveTime = Date.now();
            this.pendingChanges = false;

            return newRepertoireRef.id;
        } catch (error) {
            console.error('Errore nella creazione del repertorio:', error);
            return null;
        }
    }

    // Cambia il repertorio attivo
    changeActiveRepertoire(repertoireId, canvasData) {
        // Salva eventuali modifiche pendenti prima di cambiare
        if (this.pendingChanges && this.repertoireId) {
            this.forceSave();
        }

        // Cambia l'ID del repertorio
        this.repertoireId = repertoireId;
        this.canvasData = canvasData;
        this.pendingChanges = false; // Non ci sono ancora modifiche nel nuovo repertorio

        // Aggiorna localStorage
        
    }

    // Gestori per la chiusura della pagina
    registerPageExitHandlers() {
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        window.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    // Rimuovi i gestori di eventi
    removePageExitHandlers() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        window.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    handleBeforeUnload(event) {
        if (this.pendingChanges) {
            // Forza il salvataggio immediatamente
            this.forceSave();

            // Mostra un messaggio di conferma all'utente
            const message = 'Hai modifiche non salvate. Sei sicuro di voler lasciare la pagina?';
            event.returnValue = message;
            return message;
        }
    }

    handleVisibilityChange() {
        // Quando la pagina diventa nascosta (l'utente cambia scheda/minimizza)
        if (document.visibilityState === 'hidden' && this.pendingChanges) {
            this.forceSave();
        }
    }

    // Cleanup alla chiusura
    cleanup() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.removePageExitHandlers();
    }
}

// Istanza singleton
export const databaseSaver = new DatabaseSaver();
