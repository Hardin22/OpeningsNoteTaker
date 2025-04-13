import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Chess } from 'chess.js';
import { parsePgn } from '../utils/pgnParser';

const ImportPgnModal = ({ onClose, setCanvasData }) => {
    const [pgn, setPgn] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImport = useCallback(async () => {
        if (!pgn.trim()) {
            setError('Inserisci un PGN valido');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Usa il parser PGN personalizzato
            const result = parsePgn(pgn);

            if (!result || !result.nodes || !result.connections) {
                throw new Error('Parsing PGN fallito');
            }

            // Aggiorna il canvas con i nuovi dati
            setCanvasData({
                nodes: result.nodes,
                connections: result.connections,
                annotations: [],
            });

            // Salva in localStorage
            localStorage.setItem(
                'canvasData',
                JSON.stringify({
                    nodes: result.nodes,
                    connections: result.connections,
                    annotations: [],
                })
            );

            onClose();
        } catch (error) {
            console.error("Errore durante l'importazione del PGN:", error);
            setError(`Errore: ${error.message || 'Formato PGN non valido'}`);
        } finally {
            setIsLoading(false);
        }
    }, [pgn, setCanvasData, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div
                className="bg-gray-800 rounded-lg shadow-xl w-[90%] max-w-2xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-100">Importa PGN</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
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
                    </button>
                </div>

                <div className="mb-4">
                    <textarea
                        value={pgn}
                        onChange={(e) => setPgn(e.target.value)}
                        className="w-full bg-gray-700 text-gray-200 text-sm p-4 rounded-md resize-none h-64 focus:ring-2 focus:ring-blue-500"
                        placeholder="Incolla qui il PGN con varianti e annotazioni..."
                    />
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={isLoading}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors disabled:opacity-50 flex items-center"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Elaborazione...
                            </>
                        ) : (
                            'Importa'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

ImportPgnModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    setCanvasData: PropTypes.func.isRequired,
};

export default ImportPgnModal;
