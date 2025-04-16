import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Funzioni per gestire la collection chessRepertoires
/**
 * Recupera tutti i repertori di un utente specifico con relativi dati completi
 *
 * @param {string} userId - ID utente
 * @returns {Promise<Array>} Array di repertori con dati completi
 */
export const getUserRepertoires = async (userId) => {
    try {
        console.log('Fetching repertoires for user:', userId);
        const repertoiresRef = collection(db, 'chessRepertoires');
        const q = query(repertoiresRef, where('uid', '==', userId));
        const querySnapshot = await getDocs(q);

        const repertoires = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log('Retrieved repertoire document:', doc.id, data);

            // Assicuriamoci che ci sia un titolo, altrimenti usiamo uno predefinito
            const repertoire = {
                id: doc.id,
                title: data.title || 'Repertorio senza titolo',
                color: data.color || 'white',
                moves: data.canvasData?.nodes?.length || 0,
                canvasData: data.canvasData || {},
                uid: data.uid,
                createdAt: data.createdAt || new Date(),
            };

            repertoires.push(repertoire);
        });

        console.log('Total repertoires found:', repertoires.length);
        return repertoires;
    } catch (error) {
        console.error('Error fetching user repertoires:', error);
        throw error;
    }
};

/**
 * Salva o aggiorna un repertorio nel database
 *
 * @param {string} userId - ID utente
 * @param {string} repertoireId - ID del repertorio (opzionale per nuove creazioni)
 * @param {string} title - Titolo del repertorio
 * @param {object} canvasData - Dati del canvas da salvare
 * @param {string} color - Colore del repertorio ('white' o 'black')
 * @returns {Promise<string>} ID del repertorio creato/aggiornato
 */
export const saveRepertoire = async (
    userId,
    repertoireId = null,
    title,
    canvasData,
    color = 'white'
) => {
    try {
        // Prepara i dati da salvare
        const repertoireData = {
            uid: userId,
            title,
            canvasData,
            color,
            moves: canvasData.nodes?.length || 0,
            lastUpdated: new Date(),
        };

        // Se esiste già un ID, aggiorna il documento esistente
        if (repertoireId) {
            const repertoireRef = doc(db, 'chessRepertoires', repertoireId);
            await updateDoc(repertoireRef, repertoireData);
            return repertoireId;
        }
        // Altrimenti crea un nuovo documento
        else {
            const repertoiresRef = collection(db, 'chessRepertoires');
            const newDoc = await addDoc(repertoiresRef, repertoireData);
            return newDoc.id;
        }
    } catch (error) {
        console.error('Error saving repertoire:', error);
        throw error;
    }
};

/**
 * Carica un repertorio specifico dal database
 *
 * @param {string} repertoireId - ID del repertorio
 * @returns {Promise<Object>} Dati del repertorio
 */
export const getRepertoire = async (repertoireId) => {
    try {
        console.log('Getting repertoire with ID:', repertoireId);
        const repertoireRef = doc(db, 'chessRepertoires', repertoireId);
        const repertoireDoc = await getDoc(repertoireRef);

        if (repertoireDoc.exists()) {
            const data = repertoireDoc.data();
            console.log('Raw repertoire data from DB:', data);

            // Passiamo canvasData così com'è, senza modificarlo
            return {
                id: repertoireDoc.id,
                title: data.title || 'Repertorio senza titolo',
                color: data.color || 'white',
                moves: data.canvasData?.nodes?.length || 0,
                canvasData: data.canvasData, // Passa canvasData così com'è, senza sanitizzarlo
                uid: data.uid,
                lastUpdated: data.lastUpdated || new Date(),
            };
        } else {
            console.error('Repertoire not found:', repertoireId);
            throw new Error('Repertorio non trovato');
        }
    } catch (error) {
        console.error('Error loading repertoire:', error);
        throw error;
    }
};

export const createRepertoire = async (repertoireData) => {
    try {
        // Utilizziamo serverTimestamp per ottenere il timestamp dal server Firebase
        const dataWithTimestamps = {
            ...repertoireData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        // Generiamo un ID unico
        const newRepertoireRef = doc(collection(db, 'chessRepertoires'));

        // Il data deve contenere almeno l'uid dell'utente
        await setDoc(newRepertoireRef, dataWithTimestamps);

        return newRepertoireRef.id;
    } catch (error) {
        console.error('Errore nella creazione del repertorio:', error);
        throw error;
    }
};

export const updateRepertoire = async (repertoireId, updates) => {
    try {
        const repertoireRef = doc(db, 'chessRepertoires', repertoireId);

        const updatesWithTimestamp = {
            ...updates,
            updatedAt: serverTimestamp(),
        };

        await updateDoc(repertoireRef, updatesWithTimestamp);
        return true;
    } catch (error) {
        console.error("Errore nell'aggiornamento del repertorio:", error);
        throw error;
    }
};

export const deleteRepertoire = async (repertoireId) => {
    try {
        await deleteDoc(doc(db, 'chessRepertoires', repertoireId));
        return true;
    } catch (error) {
        console.error("Errore nell'eliminazione del repertorio:", error);
        throw error;
    }
};

export const firestoreService = {
    getUserRepertoires,
    saveRepertoire,
    getRepertoire,
};
