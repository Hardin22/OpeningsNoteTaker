import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import PropTypes from 'prop-types';
import { createNodeWithOptimalPosition } from '../utils/layoutUtils';

/**
 * Componente ChessboardPopup
 * Funzionalità:
 * 1. Visualizza una posizione di scacchi
 * 2. Permette la navigazione avanti/indietro
 * 3. Seleziona il nodo corrispondente quando si naviga
 */
const ChessboardPopup = ({
    pgn,
    onClose,
    nodeDescription,
    canvasData,
    selectedNodeId,
    onUpdateCanvas,
    onSelectNode,
    onUpdateCanvasAndSelectNode, // Nuova prop
}) => {
    // Stati essenziali
    const [position, setPosition] = useState('');
    const [moveHistory, setMoveHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentNote, setCurrentNote] = useState('');
    const [isEditingNote, setIsEditingNote] = useState(false);

    // NUOVO: Memorizza il nodo iniziale
    const [initialNodeId, setInitialNodeId] = useState(null);

    // NUOVO: Flag di sicurezza per prevenire chiusure
    const [internalCanvasData, setInternalCanvasData] = useState(canvasData);

    // Mappa per associare nodi a genitori
    const parentNodeMap = useRef({});
    // Mappa per associare nodi ai loro PGN
    const nodePgnMap = useRef({});
    // Riferimento all'istanza di Chess (invece di useState)
    const gameRef = useRef(new Chess());
    // Flag per prevenire la chiusura durante gli aggiornamenti
    const isUpdatingRef = useRef(false);
    // Stato del popup (mounted/unmounted)
    const isMountedRef = useRef(true);
    const [childrenOptions, setChildrenOptions] = useState([]);
    const [showChildSelector, setShowChildSelector] = useState(false);

    // NUOVO: Funzioni wrapper sicure per gli aggiornamenti
    const safeUpdateCanvas = useCallback(
        (updatedCanvas) => {
            if (!isMountedRef.current || !onUpdateCanvas) return;

            // Aggiorna lo stato interno prima di notificare il parent
            setInternalCanvasData(updatedCanvas);

            // Usiamo requestAnimationFrame per assicurarci che l'aggiornamento dell'UI
            // avvenga prima di notificare il parent (evitando chiusure impreviste)
            requestAnimationFrame(() => {
                if (isMountedRef.current) {
                    onUpdateCanvas(updatedCanvas);
                }
            });
        },
        [onUpdateCanvas]
    );

    const safeSelectNode = useCallback(
        (nodeId) => {
            if (!isMountedRef.current || !onSelectNode) return;

            // Uso di requestAnimationFrame per lo stesso motivo
            requestAnimationFrame(() => {
                if (isMountedRef.current) {
                    onSelectNode(nodeId);
                }
            });
        },
        [onSelectNode]
    );

    // Quando il componente viene montato/smontato
    useEffect(() => {
        isMountedRef.current = true;

        // Cleanup function
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Aggiorniamo lo stato interno quando cambiano i props esterni
    useEffect(() => {
        if (canvasData && JSON.stringify(canvasData) !== JSON.stringify(internalCanvasData)) {
            setInternalCanvasData(canvasData);
        }
    }, [canvasData]);

    // Carica il PGN e costruisci le mappe di relazione
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
        setCurrentNote(nodeDescription || '');

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
    }, [pgn, nodeDescription, internalCanvasData, initialNodeId]);

    // Funzione ausiliaria per trovare un nodo per ID
    const findNodeById = (nodes, nodeId) => {
        return nodes.find((node) => node.id === nodeId);
    };

    // Naviga ad un nodo specifico
    const navigateToNode = (nodeId) => {
        if (!nodeId || !internalCanvasData) return;

        // Trova il nodo
        const targetNode = findNodeById(internalCanvasData.nodes, nodeId);
        if (!targetNode) return;

        // Se abbiamo il PGN per questo nodo, caricalo
        const nodePgn = targetNode.pgn || nodePgnMap.current[nodeId] || pgn;

        try {
            // Carica il PGN del nodo
            gameRef.current.reset();
            if (nodePgn && nodePgn.trim()) {
                gameRef.current.loadPgn(nodePgn);
            }

            // Aggiorna la posizione
            const history = gameRef.current.history({ verbose: true });
            setPosition(gameRef.current.fen());
            setMoveHistory(history);
            setCurrentIndex(history.length - 1);

            // Seleziona il nodo
            if (nodeId !== selectedNodeId) {
                safeSelectNode(nodeId);
            }

            // Aggiorna la nota
            const node = findNodeById(internalCanvasData.nodes, nodeId);
            if (node) {
                setCurrentNote(node.description || '');
            }
        } catch (error) {
            console.error('Errore nella navigazione al nodo:', error);
        }
    };

    // Funzione per navigare a una mossa specifica
    const navigateToMove = (index) => {
        try {
            // Reset del gioco
            gameRef.current.reset();

            // Se non è la posizione iniziale, esegui le mosse fino all'indice specificato
            if (index >= 0) {
                for (let i = 0; i <= index; i++) {
                    if (i < moveHistory.length) {
                        gameRef.current.move(moveHistory[i]);
                    }
                }
            }

            // Aggiorna la posizione e l'indice corrente
            setPosition(gameRef.current.fen());
            setCurrentIndex(index);
        } catch (error) {
            console.error('Errore nella navigazione:', error);
        }
    };

    // FUNZIONI DI NAVIGAZIONE SEMPLIFICATE

    // Vai alla posizione iniziale
    const goToStart = () => {
        // Semplicemente torna alla posizione iniziale (prima di qualsiasi mossa)
        navigateToMove(-1);
    };

    // Vai al nodo genitore diretto
    const goToPrevious = () => {
        // Se abbiamo un nodo selezionato, trova il suo genitore diretto e naviga ad esso
        if (selectedNodeId && parentNodeMap.current[selectedNodeId]) {
            const parentId = parentNodeMap.current[selectedNodeId];
            navigateToNode(parentId);
        } else {
            // Fallback: se non troviamo un genitore, usa la navigazione standard
            currentIndex > -1 && navigateToMove(currentIndex - 1);
        }
    };

    // Vai alla prossima mossa (se siamo in una sequenza lineare)
    const goToNext = () => {
        // Se abbiamo mosse rimanenti nella sequenza lineare, prosegui normalmente
        if (currentIndex < moveHistory.length - 1) {
            navigateToMove(currentIndex + 1);
            return;
        }

        // Altrimenti, cerca figli diretti del nodo selezionato nel grafo
        if (selectedNodeId && internalCanvasData) {
            // Trova tutti i figli del nodo corrente
            const childConnections = internalCanvasData.connections.filter(
                (conn) => conn.fromId === selectedNodeId
            );

            if (childConnections.length === 0) {
                // Nessun figlio disponibile
                return;
            }

            // Prepara opzioni di figli
            const childOptions = childConnections.map((conn) => {
                const childNode = internalCanvasData.nodes.find((node) => node.id === conn.toId);
                return {
                    id: conn.toId,
                    label: childNode ? childNode.label : 'Mossa sconosciuta',
                };
            });

            if (childOptions.length === 1) {
                // Se c'è un solo figlio, naviga direttamente
                navigateToNode(childOptions[0].id);
            } else if (childOptions.length > 1) {
                // Se ci sono più figli, mostra il dialog di selezione
                setChildrenOptions(childOptions);
                setShowChildSelector(true);
            }
        }
    };

    // Funzione per gestire la selezione di un nodo figlio
    const handleChildSelect = (nodeId) => {
        setShowChildSelector(false);
        navigateToNode(nodeId);
    };

    // Vai all'ultima posizione
    const goToEnd = () => {
        navigateToMove(moveHistory.length - 1);
    };

    // NUOVO: Torna al nodo iniziale
    const goToInitialNode = () => {
        if (initialNodeId) {
            navigateToNode(initialNodeId);
        }
    };

    // NUOVA IMPLEMENTAZIONE ROBUSTA per il drop delle mosse
    // NUOVA IMPLEMENTAZIONE ROBUSTA per il drop delle mosse
    const handlePieceDrop = (sourceSquare, targetSquare) => {
        console.log('===== NUOVO DROP =====');
        try {
            // Esegui la mossa
            const moveObj = { from: sourceSquare, to: targetSquare, promotion: 'q' };
            const result = gameRef.current.move(moveObj);

            if (!result) {
                console.log('Mossa non valida');
                return false;
            }

            console.log('Mossa eseguita:', result.san);

            // Aggiorna la scacchiera
            setPosition(gameRef.current.fen());

            // Se non abbiamo dati canvas o un nodo selezionato, usciamo qui
            if (!internalCanvasData || !selectedNodeId) {
                console.log('Nessun canvas o nodo selezionato');
                return true;
            }

            console.log('Nodo selezionato:', selectedNodeId);
            console.log('Posizione corrente FEN:', gameRef.current.fen());

            // 1. Trova tutti i figli diretti del nodo selezionato
            const childConnections = internalCanvasData.connections.filter(
                (conn) => conn.fromId === selectedNodeId
            );
            console.log('Connessioni figlie trovate:', childConnections.length);

            const childNodeIds = childConnections.map((conn) => conn.toId);
            console.log('ID dei nodi figli:', childNodeIds);

            // 2. Cerca tra i figli uno con la stessa etichetta della mossa
            let matchingNodeId = null;

            // Debug: Stampa tutti i figli e le loro etichette
            console.log('Dettagli dei nodi figli:');
            for (const childId of childNodeIds) {
                const childNode = internalCanvasData.nodes.find((node) => node.id === childId);
                console.log(`Nodo ${childId}:`, childNode ? childNode.label : 'non trovato');

                if (childNode && childNode.label === result.san) {
                    matchingNodeId = childId;
                    console.log(
                        `TROVATA CORRISPONDENZA: Nodo ${childId} ha etichetta "${childNode.label}"`
                    );
                }
            }

            // Aggiorna la storia delle mosse
            const newHistory = [...moveHistory.slice(0, currentIndex + 1), result];
            setMoveHistory(newHistory);
            setCurrentIndex(currentIndex + 1);

            // 3. Se esiste, naviga ad esso
            if (matchingNodeId) {
                console.log(
                    `[PERCORSO ESISTENTE] Usando nodo ${matchingNodeId} per la mossa ${result.san}`
                );
                console.log('Chiamando safeSelectNode con ID:', matchingNodeId);

                // Importante: esplicitamente non creare un nuovo nodo
                safeSelectNode(matchingNodeId);
                return true;
            }

            // 4. Altrimenti crea un nuovo nodo
            console.log(`[NUOVO NODO] Creando un nuovo nodo per la mossa ${result.san}`);
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
            console.log('Nuovo nodo creato con ID:', newNodeId);

            if (onUpdateCanvasAndSelectNode) {
                console.log('Usando onUpdateCanvasAndSelectNode');
                onUpdateCanvasAndSelectNode(updatedCanvas, newNodeId);
            } else {
                console.log('Usando setInternalCanvasData + safeUpdateCanvas + safeSelectNode');
                setInternalCanvasData(updatedCanvas);
                safeUpdateCanvas(updatedCanvas);
                safeSelectNode(newNodeId);
            }

            return true;
        } catch (error) {
            console.error("Errore nell'esecuzione della mossa:", error);
            return false;
        }
    };

    // Salva la nota associata al nodo
    const saveNote = () => {
        if (!selectedNodeId || !internalCanvasData) return;

        try {
            // Aggiorna il nodo con la nuova descrizione
            const updatedNodes = internalCanvasData.nodes.map((node) => {
                if (node.id === selectedNodeId) {
                    return { ...node, description: currentNote };
                }
                return node;
            });

            // Crea un nuovo oggetto canvas con i nodi aggiornati
            const updatedCanvas = {
                ...internalCanvasData,
                nodes: updatedNodes,
            };

            // Aggiorna prima lo stato interno
            setInternalCanvasData(updatedCanvas);

            // Poi notifica il parent in modo sicuro
            safeUpdateCanvas(updatedCanvas);

            // Esci dalla modalità di modifica
            setIsEditingNote(false);
        } catch (error) {
            console.error('Errore nel salvataggio della nota:', error);
        }
    };

    // Formatta la notazione della mossa
    const formatMoveNotation = (move, index) => {
        const moveNumber = Math.floor(index / 2) + 1;
        return index % 2 === 0 ? `${moveNumber}. ${move.san}` : move.san;
    };

    // NUOVO: Gestore di chiusura sicuro
    const handleSafeClose = (e) => {
        // Se stiamo aggiornando, impedisci la chiusura
        if (isUpdatingRef.current) {
            console.log("Chiusura impedita durante l'aggiornamento");
            e.preventDefault();
            return;
        }

        // Altrimenti, procedi con la chiusura
        onClose();
    };
    const hasNextMoves = () => {
        // Caso 1: Ci sono ancora mosse nella sequenza corrente
        if (currentIndex < moveHistory.length - 1) {
            return true;
        }

        // Caso 2: Non siamo all'ultima mossa della sequenza
        if (!selectedNodeId || !internalCanvasData) {
            return false;
        }

        // Caso 3: Controlla se il nodo selezionato ha figli nel grafo
        const hasChildren = internalCanvasData.connections.some(
            (conn) => conn.fromId === selectedNodeId
        );

        return hasChildren;
    };
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={(e) => {
                // Impedisci la chiusura accidentale cliccando sul background
                e.stopPropagation();
            }}
        >
            <div
                className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-5xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">Scacchiera</h2>
                    <div className="flex items-center space-x-3">
                        {/* Pulsante per tornare al nodo iniziale */}
                        {initialNodeId && initialNodeId !== selectedNodeId && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToInitialNode();
                                }}
                                className="text-sm bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Posizione iniziale
                            </button>
                        )}
                        <button
                            onClick={handleSafeClose}
                            className="text-gray-400 hover:text-white focus:outline-none transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
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
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Scacchiera */}
                    <div className="md:w-2/3 p-4">
                        <div className="aspect-square w-full max-w-lg mx-auto">
                            <Chessboard
                                position={position}
                                boardWidth={500}
                                areArrowsAllowed={false}
                                customDarkSquareStyle={{ backgroundColor: '#4b7399' }}
                                customLightSquareStyle={{ backgroundColor: '#eae9d2' }}
                                onPieceDrop={handlePieceDrop}
                            />
                        </div>

                        {/* Controlli - MANTENUTI SOTTO LA SCACCHIERA */}
                        <div className="flex justify-center items-center space-x-4 mt-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToStart();
                                }}
                                className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Vai alla posizione iniziale"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
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
                                className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Mossa precedente"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
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
                                disabled={!hasNextMoves()} // Sostituisci la condizione precedente con questa
                                className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Mossa successiva"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
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
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToEnd();
                                }}
                                disabled={currentIndex >= moveHistory.length - 1}
                                className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Vai all'ultima mossa"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
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
                    </div>

                    {/* Pannello laterale - [resto del codice invariato] */}
                    <div className="md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-700">
                        <h3 className="text-lg font-medium text-white mb-3 ">Storico Mosse</h3>
                        <div className="overflow-y-auto min-h-50 max-h-60 bg-gray-900 rounded p-3">
                            {moveHistory.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {moveHistory.map((move, index) => (
                                        <div
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateToMove(index);
                                            }}
                                            className={`p-2 cursor-pointer text-sm rounded transition-colors
                                                ${
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

                        {/* Info sulla posizione */}
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-1">
                                Posizione FEN
                            </h4>
                            <div className="bg-gray-900 p-2 rounded text-xs text-gray-400 overflow-x-auto break-all">
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

                        {/* Note */}
                        <div className="mt-4 px-4 py-3 bg-gray-700 border-b border-gray-600 rounded">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium text-gray-300 mb-1">
                                    Nota sulla posizione
                                </h3>
                                {!isEditingNote ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsEditingNote(true);
                                        }}
                                        className="text-xs text-indigo-400 hover:text-indigo-300"
                                    >
                                        Modifica
                                    </button>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            saveNote();
                                        }}
                                        className="text-xs text-green-400 hover:text-green-300"
                                    >
                                        Salva
                                    </button>
                                )}
                            </div>

                            {!isEditingNote ? (
                                <div className="text-white text-sm bg-gray-800 p-3 rounded overflow-auto max-h-32 whitespace-pre-wrap">
                                    {currentNote || (
                                        <span className="text-gray-500 italic">Nessuna nota</span>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    value={currentNote}
                                    onChange={(e) => setCurrentNote(e.target.value)}
                                    className="w-full bg-gray-800 text-white text-sm p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows={4}
                                    placeholder="Inserisci una nota per questa posizione..."
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </div>

                        {/* Info sul nodo iniziale per debug/test */}
                        {initialNodeId && (
                            <div className="mt-4 text-xs text-gray-400">
                                <span className="italic">Nodo iniziale:</span> {initialNodeId}
                                {initialNodeId === selectedNodeId ? ' (selezionato)' : ''}
                            </div>
                        )}
                        {showChildSelector && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full">
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
                                                    xmlns="http://www.w3.org/2000/svg"
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
            </div>
        </div>
    );
};

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