import React, { useState } from 'react';
import { createRepertoire, deleteRepertoire } from '../services/firestoreService';
import OpeningItem from './OpeningItem';

const RepertoireManager = ({
    user,
    repertoires,
    loadingRepertoires,
    canvasData,
    setCanvasData,
    currentRepertoireId,
    setCurrentRepertoireId,
    onSaveCanvas,
}) => {
    const [showNewRepertoireForm, setShowNewRepertoireForm] = useState(false);
    const [newRepertoireTitle, setNewRepertoireTitle] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Funzione per creare un nuovo repertorio
    const handleCreateRepertoire = async (e) => {
        e.preventDefault();

        if (!newRepertoireTitle.trim()) {
            return;
        }

        try {
            // Creiamo un canvas vuoto per il nuovo repertorio
            const emptyCanvas = {
                nodes: [],
                connections: [],
                annotations: [],
            };

            const newRepertoireData = {
                title: newRepertoireTitle.trim(),
                uid: user.uid,
                canvasData: JSON.stringify(emptyCanvas),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await createRepertoire(newRepertoireData);
            setNewRepertoireTitle('');
            setShowNewRepertoireForm(false);

            // Un feedback all'utente che l'operazione è avvenuta con successo
            alert('Nuovo repertorio creato con successo!');

            // Note: l'aggiornamento della lista avverrebbe tramite il listener in App.jsx
            // che rileva le modifiche al database
        } catch (error) {
            console.error('Errore nella creazione del repertorio:', error);
            alert('Si è verificato un errore durante la creazione del repertorio.');
        }
    };

    // Funzione per caricare un repertorio
    const handleLoadRepertoire = (repertoireId) => {
        // Controlla se ci sono modifiche non salvate
        if (
            currentRepertoireId &&
            canvasData &&
            (canvasData.nodes.length > 0 || canvasData.annotations.length > 0)
        ) {
            if (
                window.confirm(
                    'Ci sono modifiche non salvate. Vuoi salvare prima di cambiare repertorio?'
                )
            ) {
                onSaveCanvas(currentRepertoireId);
            }
        }

        // Trova il repertorio corrispondente
        const selectedRepertoire = repertoires.find((r) => r.id === repertoireId);
        if (selectedRepertoire && selectedRepertoire.canvasData) {
            try {
                // Converti la stringa JSON memorizzata come canvasData in un oggetto
                const parsedCanvasData = JSON.parse(selectedRepertoire.canvasData);
                setCanvasData(parsedCanvasData);
                setCurrentRepertoireId(repertoireId);
            } catch (error) {
                console.error('Errore nel parsing del canvasData:', error);
                alert('Errore nel caricamento del repertorio. Formato dati non valido.');
            }
        }
    };

    // Funzione per eliminare un repertorio
    const handleDeleteRepertoire = async (repertoireId) => {
        if (
            window.confirm(
                "Sei sicuro di voler eliminare questo repertorio? L'operazione non può essere annullata."
            )
        ) {
            setIsDeleting(true);
            try {
                await deleteRepertoire(repertoireId);

                // Se stiamo eliminando il repertorio corrente, svuota il canvas
                if (currentRepertoireId === repertoireId) {
                    setCanvasData({
                        nodes: [],
                        connections: [],
                        annotations: [],
                    });
                    setCurrentRepertoireId(null);
                }

                alert('Repertorio eliminato con successo!');
            } catch (error) {
                console.error("Errore nell'eliminazione del repertorio:", error);
                alert("Si è verificato un errore durante l'eliminazione del repertorio.");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white text-lg font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                    />
                </svg>
                I miei repertori
            </h3>

            {loadingRepertoires ? (
                <div className="flex justify-center my-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {repertoires.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center my-3">
                            Non hai ancora creato nessun repertorio.
                        </p>
                    ) : (
                        <ul className="space-y-2 mb-3">
                            {repertoires.map((repertoire) => (
                                <OpeningItem
                                    key={repertoire.id}
                                    repertoire={repertoire}
                                    isActive={currentRepertoireId === repertoire.id}
                                    onSelect={() => handleLoadRepertoire(repertoire.id)}
                                    onDelete={() => handleDeleteRepertoire(repertoire.id)}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </ul>
                    )}

                    {showNewRepertoireForm ? (
                        <form onSubmit={handleCreateRepertoire} className="mt-3">
                            <input
                                type="text"
                                value={newRepertoireTitle}
                                onChange={(e) => setNewRepertoireTitle(e.target.value)}
                                placeholder="Nome repertorio"
                                className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white mb-2"
                                autoFocus
                            />
                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Crea
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewRepertoireForm(false);
                                        setNewRepertoireTitle('');
                                    }}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm flex items-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    Annulla
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex justify-between mt-3">
                            <button
                                onClick={() => setShowNewRepertoireForm(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center"
                                disabled={isDeleting}
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                Nuovo repertorio
                            </button>

                            {currentRepertoireId && (
                                <button
                                    onClick={() => onSaveCanvas(currentRepertoireId)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
                                    disabled={isDeleting}
                                >
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                        />
                                    </svg>
                                    Salva
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default RepertoireManager;
