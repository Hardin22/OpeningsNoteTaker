// Aggiungi questa funzione e lo stile per la formattazione del PGN

import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({
    onAddNode,
    onAddAnnotation,
    selectedNode,
    updateNode,
    currentPGN,
    onOpenChessboard,
}) => {
    const handleDescriptionChange = (e) => {
        if (selectedNode) {
            updateNode({
                ...selectedNode,
                description: e.target.value,
            });
        }
    };

    const copyPgnToClipboard = () => {
        if (currentPGN) {
            navigator.clipboard.writeText(currentPGN);
            alert('PGN copiato negli appunti!');
        }
    };

    // Formatta il PGN per la visualizzazione
    const formatPGN = (pgn) => {
        if (!pgn) return '';

        // Rimuovi le intestazioni e mantieni solo le mosse
        const movesOnly = pgn.replace(/\[\w+ ".*?"\]\n/g, '').trim();
        return movesOnly;
    };

    return (
        <div className="w-64 h-full bg-gray-800 text-white p-4 flex flex-col space-y-4 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Toolbox</h2>
            <button
                onClick={onAddNode}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors"
            >
                Inserisci Nodo
            </button>
            <button
                onClick={onAddAnnotation}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
            >
                Inserisci Annotazione
            </button>
            {/* Sezione dettagli nodo selezionato */}
            {selectedNode && (
                <div className="mt-8 border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-semibold mb-2">Dettagli Nodo</h3>

                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Mossa
                        </label>
                        <input
                            type="text"
                            value={selectedNode.label || ''}
                            onChange={(e) => updateNode({ ...selectedNode, label: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e4, Nf3..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Descrizione
                        </label>
                        <textarea
                            value={selectedNode.description || ''}
                            onChange={handleDescriptionChange}
                            rows={5}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            placeholder="Inserisci una descrizione..."
                        />
                    </div>

                    {/* Visualizza la posizione FEN se disponibile */}
                    {selectedNode.fenPosition && (
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Posizione FEN
                            </label>
                            <div className="bg-gray-900 p-2 rounded text-xs overflow-x-auto break-all">
                                {selectedNode.fenPosition}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* Visualizza il PGN se disponibile */}
            {selectedNode && currentPGN && (
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-300">PGN</label>
                        <button
                            onClick={copyPgnToClipboard}
                            className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                        >
                            Copia
                        </button>
                    </div>
                    <pre className="bg-gray-900 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                        {formatPGN(currentPGN)}
                    </pre>
                </div>
            )}
            
            <button
                onClick={onOpenChessboard}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors mb-3 flex items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
                Visualizza Scacchiera <span className="text-xs ml-2">(Ctrl+B)</span>
            </button>
        </div>
    );
};

Sidebar.propTypes = {
    onAddNode: PropTypes.func.isRequired,
    onAddAnnotation: PropTypes.func.isRequired,
    selectedNode: PropTypes.shape({
        id: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        label: PropTypes.string,
        description: PropTypes.string,
        fenPosition: PropTypes.string,
    }),
    updateNode: PropTypes.func,
    currentPGN: PropTypes.string,
    onOpenChessboard: PropTypes.func, // Questa prop deve essere a questo livello, non dentro selectedNode
};

export default Sidebar;
