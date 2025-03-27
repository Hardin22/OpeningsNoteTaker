import React from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({
    onAddNode,
    onAddAnnotation,
    selectedNode,
    updateNode,
    currentPGN,
    onOpenChessboard,
    onStartDrillMode,
    setCanvasData,
}) => {
    const handleDescriptionChange = (e) => {
        if (selectedNode) {
            updateNode({
                ...selectedNode,
                description: e.target.value,
            });
        }
    };
    const fileInputRef = useRef(null);
    const copyPgnToClipboard = () => {
        if (currentPGN) {
            navigator.clipboard.writeText(currentPGN);
            alert('PGN copiato negli appunti!');
        }
    };

    const formatPGN = (pgn) => {
        if (!pgn) return '';
        return pgn.replace(/\[\w+ ".*?"\]\n/g, '').trim();
    };
    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    // Gestisce l'importazione del file JSON
    const handleFileImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);

                // Aggiorna il canvas con i dati importati
                setCanvasData(importedData);

                // Salva immediatamente i dati importati in localStorage
                localStorage.setItem('canvasData', JSON.stringify(importedData));

                alert('Dati importati con successo!');
            } catch (error) {
                console.error("Errore durante l'importazione:", error);
                alert("Errore durante l'importazione. Controlla che il file sia un JSON valido.");
            }

            // Reset dell'input file
            e.target.value = null;
        };

        reader.readAsText(file);
    };

    return (
        <div className="w-64 h-full bg-gray-800 text-gray-200 p-4 flex flex-col space-y-4 overflow-auto border-r border-gray-700">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-100 mb-2">Strumenti</h2>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={onAddNode}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-2 rounded-md transition-all text-sm flex items-center justify-center gap-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                        Nuovo nodo
                    </button>

                    <button
                        onClick={onAddAnnotation}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-2 rounded-md transition-all text-sm flex items-center justify-center gap-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                        Nuova annotazione
                    </button>
                </div>

                {selectedNode && (
                    <div className="pt-4 border-t border-gray-700">
                        <h3 className="text-sm font-medium text-gray-100 mb-3">Modifica nodo</h3>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-gray-400 mb-1 block">
                                    Mossa
                                </label>
                                <input
                                    type="text"
                                    value={selectedNode.label || ''}
                                    onChange={(e) =>
                                        updateNode({ ...selectedNode, label: e.target.value })
                                    }
                                    className="w-full bg-gray-900 text-gray-100 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-gray-500 outline-none"
                                    placeholder="Inserisci mossa..."
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-400 mb-1 block">
                                    Descrizione
                                </label>
                                <textarea
                                    value={selectedNode.description || ''}
                                    onChange={handleDescriptionChange}
                                    rows={3}
                                    className="w-full bg-gray-900 text-gray-100 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-gray-500 outline-none resize-none"
                                    placeholder="Aggiungi note..."
                                />
                            </div>

                            {selectedNode.fenPosition && (
                                <div>
                                    <label className="text-xs font-medium text-gray-400 mb-1 block">
                                        FEN
                                    </label>
                                    <div className="bg-gray-900 p-2 rounded text-xs font-mono break-all text-gray-400">
                                        {selectedNode.fenPosition}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {selectedNode && currentPGN && (
                    <div className="pt-4 border-t border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-400">PGN</span>
                            <button
                                onClick={copyPgnToClipboard}
                                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md text-gray-300"
                            >
                                Copia
                            </button>
                        </div>
                        <pre className="bg-gray-900 p-2 rounded text-xs font-mono text-gray-400 overflow-x-auto whitespace-pre-wrap">
                            {formatPGN(currentPGN)}
                        </pre>
                    </div>
                )}
            </div>

            <div className="mt-auto space-y-2 pt-4 border-t border-gray-700">
                <button
                    onClick={onOpenChessboard}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-2 rounded-md transition-all text-sm flex items-center justify-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                    </svg>
                    Scacchiera
                </button>

                <button
                    onClick={onStartDrillMode}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-2 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                    Allenamento
                </button>
                <button
                    onClick={handleImportClick}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-2 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                    </svg>
                    Importa JSON
                </button>

                {/* Input file nascosto */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileImport}
                    accept=".json"
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    onAddNode: PropTypes.func.isRequired,
    onAddAnnotation: PropTypes.func.isRequired,
    selectedNode: PropTypes.object,
    updateNode: PropTypes.func,
    currentPGN: PropTypes.string,
    onOpenChessboard: PropTypes.func,
    onStartDrillMode: PropTypes.func,
    setCanvasData: PropTypes.func.isRequired, // Aggiungi questa prop
};

export default Sidebar;
