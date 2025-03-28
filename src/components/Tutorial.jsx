import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Tutorial = ({ isOpen, onClose }) => {
    const [activeSection, setActiveSection] = useState('intro');
    const [animateIn, setAnimateIn] = useState(false);
    const modalRef = useRef(null);
    
    // Gestisce l'animazione all'apertura
    useEffect(() => {
        if (isOpen) {
            setAnimateIn(true);
        }
    }, [isOpen]);
    
    // Chiude il tutorial con animazione
    const handleClose = () => {
        setAnimateIn(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };
    
    // Previene il click all'interno del modale dalla propagazione
    const handleContentClick = (e) => {
        e.stopPropagation();
    };
    
    // Gestisce lo scroll alla sezione selezionata
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
    };
    
    if (!isOpen) return null;
    
    return (
        <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: animateIn ? 1 : 0 }}
            onClick={handleClose}
        >
            <div 
                ref={modalRef}
                className={`bg-gray-900 w-full max-w-5xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-transform duration-300 ${animateIn ? 'scale-100' : 'scale-95'}`}
                onClick={handleContentClick}
            >
                {/* Sidebar navigazione */}
                <div className="bg-gray-800 w-full md:w-64 p-5 shrink-0 overflow-y-auto md:max-h-[90vh]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-white">ChessNotes</h2>
                    </div>
                    
                    <nav className="space-y-1">
                        <NavItem 
                            id="intro" 
                            title="Introduzione" 
                            active={activeSection === 'intro'} 
                            onClick={() => scrollToSection('intro')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        />
                        <NavItem 
                            id="canvas" 
                            title="Area di Lavoro" 
                            active={activeSection === 'canvas'} 
                            onClick={() => scrollToSection('canvas')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3z" />
                                </svg>
                            }
                        />
                        <NavItem 
                            id="nodes" 
                            title="Nodi e Varianti" 
                            active={activeSection === 'nodes'} 
                            onClick={() => scrollToSection('nodes')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            }
                        />
                        <NavItem 
                            id="annotations" 
                            title="Annotazioni" 
                            active={activeSection === 'annotations'} 
                            onClick={() => scrollToSection('annotations')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            }
                        />
                        <NavItem 
                            id="chessboard" 
                            title="Scacchiera" 
                            active={activeSection === 'chessboard'} 
                            onClick={() => scrollToSection('chessboard')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                            }
                        />
                        <NavItem 
                            id="drill" 
                            title="Modalità Drill" 
                            active={activeSection === 'drill'} 
                            onClick={() => scrollToSection('drill')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="9" />
                                    <circle cx="12" cy="12" r="6" />
                                    <circle cx="12" cy="12" r="3" />
                                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                                </svg>
                            }
                        />
                        <NavItem 
                            id="import-export" 
                            title="Import/Export" 
                            active={activeSection === 'import-export'} 
                            onClick={() => scrollToSection('import-export')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            }
                        />
                        <NavItem 
                            id="shortcuts" 
                            title="Scorciatoie" 
                            active={activeSection === 'shortcuts'} 
                            onClick={() => scrollToSection('shortcuts')}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                            }
                        />
                    </nav>
                </div>

                {/* Contenuto principale */}
                <div className="flex-1 p-6 overflow-y-auto max-h-[90vh] text-gray-300">
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <section id="intro" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Benvenuto in ChessNotes</h3>
                        <p className="mb-4">
                            ChessNotes è uno strumento avanzato per organizzare il tuo repertorio di aperture scacchistiche. 
                            A differenza dei tradizionali strumenti di studio, ChessNotes ti permette di creare alberi di varianti 
                            completamente personalizzabili, con annotazioni e note dettagliate per ogni mossa.
                        </p>
                        <div className="bg-gray-800 p-4 rounded-lg mb-4">
                            <h4 className="text-lg font-semibold text-amber-400 mb-2">Iniziare è semplice:</h4>
                            <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                <li>Crea nodi per rappresentare posizioni chiave</li>
                                <li>Collegali per formare sequenze di mosse</li>
                                <li>Aggiungi annotazioni per inserire note o concetti importanti</li>
                                <li>Usa la scacchiera per visualizzare e analizzare le posizioni</li>
                                <li>Allenati con la modalità drill per verificare la tua preparazione</li>
                            </ol>
                        </div>
                        <div className="border-l-4 border-amber-500 pl-4 italic">
                            "ChessNotes combina la flessibilità di un mind-map con la potenza di un database scacchistico."
                        </div>
                    </section>

                    <section id="canvas" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Area di Lavoro (Canvas)</h3>
                        <p className="mb-4">
                            Il canvas è il tuo spazio di lavoro principale. Qui puoi organizzare liberamente i nodi 
                            e le annotazioni, creando un vero e proprio albero di varianti delle aperture che stai studiando.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FeatureCard 
                                title="Navigazione Intuitiva" 
                                description="Muovi liberamente la visuale con drag & drop, zooma per vedere l'intero repertorio o concentrarti su una specifica variante."
                                icon={
                                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                    </svg>
                                }
                            />
                            <FeatureCard 
                                title="Organizzazione Visuale" 
                                description="Posiziona i nodi come preferisci per creare una struttura che rispecchi la tua logica di studio."
                                icon={
                                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                }
                            />
                        </div>
                        <p className="mb-4">
                            Ogni elemento sul canvas può essere selezionato con un click. Elementi selezionati 
                            possono essere modificati tramite la sidebar o spostati trascinandoli con il mouse.
                        </p>
                        <div className="bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-blue-500">
                            <strong className="text-blue-400">Pro Tip:</strong> Usa lo zoom (rotellina del mouse o pinch su touchpad) 
                            per avere una visione d'insieme quando il tuo repertorio cresce.
                        </div>
                    </section>

                    <section id="nodes" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Nodi e Varianti</h3>
                        <p className="mb-4">
                            I nodi sono gli elementi principali di ChessNotes. Ogni nodo rappresenta una posizione scacchistica
                            e contiene informazioni sulla mossa che ha portato a quella posizione.
                        </p>
                        <div className="space-y-6 mb-6">
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-emerald-900/30 border border-emerald-700/50 rounded-lg flex items-center justify-center">
                                        <span className="text-emerald-400 font-bold">e4</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-emerald-400 mb-1">Creare un nuovo nodo</h4>
                                    <p className="text-gray-300">
                                        Clicca sul pulsante "Nuovo Nodo" nella sidebar o premi <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">N</kbd> sulla tastiera. 
                                        Poi posiziona il nodo sul canvas e assegnagli una mossa.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-amber-400 mb-1">Collegare i nodi</h4>
                                    <p className="text-gray-300">
                                        Seleziona un nodo e premi <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">C</kbd>, poi clicca su un altro nodo per creare una connessione.
                                        Le connessioni rappresentano la sequenza di mosse nell'albero di varianti.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-red-400 mb-1">Eliminare un nodo</h4>
                                    <p className="text-gray-300">
                                        Seleziona un nodo e clicca sul pulsante "Elimina Nodo" nella sidebar o premi il tasto <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">\</kbd> (backslash).
                                        Attenzione: eliminando un nodo si eliminano anche tutti i suoi nodi figli.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-emerald-500">
                            <strong className="text-emerald-400">Suggerimento:</strong> Puoi aggiungere note dettagliate 
                            a ogni nodo utilizzando il campo descrizione nella sidebar quando un nodo è selezionato.
                        </div>
                    </section>

                    <section id="annotations" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Annotazioni</h3>
                        <p className="mb-4">
                            Le annotazioni ti permettono di aggiungere note, commenti o concetti strategici che non sono 
                            specificamente legati a una singola mossa, ma riguardano l'apertura nel suo complesso.
                        </p>
                        
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800 p-4 rounded-lg mb-6">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-900/30 border border-blue-700/50 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-blue-400 mb-1">Creare una nuova annotazione</h4>
                                <p className="text-gray-300">
                                    Clicca sul pulsante "Annotazione" nella sidebar o premi <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">A</kbd>. 
                                    Posiziona l'annotazione sul canvas vicino ai nodi a cui si riferisce.
                                </p>
                            </div>
                        </div>
                        
                        <p className="mb-4">
                            Le annotazioni sono perfette per:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 pl-4">
                            <li>Idee strategiche generali</li>
                            <li>Temi posizionali ricorrenti</li>
                            <li>Riferimenti a partite famose</li>
                            <li>Consigli personali per ricordare una linea</li>
                            <li>Alternative da esplorare in futuro</li>
                        </ul>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-blue-500">
                            <strong className="text-blue-400">Pro Tip:</strong> Usa le annotazioni per evidenziare i temi 
                            tattici ricorrenti in un'apertura, così da riconoscerli più facilmente durante le partite reali.
                        </div>
                    </section>

                    <section id="chessboard" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Scacchiera</h3>
                        <p className="mb-4">
                            La scacchiera interattiva ti permette di visualizzare e analizzare le posizioni corrispondenti 
                            ai nodi selezionati, oltre a registrare nuove mosse per espandere il tuo repertorio.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FeatureCard 
                                title="Analisi Visiva" 
                                description="Visualizza la posizione esatta corrispondente a ciascun nodo per un'analisi più profonda."
                                icon={
                                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                }
                            />
                            <FeatureCard 
                                title="Registrazione Mosse" 
                                description="Aggiungi nuove mosse al tuo repertorio eseguendole direttamente sulla scacchiera."
                                icon={
                                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                }
                            />
                        </div>
                        
                        <div className="p-4 bg-gray-800 rounded-lg mb-6">
                            <h4 className="text-lg font-semibold text-amber-400 mb-2">Come utilizzare la scacchiera:</h4>
                            <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                <li>Seleziona un nodo sul canvas</li>
                                <li>Clicca sul pulsante "Scacchiera" nella sidebar</li>
                                <li>Esplora la posizione o aggiungi nuove mosse</li>
                                <li>Le mosse eseguite possono essere salvate come nuovi nodi collegati</li>
                            </ol>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-purple-500">
                            <strong className="text-purple-400">Funzionalità Avanzata:</strong> La scacchiera mostra automaticamente il FEN 
                            (Forsyth-Edwards Notation) della posizione, che puoi copiare per utilizzarlo in altri software di analisi.
                        </div>
                    </section>

                    <section id="drill" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Modalità Drill</h3>
                        <p className="mb-4">
                            La modalità Drill (allenamento) ti permette di testare la tua conoscenza del repertorio 
                            che hai creato, aiutandoti a memorizzare le mosse attraverso la pratica attiva.
                        </p>
                        
                        <div className="p-4 bg-gray-800 rounded-lg mb-6">
                            <h4 className="text-lg font-semibold text-amber-400 mb-2">Come funziona:</h4>
                            <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                <li>Seleziona un nodo da cui iniziare l'allenamento</li>
                                <li>Clicca sul pulsante "Allenamento" nella sidebar</li>
                                <li>Il software ti mostrerà la posizione e ti chiederà di eseguire la mossa corretta</li>
                                <li>Riceverai feedback immediato sulla tua risposta</li>
                                <li>Continua a seguire il percorso di mosse fino alla fine della variante</li>
                            </ol>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="flex-1 bg-gray-800 p-4 rounded-lg border-t-4 border-purple-500">
                                <h4 className="text-lg font-semibold text-purple-400 mb-2">Vantaggi dell'allenamento</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Rinforza la memoria muscolare</li>
                                    <li>Identifica le varianti che richiedono più studio</li>
                                    <li>Aumenta la velocità di riconoscimento delle posizioni</li>
                                    <li>Rende automatiche le risposte alle mosse avversarie</li>
                                </ul>
                            </div>
                            <div className="flex-1 bg-gray-800 p-4 rounded-lg border-t-4 border-amber-500">
                                <h4 className="text-lg font-semibold text-amber-400 mb-2">Personalizzazione</h4>
                                <p className="text-gray-300">
                                    La modalità Drill è altamente personalizzabile: puoi scegliere da quale posizione 
                                    iniziare, quale lato della scacchiera giocare, e quanto in profondità esplorare 
                                    le varianti del tuo repertorio.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-purple-500">
                            <strong className="text-purple-400">Suggerimento:</strong> Pratica regolarmente con la modalità Drill 
                            prima di tornei o partite importanti per rinfrescare la memoria sulle tue linee preparate.
                        </div>
                    </section>

                    <section id="import-export" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Import/Export</h3>
                        <p className="mb-4">
                            ChessNotes offre funzionalità avanzate per importare ed esportare il tuo lavoro, 
                            garantendo la portabilità e la sicurezza dei tuoi dati.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                                <h4 className="text-lg font-semibold text-green-400 mb-2">Importazione</h4>
                                <p className="text-gray-300 mb-3">
                                    Importa repertori precedentemente salvati in formato JSON.
                                </p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400">
                                    <li>Clicca sul pulsante "Importa" nella sidebar</li>
                                    <li>Seleziona il file JSON dal tuo computer</li>
                                    <li>Il repertorio verrà caricato sul canvas</li>
                                </ol>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                                <h4 className="text-lg font-semibold text-blue-400 mb-2">Esportazione PGN</h4>
                                <p className="text-gray-300 mb-3">
                                    Copia il PGN (Portable Game Notation) di una variante selezionata.
                                </p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400">
                                    <li>Seleziona un nodo sul canvas</li>
                                    <li>Il PGN appare nella sidebar</li>
                                    <li>Clicca su "Copia" per copiarlo negli appunti</li>
                                    <li>Incollalo in qualsiasi software di scacchi compatibile</li>
                                </ol>
                            </div>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg mb-6">
                            <h4 className="text-lg font-semibold text-amber-400 mb-2">Backup Automatico</h4>
                            <p className="text-gray-300">
                                ChessNotes salva automaticamente il tuo lavoro nel localStorage del browser. 
                                Tuttavia, è consigliabile esportare regolarmente i tuoi dati in formato JSON 
                                come backup aggiuntivo, soprattutto prima di operazioni di pulizia del browser.
                            </p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-purple-500">
                            <strong className="text-purple-400">Pro Tip:</strong> Il formato JSON ti permette 
                            di condividere facilmente i tuoi repertori con altri utenti di ChessNotes o di 
                            mantenerli sincronizzati tra diversi dispositivi.
                        </div>
                    </section>

                    <section id="shortcuts" className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-500 mb-4">Scorciatoie da Tastiera</h3>
                        <p className="mb-4">
                            ChessNotes offre numerose scorciatoie da tastiera per velocizzare il tuo workflow 
                            e renderti più efficiente nella creazione e gestione del tuo repertorio.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2">Navigazione Canvas</h4>
                                <div className="space-y-2">
                                    <ShortcutItem key="Drag" shortcut="Trascina" description="Muovi il canvas" />
                                    <ShortcutItem key="Wheel" shortcut="Rotella mouse" description="Zoom in/out" />
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2">Nodi e Connessioni</h4>
                                <div className="space-y-2">
                                    <ShortcutItem key="N" shortcut="N" description="Crea nuovo nodo" />
                                    <ShortcutItem key="A" shortcut="A" description="Crea nuova annotazione" />
                                    <ShortcutItem key="C" shortcut="C" description="Connetti nodi" />
                                    <ShortcutItem key="Backslash" shortcut="\" description="Elimina nodo selezionato" />
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2">Scacchiera</h4>
                                <div className="space-y-2">
                                    <ShortcutItem key="B" shortcut="B" description="Apri scacchiera" />
                                    <ShortcutItem key="F" shortcut="F" description="Inverti scacchiera" />
                                    <ShortcutItem key="Esc" shortcut="Esc" description="Chiudi scacchiera" />
                                </div>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-amber-400 mb-3 border-b border-gray-700 pb-2">Navigazione Varianti</h4>
                                <div className="space-y-2">
                                    <ShortcutItem key="LeftArrow" shortcut="←" description="Mossa precedente" />
                                    <ShortcutItem key="RightArrow" shortcut="→" description="Mossa successiva" />
                                    <ShortcutItem key="D" shortcut="D" description="Avvia modalità drill" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-sm border-l-4 border-amber-500">
                            <strong className="text-amber-400">Consiglio:</strong> L'utilizzo costante delle scorciatoie 
                            da tastiera può migliorare notevolmente la tua efficienza nell'organizzare e studiare il tuo 
                            repertorio di aperture.
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

// Componenti di supporto
const NavItem = ({ id, title, active, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'}`}
    >
        <span className={`${active ? 'text-amber-400' : 'text-gray-500'}`}>
            {icon}
        </span>
        <span className="text-sm font-medium">{title}</span>
    </button>
);

const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-gray-800 p-5 rounded-lg border-t-2 border-amber-500/50">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
                {icon}
            </div>
            <div>
                <h4 className="text-lg font-semibold text-amber-400 mb-2">{title}</h4>
                <p className="text-gray-300 text-sm">{description}</p>
            </div>
        </div>
    </div>
);

const ShortcutItem = ({ shortcut, description }) => (
    <div className="flex justify-between">
        <span className="text-gray-300">{description}</span>
        <kbd className="px-2 py-1 bg-gray-700 rounded text-xs text-white">{shortcut}</kbd>
    </div>
);

Tutorial.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Tutorial;