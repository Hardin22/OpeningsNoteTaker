import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Opening from './Opening';
import { useAuth } from '../components/AuthContext';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { databaseSaver } from '../utils/DatabaseSaver';

const Library = ({
    onLoadRepertoire,
    canvasData,
    onCreateNew,
    activeRepertoireId,
    setActiveRepertoireId,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, userRepertoires, isLoadingUserData, refreshRepertoires } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingId, setLoadingId] = useState(null);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    

    // Chiudi il dropdown quando si clicca fuori
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleLibrary = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOpening = async (repertoire) => {
        if (
            repertoire.id === activeRepertoireId &&
            !window.confirm('Ricaricare questa apertura?')
        ) {
            return;
        }

        setLoadingId(repertoire.id);

        try {
            if (
                activeRepertoireId &&
                activeRepertoireId !== repertoire.id &&
                canvasData &&
                databaseSaver?.pendingChanges
            ) {
                const shouldSave = window.confirm(
                    'Hai modifiche non salvate nel repertorio corrente. Vuoi salvarle prima di passare a un altro repertorio?'
                );

                if (shouldSave) {
                    if (databaseSaver) {
                        await databaseSaver.forceSave();
                    } else {
                        const currentRepertoireRef = doc(
                            db,
                            'chessRepertoires',
                            activeRepertoireId
                        );
                        await updateDoc(currentRepertoireRef, {
                            canvasData: JSON.stringify(canvasData),
                            updatedAt: new Date().toISOString(),
                        });
                    }
                }
            }

            // Carica sempre i dati freschi dal database
            const repertoireRef = doc(db, 'chessRepertoires', repertoire.id);
            const repertoireSnap = await getDoc(repertoireRef);

            if (!repertoireSnap.exists()) {
                throw new Error('Il repertorio richiesto non esiste più nel database');
            }

            const freshData = repertoireSnap.data();

            let parsedData;
            if (typeof freshData.canvasData === 'string') {
                parsedData = JSON.parse(freshData.canvasData);
            } else {
                parsedData = freshData.canvasData;
            }

            onLoadRepertoire(parsedData, freshData.title);
            setActiveRepertoireId(repertoire.id);

            if (databaseSaver) {
                databaseSaver.changeActiveRepertoire(repertoire.id, parsedData);
            }

            // Chiudi la libreria dopo la selezione
            setIsOpen(false);
        } catch (error) {
            console.error('Errore nel caricamento del repertorio:', error);
            alert(`Errore nel caricamento di "${repertoire.title}": ${error.message}`);
        } finally {
            setLoadingId(null);
        }
    };

    const handleDeleteOpening = async (id) => {
        if (!currentUser) return;

        setLoadingId(id);
        try {
            const repertoireRef = doc(db, 'chessRepertoires', id);
            await deleteDoc(repertoireRef);

            // Aggiorna la lista dopo eliminazione
            await refreshRepertoires();

            // Notifica l'utente


            if (id === activeRepertoireId) {
                setActiveRepertoireId(null);

                if (databaseSaver) {
                    databaseSaver.repertoireId = null;
                    databaseSaver.canvasData = null;
                    databaseSaver.pendingChanges = false;
                }

                const emptyCanvas = {
                    nodes: [],
                    connections: [],
                    annotations: [],
                };

                onCreateNew(emptyCanvas);
            }
        } catch (error) {
            console.error('Errore nella cancellazione del repertorio:', error);
            alert(`Errore nella cancellazione: ${error.message}`);
        } finally {
            setLoadingId(null);
        }
    };

    const handleRenameOpening = async (id, newTitle) => {
        if (!currentUser) return;

        setLoadingId(id);
        try {
            const repertoireRef = doc(db, 'chessRepertoires', id);
            await updateDoc(repertoireRef, {
                title: newTitle,
                updatedAt: new Date().toISOString(),
            });

            // Aggiorna la lista dopo il cambio nome
            await refreshRepertoires();

            // Notifica l'utente
            alert(`Apertura rinominata in "${newTitle}"`);
        } catch (error) {
            console.error('Errore nel rinominare il repertorio:', error);
            alert(`Errore nel rinominare: ${error.message}`);
        } finally {
            setLoadingId(null);
        }
    };

    // Modifica la funzione handleCreateNewOpening
    const handleCreateNewOpening = async () => {
        if (canvasData && currentUser && activeRepertoireId && databaseSaver?.pendingChanges) {
            const shouldSave = window.confirm(
                'Vuoi salvare le modifiche correnti prima di creare un nuovo repertorio?'
            );

            if (shouldSave) {
                setLoadingId('creating');
                try {
                    if (databaseSaver) {
                        await databaseSaver.forceSave();
                    } else {
                        const currentRepertoireRef = doc(
                            db,
                            'chessRepertoires',
                            activeRepertoireId
                        );
                        await updateDoc(currentRepertoireRef, {
                            canvasData: JSON.stringify(canvasData),
                            updatedAt: new Date().toISOString(),
                        });
                    }
                } catch (error) {
                    console.error('Errore nel salvataggio:', error);
                    alert(`Errore nel salvataggio: ${error.message}`);
                    setLoadingId(null);
                    return;
                }
            }
        }

        try {
            // Chiedi il nome della nuova apertura
            const title = window.prompt('Nome della nuova apertura:', 'Nuova Apertura');

            // Se l'utente annulla, esci dalla funzione
            if (!title) {
                setLoadingId(null);
                return;
            }

            setLoadingId('creating');

            const emptyCanvas = {
                nodes: [],
                connections: [],
                annotations: [],
            };

            if (currentUser) {
                const newRepertoireRef = doc(collection(db, 'chessRepertoires'));

                const newRepertoire = {
                    title: title,
                    canvasData: JSON.stringify(emptyCanvas),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    uid: currentUser.uid,
                };

                await setDoc(newRepertoireRef, newRepertoire);

                const newId = newRepertoireRef.id;
                setActiveRepertoireId(newId);

                if (databaseSaver) {
                    databaseSaver.initialize(currentUser.uid, newId, emptyCanvas);
                }

                // Aggiorna la lista dei repertori dopo la creazione
                refreshRepertoires();

                // Notifica l'utente
                alert(`Apertura "${title}" creata con successo!`);
            }

            onCreateNew(emptyCanvas);
            setIsOpen(false);
        } catch (error) {
            console.error('Errore nella creazione del nuovo repertorio:', error);
            alert(`Errore: ${error.message}`);
        } finally {
            setLoadingId(null);
        }
    };

    const filteredRepertoires = userRepertoires
        ? userRepertoires.filter(
              (rep) => rep.title && rep.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    return (
        <div className="relative">
            {/* Pulsante Library riprogettato come dropdown */}
            <button
                ref={buttonRef}
                onClick={toggleLibrary}
                className={`w-full bg-gray-800 hover:bg-gray-700 transition-colors text-white mb-3 py-2 px-4 rounded-md flex items-center justify-between ${
                    isOpen ? 'rounded-b-none border-b border-gray-700' : ''
                }`}
            >
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
                    Le mie aperture
                </div>
                <svg
                    className={`w-5 h-5 transition-transform ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Panel contenente le aperture - si integra visivamente col pulsante */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute left-0 right-0 bg-gray-800 border border-gray-700 border-t-0 rounded-b-md shadow-lg z-30 max-h-[70vh] overflow-auto p-4 pt-2"
                >
                    {/* Barra di ricerca e pulsante nuova apertura */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative flex-grow mr-2">
                            <input
                                type="text"
                                placeholder="Cerca aperture..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 absolute right-3 top-2.5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <button
                            onClick={handleCreateNewOpening}
                            disabled={loadingId === 'creating'}
                            className="p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-full flex-shrink-0 transition-colors border border-gray-600"
                            title="Nuova apertura"
                        >
                            {loadingId === 'creating' ? (
                                <svg
                                    className="animate-spin h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Stato di caricamento e risultati */}
                    {isLoadingUserData && (
                        <div className="flex justify-center py-4">
                            <svg
                                className="animate-spin h-6 w-6 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </div>
                    )}

                    {!isLoadingUserData && (!userRepertoires || userRepertoires.length === 0) && (
                        <div className="text-center py-6">
                            <svg
                                className="mx-auto h-10 w-10 text-gray-500 mb-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            <p className="text-gray-400 mb-1">Non hai ancora aperture salvate</p>
                            <button
                                onClick={handleCreateNewOpening}
                                className="mt-2 text-blue-400 hover:underline text-sm"
                            >
                                Crea la tua prima apertura
                            </button>
                        </div>
                    )}

                    {loadingId === 'general' && (
                        <div className="flex justify-center py-4">
                            <svg
                                className="animate-spin h-6 w-6 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </div>
                    )}

                    {loadingId !== 'general' && filteredRepertoires.length > 0 ? (
                        <div className="space-y-2">
                            {filteredRepertoires.map((repertoire) => (
                                <Opening
                                    key={repertoire.id}
                                    repertoire={repertoire}
                                    onSelect={handleSelectOpening}
                                    onDelete={handleDeleteOpening}
                                    onRename={handleRenameOpening}
                                    isActive={repertoire.id === activeRepertoireId}
                                    isLoading={loadingId === repertoire.id}
                                />
                            ))}
                        </div>
                    ) : (
                        loadingId !== 'general' &&
                        userRepertoires &&
                        userRepertoires.length > 0 &&
                        searchTerm && (
                            <div className="text-center py-6 text-gray-400">
                                <p>Nessun risultato per "{searchTerm}"</p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

Library.propTypes = {
    onLoadRepertoire: PropTypes.func.isRequired,
    canvasData: PropTypes.object,
    onCreateNew: PropTypes.func.isRequired,
    activeRepertoireId: PropTypes.string,
    setActiveRepertoireId: PropTypes.func.isRequired,
};

export default Library;
