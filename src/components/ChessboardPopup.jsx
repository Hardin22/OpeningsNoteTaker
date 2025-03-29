import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import PropTypes from 'prop-types';
import { createNodeWithOptimalPosition } from '../utils/layoutUtils';
import customPieces from '../utils/customPieces';
const ChessboardPopup = ({
    pgn,
    onClose,
    nodeDescription,
    canvasData,
    selectedNodeId,
    onUpdateCanvas,
    onSelectNode,
    onUpdateCanvasAndSelectNode,
}) => {
    // Stati
    const [position, setPosition] = useState('');
    const [moveHistory, setMoveHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentNote, setCurrentNote] = useState('');
    const [initialNodeId, setInitialNodeId] = useState(null);
    const [internalCanvasData, setInternalCanvasData] = useState(canvasData);
    const [childrenOptions, setChildrenOptions] = useState([]);
    const [showChildSelector, setShowChildSelector] = useState(false);
    const [showMobilePanel, setShowMobilePanel] = useState(false);

    // Riferimenti
    const parentNodeMap = useRef({});
    const nodePgnMap = useRef({});
    const gameRef = useRef(new Chess());
    const isUpdatingRef = useRef(false);
    const isMountedRef = useRef(true);
    const boardContainerRef = useRef(null);
    const lastSavedNoteRef = useRef('');

    // Dimensionamento della scacchiera
    const [boardSize, setBoardSize] = useState(400);

    // Gestisce il dimensionamento della scacchiera
    useEffect(() => {
        const updateBoardSize = () => {
            if (boardContainerRef.current) {
                // Per mobile (< 768px) usa quasi tutta la larghezza
                if (window.innerWidth < 768) {
                    const viewportWidth = window.innerWidth;
                    setBoardSize(Math.min(viewportWidth * 0.85, 500));
                }
                // Per desktop, dimensiona in base al contenitore, ma non superare il limite
                else {
                    const containerWidth = boardContainerRef.current.clientWidth;
                    setBoardSize(Math.min(containerWidth * 0.9, 580));
                }
            }
        };

        // Aggiorna la dimensione iniziale
        updateBoardSize();

        // Aggiorna la dimensione quando la finestra cambia
        window.addEventListener('resize', updateBoardSize);

        return () => {
            window.removeEventListener('resize', updateBoardSize);
        };
    }, []);

    // Quando il componente viene montato/smontato
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Aggiorna lo stato interno quando cambiano i props esterni
    useEffect(() => {
        if (canvasData && JSON.stringify(canvasData) !== JSON.stringify(internalCanvasData)) {
            setInternalCanvasData(canvasData);
        }
    }, [canvasData]);

    // Carica il PGN e costruisci le mappe
    useEffect(() => {
        if (!isMountedRef.current) return;

        const currentGame = gameRef.current;
        currentGame.reset();

        if (pgn?.trim()) {
            try {
                currentGame.loadPgn(pgn);
            } catch (error) {
                console.error('Errore nel caricamento del PGN:', error);
            }
        }

        const history = currentGame.history({ verbose: true });
        setPosition(currentGame.fen());
        setMoveHistory(history);
        setCurrentIndex(history.length - 1);
        
        // Imposta la nota e salva il suo valore nel ref
        const noteValue = nodeDescription || '';
        setCurrentNote(noteValue);
        lastSavedNoteRef.current = noteValue;

        if (selectedNodeId && !initialNodeId) {
            setInitialNodeId(selectedNodeId);
        }

        if (internalCanvasData?.nodes && internalCanvasData?.connections) {
            const parentMap = {};
            const pgnMap = {};

            internalCanvasData.connections.forEach((conn) => {
                if (conn.fromId && conn.toId) {
                    parentMap[conn.toId] = conn.fromId;
                }
            });

            internalCanvasData.nodes.forEach((node) => {
                if (node.pgn) {
                    pgnMap[node.id] = node.pgn;
                }
            });

            parentNodeMap.current = parentMap;
            nodePgnMap.current = pgnMap;
        }

        return () => {
            currentGame.reset();
        };
    }, [pgn, nodeDescription, internalCanvasData, initialNodeId, selectedNodeId]);

    const safeUpdateCanvas = useCallback(
        (updatedCanvas) => {
            if (!isMountedRef.current || !onUpdateCanvas) return;
            
            // Imposta subito lo stato locale
            setInternalCanvasData(updatedCanvas);
            
            // Aggiorna il canvas esterno con una leggera animazione
            onUpdateCanvas(updatedCanvas);
        },
        [onUpdateCanvas]
    );

    const safeSelectNode = useCallback(
        (nodeId) => {
            if (!isMountedRef.current || !onSelectNode) return;
            onSelectNode(nodeId);
        },
        [onSelectNode]
    );

    // Funzione ausiliaria per trovare un nodo per ID
    const findNodeById = (nodes, nodeId) => {
        return nodes.find((node) => node.id === nodeId);
    };

    // Naviga ad un nodo specifico
    const navigateToNode = (nodeId) => {
        if (!nodeId || !internalCanvasData) return;

        const targetNode = findNodeById(internalCanvasData.nodes, nodeId);
        if (!targetNode) return;

        const nodePgn = targetNode.pgn || nodePgnMap.current[nodeId] || pgn;

        try {
            gameRef.current.reset();
            if (nodePgn && nodePgn.trim()) {
                gameRef.current.loadPgn(nodePgn);
            }

            const history = gameRef.current.history({ verbose: true });
            setPosition(gameRef.current.fen());
            setMoveHistory(history);
            setCurrentIndex(history.length - 1);

            if (nodeId !== selectedNodeId) {
                safeSelectNode(nodeId);
            }

            const node = findNodeById(internalCanvasData.nodes, nodeId);
            if (node) {
                const noteValue = node.description || '';
                setCurrentNote(noteValue);
                lastSavedNoteRef.current = noteValue;
            }
        } catch (error) {
            console.error('Errore nella navigazione al nodo:', error);
        }
    };

    // Funzione per navigare a una mossa specifica
    const navigateToMove = (index) => {
        try {
            gameRef.current.reset();

            if (index >= 0) {
                for (let i = 0; i <= index; i++) {
                    if (i < moveHistory.length) {
                        gameRef.current.move(moveHistory[i]);
                    }
                }
            }

            setPosition(gameRef.current.fen());
            setCurrentIndex(index);
        } catch (error) {
            console.error('Errore nella navigazione:', error);
        }
    };

    // FUNZIONI DI NAVIGAZIONE
    const goToStart = () => {
        navigateToMove(-1);
    };

    const goToPrevious = () => {
        if (selectedNodeId && parentNodeMap.current[selectedNodeId]) {
            const parentId = parentNodeMap.current[selectedNodeId];
            navigateToNode(parentId);
        } else {
            currentIndex > -1 && navigateToMove(currentIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentIndex < moveHistory.length - 1) {
            navigateToMove(currentIndex + 1);
            return;
        }

        if (selectedNodeId && internalCanvasData) {
            const childConnections = internalCanvasData.connections.filter(
                (conn) => conn.fromId === selectedNodeId
            );

            if (childConnections.length === 0) {
                return;
            }

            const childOptions = childConnections.map((conn) => {
                const childNode = internalCanvasData.nodes.find((node) => node.id === conn.toId);
                return {
                    id: conn.toId,
                    label: childNode ? childNode.label : 'Mossa sconosciuta',
                };
            });

            if (childOptions.length === 1) {
                navigateToNode(childOptions[0].id);
            } else if (childOptions.length > 1) {
                setChildrenOptions(childOptions);
                setShowChildSelector(true);
            }
        }
    };

    const handleChildSelect = (nodeId) => {
        setShowChildSelector(false);
        navigateToNode(nodeId);
    };

    const goToEnd = () => {
        navigateToMove(moveHistory.length - 1);
    };

    const goToInitialNode = () => {
        if (initialNodeId) {
            navigateToNode(initialNodeId);
        }
    };

    const handlePieceDrop = (sourceSquare, targetSquare) => {
        try {
            const moveObj = { from: sourceSquare, to: targetSquare, promotion: 'q' };
            const result = gameRef.current.move(moveObj);

            if (!result) {
                return false;
            }

            setPosition(gameRef.current.fen());

            if (!internalCanvasData || !selectedNodeId) {
                return true;
            }

            const childConnections = internalCanvasData.connections.filter(
                (conn) => conn.fromId === selectedNodeId
            );

            const childNodeIds = childConnections.map((conn) => conn.toId);

            let matchingNodeId = null;

            for (const childId of childNodeIds) {
                const childNode = internalCanvasData.nodes.find((node) => node.id === childId);
                if (childNode && childNode.label === result.san) {
                    matchingNodeId = childId;
                }
            }

            const newHistory = [...moveHistory.slice(0, currentIndex + 1), result];
            setMoveHistory(newHistory);
            setCurrentIndex(currentIndex + 1);

            if (matchingNodeId) {
                safeSelectNode(matchingNodeId);
                return true;
            }

            const updatedCanvas = createNodeWithOptimalPosition(
                internalCanvasData,
                selectedNodeId,
                {
                    label: result.san,
                    type: 'move',
                    description: '',
                    pgn: gameRef.current.pgn(),
                }
            );

            const newNodeId = updatedCanvas.nodes[updatedCanvas.nodes.length - 1]?.id;

            if (onUpdateCanvasAndSelectNode) {
                onUpdateCanvasAndSelectNode(updatedCanvas, newNodeId);
            } else {
                safeUpdateCanvas(updatedCanvas);
                safeSelectNode(newNodeId);
            }

            return true;
        } catch (error) {
            console.error("Errore nell'esecuzione della mossa:", error);
            return false;
        }
    };

    // Gestisce il salvataggio delle note con sincronizzazione migliorata
    const saveNote = () => {
        if (!selectedNodeId || !internalCanvasData) return;
        
        // Se la nota è invariata, non fare nulla
        if (currentNote === lastSavedNoteRef.current) return;

        try {
            // Aggiorna il riferimento della nota salvata
            lastSavedNoteRef.current = currentNote;
            
            // Crea una copia profonda dell'oggetto canvas
            const updatedCanvas = JSON.parse(JSON.stringify(internalCanvasData));
            
            // Aggiorna la descrizione del nodo selezionato
            const nodeIndex = updatedCanvas.nodes.findIndex(node => node.id === selectedNodeId);
            if (nodeIndex !== -1) {
                updatedCanvas.nodes[nodeIndex].description = currentNote;
            }
            
            // Aggiorna immediatamente il canvas
            safeUpdateCanvas(updatedCanvas);
        } catch (error) {
            console.error('Errore nel salvataggio della nota:', error);
        }
    };

    // Gestisce il cambio del testo nella textarea
    const handleNoteChange = (e) => {
        setCurrentNote(e.target.value);
    };

    // Gestisce gli eventi dei tasti nella textarea
    const handleNoteKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Impedisce l'inserimento dell'a capo
            saveNote();
            e.target.blur(); // Deseleziona il campo di testo
        }
    };

    const formatMoveNotation = (move, index) => {
        const moveNumber = Math.floor(index / 2) + 1;
        return index % 2 === 0 ? `${moveNumber}. ${move.san}` : move.san;
    };

    const handleSafeClose = (e) => {
        e.stopPropagation();
        if (isUpdatingRef.current) {
            return;
        }
        // Assicuriamoci che le modifiche siano salvate prima di chiudere
        saveNote();
        onClose();
    };

    const hasNextMoves = () => {
        if (currentIndex < moveHistory.length - 1) {
            return true;
        }

        if (!selectedNodeId || !internalCanvasData) {
            return false;
        }

        const hasChildren = internalCanvasData.connections.some(
            (conn) => conn.fromId === selectedNodeId
        );

        return hasChildren;
    };

    // Toggle del pannello mobile
    const toggleMobilePanel = () => {
        setShowMobilePanel(!showMobilePanel);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 rounded-lg shadow-xl w-[96%] max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-3 bg-gray-900 border-b border-gray-700">
                    <h2 className="text-lg font-bold text-white">Scacchiera</h2>
                    <div className="flex items-center gap-3">
                        {/* Toggle mobile per mostrare/nascondere pannello info con icona dinamica */}
                        <button
                            onClick={toggleMobilePanel}
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                            aria-label={showMobilePanel ? 'Nascondi dettagli' : 'Mostra dettagli'}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {showMobilePanel ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 12H4"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                )}
                            </svg>
                        </button>

                        {/* Pulsante per tornare al nodo iniziale */}
                        {initialNodeId && initialNodeId !== selectedNodeId && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToInitialNode();
                                }}
                                className="px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm"
                            >
                                <span className="hidden sm:inline">Posizione iniziale</span>
                                <span className="sm:hidden">Inizio</span>
                            </button>
                        )}

                        {/* Pulsante chiusura */}
                        <button
                            onClick={handleSafeClose}
                            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                            aria-label="Chiudi"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Contenuto principale */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Container scacchiera - parte sinistra */}
                    <div
                        ref={boardContainerRef}
                        className="md:w-2/3 p-4 flex flex-col items-center overflow-y-auto"
                    >
                        {/* Scacchiera con dimensione fissa */}
                        <div
                            style={{
                                width: `${boardSize}px`,
                                height: `${boardSize}px`,
                                maxWidth: '100%',
                                borderRadius: '10px',
                                overflow: 'hidden' ,
                                userSelect: 'none',
                                WebkitUserSelect: 'none'
                            }}
                        >
                            <Chessboard
                                id="responsive-board"
                                position={position}
                                boardWidth={boardSize}
                                areArrowsAllowed={true}
                                customDarkSquareStyle={{ backgroundColor: '#ad7456' }}
                                customLightSquareStyle={{ backgroundColor: '#ead8c0' }}
                                onPieceDrop={handlePieceDrop}
                                customPieces={customPieces}

                            />
                        </div>

                        {/* Controlli navigazione */}
                        <div className="flex justify-center space-x-4 mt-4 w-full">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToStart();
                                }}
                                className="bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded"
                                title="Posizione iniziale"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevious();
                                }}
                                className="bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded"
                                title="Mossa precedente"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                                disabled={!hasNextMoves()}
                                className="bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded disabled:opacity-50"
                                title="Mossa successiva"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToEnd();
                                }}
                                disabled={currentIndex >= moveHistory.length - 1}
                                className="bg-indigo-700 hover:bg-indigo-600 text-white p-2 rounded disabled:opacity-50"
                                title="Ultima mossa"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Note - SOLO PER MOBILE */}
                        <div className="mt-4 w-full md:hidden">
                            <h3 className="text-sm font-medium text-white mb-2">Note</h3>
                            <textarea
                                value={currentNote}
                                onChange={handleNoteChange}
                                onKeyDown={handleNoteKeyDown}
                                onBlur={saveNote}
                                className="w-full bg-gray-700 text-white text-sm p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                rows={3}
                                placeholder="Inserisci note sulla posizione... (Premi Invio per salvare)"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Pannello info mobile (visibile solo su schermi piccoli) */}
                        <div
                            className={`md:hidden mt-4 w-full ${
                                showMobilePanel ? 'block' : 'hidden'
                            }`}
                        >
                            <div className="border-t border-gray-700 pt-3">
                                {/* Lista mosse mobile - ALTEZZA AUMENTATA */}
                                <h3 className="text-base font-medium text-white mb-2">
                                    Storico Mosse
                                </h3>
                                <div className="bg-gray-900 rounded-md p-2 max-h-64 overflow-y-auto">
                                    {moveHistory.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2">
                                            {moveHistory.map((move, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => navigateToMove(index)}
                                                    className={`p-2 rounded text-sm cursor-pointer ${
                                                        currentIndex === index
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'text-gray-300 hover:bg-gray-800'
                                                    }`}
                                                >
                                                    {formatMoveNotation(move, index)}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-center py-4">
                                            Nessuna mossa disponibile
                                        </p>
                                    )}
                                </div>
                                {/* FEN rimosso da mobile */}
                            </div>
                        </div>
                    </div>

                    {/* Pannello laterale - visibile su desktop, nascosto su mobile */}
                    <div className="hidden md:block md:w-1/3 border-l border-gray-700 bg-gray-800 p-4 overflow-y-auto">
                        <h3 className="text-lg font-medium text-white mb-3">Storico Mosse</h3>
                        <div className="bg-gray-900 rounded-md p-3 max-h-60 overflow-y-auto">
                            {moveHistory.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {moveHistory.map((move, index) => (
                                        <div
                                            key={index}
                                            onClick={() => navigateToMove(index)}
                                            className={`p-2 rounded text-sm cursor-pointer ${
                                                currentIndex === index
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'text-gray-300 hover:bg-gray-800'
                                            }`}
                                        >
                                            {formatMoveNotation(move, index)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-4">
                                    Nessuna mossa disponibile
                                </p>
                            )}
                        </div>

                        {/* Info posizione */}
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-1">
                                Posizione FEN
                            </h4>
                            <div className="bg-gray-900 p-2 rounded-md text-xs text-gray-400 overflow-x-auto break-all">
                                {position}
                            </div>

                            <div className="mt-3">
                                <h4 className="text-sm font-medium text-gray-300 mb-1">Turno</h4>
                                <div className="flex items-center">
                                    <div
                                        className={`w-3 h-3 rounded-full mr-2 ${
                                            position.includes(' w ') ? 'bg-white' : 'bg-black'
                                        }`}
                                    ></div>
                                    <span className="text-gray-300">
                                        {position.includes(' w ') ? 'Bianco' : 'Nero'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Note desktop - sempre modificabili */}
                        <div className="mt-4 bg-gray-700 rounded-md p-3">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">
                                Note sulla posizione
                            </h3>
                            <textarea
                                value={currentNote}
                                onChange={handleNoteChange}
                                onKeyDown={handleNoteKeyDown}
                                onBlur={saveNote}
                                className="w-full bg-gray-800 text-white text-sm p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                rows={4}
                                placeholder="Inserisci note sulla posizione... (Premi Invio per salvare)"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                </div>

                {/* Dialog selettore varianti */}
                {showChildSelector && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        onClick={() => setShowChildSelector(false)}
                    >
                        <div
                            className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-medium text-white mb-3">
                                Seleziona variante
                            </h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {childrenOptions.map((child) => (
                                    <button
                                        key={child.id}
                                        onClick={() => handleChildSelect(child.id)}
                                        className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center"
                                    >
                                        <span className="flex-1">{child.label}</span>
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => setShowChildSelector(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                >
                                    Annulla
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// PropTypes
ChessboardPopup.propTypes = {
    pgn: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    nodeDescription: PropTypes.string,
    canvasData: PropTypes.object,
    selectedNodeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onUpdateCanvas: PropTypes.func,
    onSelectNode: PropTypes.func,
    onUpdateCanvasAndSelectNode: PropTypes.func,
};

export default ChessboardPopup;