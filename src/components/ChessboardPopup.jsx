import { Chess } from 'chess.js';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import customPieces from '../utils/customPieces';
import { createNodeWithOptimalPosition } from '../utils/layoutUtils';
import EvalBar from './EvalBar';
import OpeningExplorer from './OpeningExplorer';
import StockfishComponent from './Stockfish';

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

    // Nuovi stati per highlighting e mosse legali
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [squareStyles, setSquareStyles] = useState({});
    const [isDragging, setIsDragging] = useState(false);

    // Riferimenti
    const parentNodeMap = useRef({});
    const nodePgnMap = useRef({});
    const gameRef = useRef(new Chess());
    const isUpdatingRef = useRef(false);
    const isMountedRef = useRef(true);
    const boardContainerRef = useRef(null);
    const lastSavedNoteRef = useRef('');

    //eval
    const [currentEvaluation, setCurrentEvaluation] = useState(0);
    const [boardOrientation, setBoardOrientation] = useState('white'); // o 'black'

    // Aggiungi stato per la gestione delle tab
    const [activeTab, setActiveTab] = useState('moves'); // 'moves', 'analysis', 'explorer', 'notes'

    // Dimensionamento della scacchiera - ora senza margini su mobile
    const [boardSize, setBoardSize] = useState(400);

    const [stockfishEnabled, setStockfishEnabled] = useState(false);

    // Aggiungi uno stato per rilevare se siamo su mobile
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    // Aggiungi stato per toggle annotazione mosse
    const [annotateMovesEnabled, setAnnotateMovesEnabled] = useState(true);

    // Aggiungi un effect per monitorare le dimensioni della finestra
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Gestisce il dimensionamento della scacchiera per massimizzare lo spazio
    useEffect(() => {
        const updateBoardSize = () => {
            if (boardContainerRef.current) {
                // Per mobile (<768px) usa TUTTA la larghezza disponibile
                if (window.innerWidth < 768) {
                    const viewportWidth = window.innerWidth;
                    // Sottrai solo un minimo spazio per il bordo
                    setBoardSize(viewportWidth - 10);
                }
                // Per desktop, dimensiona per massimizzare lo spazio disponibile
                else {
                    const containerWidth = boardContainerRef.current.clientWidth;
                    const containerHeight = boardContainerRef.current.clientHeight;

                    // Calcola il lato massimo considerando sia altezza che larghezza
                    // Sottrai spazio per i controlli sotto la scacchiera e per i margini
                    const maxHeight = containerHeight - 80; // Spazio per i controlli sotto
                    const maxWidth = containerWidth * 0.95; // 95% della larghezza del contenitore

                    // Usa il valore minore tra larghezza e altezza per mantenere un quadrato
                    const optimalSize = Math.min(maxHeight, maxWidth);

                    // Imposta la dimensione, assicurandosi che sia almeno 400px su desktop
                    setBoardSize(Math.max(400, optimalSize));
                }
            }
        };

        // Aggiorna la dimensione iniziale
        updateBoardSize();

        // Crea un ResizeObserver per aggiornare la dimensione quando il contenitore cambia
        const resizeObserver = new ResizeObserver(() => {
            updateBoardSize();
        });

        if (boardContainerRef.current) {
            resizeObserver.observe(boardContainerRef.current);
        }

        // Aggiorna la dimensione quando la finestra cambia
        window.addEventListener('resize', updateBoardSize);

        return () => {
            window.removeEventListener('resize', updateBoardSize);
            resizeObserver.disconnect();
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

        // Evidenzia l'ultima mossa dopo il caricamento se esiste
        if (history.length > 0) {
            const lastMove = history[history.length - 1];
            applyHighlightToMove(lastMove.from, lastMove.to);
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

    // NUOVA FUNZIONE: Evidenzia le caselle di partenza e arrivo di una mossa
    const applyHighlightToMove = useCallback((from, to) => {
        if (!from || !to) return;

        setSquareStyles({
            [from]: { backgroundColor: 'rgba(255, 170, 0, 0.5)' },
            [to]: { backgroundColor: 'rgba(255, 170, 0, 0.5)' },
        });
    }, []);

    // NUOVA FUNZIONE: Mostra le mosse legali per un pezzo selezionato
    const showLegalMoves = useCallback((square) => {
        if (!square) return {};

        const moves = {};
        const legalMoves = gameRef.current.moves({
            square: square,
            verbose: true,
        });

        legalMoves.forEach((move) => {
            moves[move.to] = {
                background: `radial-gradient(circle, rgba(0, 0, 0, 0.4) 19%, transparent 20%)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            };
        });

        // Evidenzia la casella selezionata
        moves[square] = {
            backgroundColor: 'rgba(0, 128, 255, 0.4)',
        };

        return moves;
    }, []);

    // Naviga ad un nodo specifico
    const navigateToNode = useCallback(
        (nodeId) => {
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
                setSelectedSquare(null);

                // Evidenzia l'ultima mossa caricata
                if (history.length > 0) {
                    const lastMove = history[history.length - 1];
                    applyHighlightToMove(lastMove.from, lastMove.to);
                } else {
                    setSquareStyles({});
                }

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
        },
        [internalCanvasData, pgn, selectedNodeId, safeSelectNode, applyHighlightToMove]
    );

    // Funzione per navigare a una mossa specifica
    const navigateToMove = useCallback(
        (index) => {
            try {
                gameRef.current.reset();

                if (index >= 0) {
                    for (let i = 0; i <= index; i++) {
                        if (i < moveHistory.length) {
                            gameRef.current.move(moveHistory[i]);
                        }
                    }

                    // Evidenzia l'ultima mossa navigata
                    if (index >= 0 && moveHistory[index]) {
                        applyHighlightToMove(moveHistory[index].from, moveHistory[index].to);
                    }
                } else {
                    // Se torniamo all'inizio, rimuovi tutte le evidenziazioni
                    setSquareStyles({});
                }

                setPosition(gameRef.current.fen());
                setCurrentIndex(index);
                setSelectedSquare(null);
            } catch (error) {
                console.error('Errore nella navigazione:', error);
            }
        },
        [moveHistory, applyHighlightToMove]
    );

    // FUNZIONI DI NAVIGAZIONE
    const goToStart = useCallback(() => {
        navigateToMove(-1);
    }, [navigateToMove]);

    const goToPrevious = useCallback(() => {
        if (selectedNodeId && parentNodeMap.current[selectedNodeId]) {
            const parentId = parentNodeMap.current[selectedNodeId];
            navigateToNode(parentId);
        } else {
            currentIndex > -1 && navigateToMove(currentIndex - 1);
        }
    }, [selectedNodeId, currentIndex, navigateToNode, navigateToMove]);

    const goToNext = useCallback(() => {
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
    }, [
        currentIndex,
        moveHistory,
        selectedNodeId,
        internalCanvasData,
        navigateToMove,
        navigateToNode,
    ]);

    const handleChildSelect = useCallback(
        (nodeId) => {
            setShowChildSelector(false);
            navigateToNode(nodeId);
        },
        [navigateToNode]
    );

    const goToEnd = useCallback(() => {
        navigateToMove(moveHistory.length - 1);
    }, [moveHistory, navigateToMove]);

    const goToInitialNode = useCallback(() => {
        if (initialNodeId) {
            navigateToNode(initialNodeId);
        }
    }, [initialNodeId, navigateToNode]);

    // NUOVA FUNZIONE: Gestisce il click sulle caselle della scacchiera
    const onSquareClick = useCallback(
        (square) => {
            // Se siamo all'ultima mossa della storia, consenti interazione
            const isAtLatestMove = currentIndex === moveHistory.length - 1;
            if (!isAtLatestMove) return;

            // Caso 1: Clicco sulla casella già selezionata (deseleziona)
            if (selectedSquare === square) {
                setSelectedSquare(null);
                // Se c'è una mossa precedente, la reevidenziamo
                if (moveHistory.length > 0 && currentIndex >= 0) {
                    const lastHistoryMove = moveHistory[currentIndex];
                    applyHighlightToMove(lastHistoryMove.from, lastHistoryMove.to);
                } else {
                    setSquareStyles({});
                }
                return;
            }

            // Caso 2: C'è già una casella selezionata
            if (selectedSquare) {
                // Ottieni il pezzo nella casella di destinazione
                const targetPiece = gameRef.current.get(square);

                // Se è un pezzo dello stesso colore, cambia selezione
                const turn = gameRef.current.turn();
                if (targetPiece && targetPiece.color === turn) {
                    setSelectedSquare(square);
                    setSquareStyles(showLegalMoves(square));
                    return;
                }

                // Prova a fare la mossa
                const tempGame = new Chess(gameRef.current.fen());
                const isLegalMove = tempGame.move({
                    from: selectedSquare,
                    to: square,
                    promotion: 'q',
                });

                if (isLegalMove) {
                    // Se è una mossa valida, la eseguiamo
                    handlePieceDrop(selectedSquare, square);
                } else {
                    // Se non è valida, deseleziona e mostra l'ultima mossa
                    setSelectedSquare(null);
                    if (moveHistory.length > 0 && currentIndex >= 0) {
                        const lastHistoryMove = moveHistory[currentIndex];
                        applyHighlightToMove(lastHistoryMove.from, lastHistoryMove.to);
                    } else {
                        setSquareStyles({});
                    }
                }
            } else {
                // Caso 3: Nuova selezione
                const piece = gameRef.current.get(square);
                const turn = gameRef.current.turn();
                if (piece && piece.color === turn) {
                    setSelectedSquare(square);
                    setSquareStyles(showLegalMoves(square));
                }
            }
        },
        [selectedSquare, moveHistory, currentIndex, showLegalMoves, applyHighlightToMove]
    );

    // NUOVE FUNZIONI: Gestione del trascinamento dei pezzi
    const onPieceDragBegin = useCallback(
        (piece, sourceSquare) => {
            // Verifica che si stia interagendo con la posizione attuale
            const isAtLatestMove = currentIndex === moveHistory.length - 1;
            if (!isAtLatestMove) return;

            const turn = gameRef.current.turn();
            if (piece[0] === turn) {
                setIsDragging(true);
                setSelectedSquare(sourceSquare);
                setSquareStyles(showLegalMoves(sourceSquare));
            }
        },
        [currentIndex, moveHistory.length, showLegalMoves]
    );

    const onPieceDragEnd = useCallback(() => {
        setIsDragging(false);
        // handlePieceDrop si occuperà di gestire gli stili se la mossa è valida
    }, []);

    // Aggiorna handlePieceDrop per includere l'highlighting
    const handlePieceDrop = useCallback(
        (sourceSquare, targetSquare) => {
            // Verifica che siamo all'ultima mossa della storia
            const isAtLatestMove = currentIndex === moveHistory.length - 1;
            if (!isAtLatestMove) return false;

            try {
                const moveObj = { from: sourceSquare, to: targetSquare, promotion: 'q' };
                const result = gameRef.current.move(moveObj);

                if (!result) {
                    // Se la mossa non è valida, pulisci la selezione e mostra l'ultima mossa evidenziata
                    setSelectedSquare(null);
                    if (moveHistory.length > 0 && currentIndex >= 0) {
                        const lastMove = moveHistory[currentIndex];
                        applyHighlightToMove(lastMove.from, lastMove.to);
                    }
                    return false;
                }

                setPosition(gameRef.current.fen());

                // Evidenzia immediatamente la mossa eseguita
                applyHighlightToMove(sourceSquare, targetSquare);
                setSelectedSquare(null);

                // Aggiorna la storia delle mosse
                const newHistory = [...moveHistory.slice(0, currentIndex + 1), result];
                setMoveHistory(newHistory);
                setCurrentIndex(currentIndex + 1);

                // Gestione nodi - solo se l'annotazione è abilitata
                if (!annotateMovesEnabled || !internalCanvasData || !selectedNodeId) {
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
        },
        [
            currentIndex,
            moveHistory,
            internalCanvasData,
            selectedNodeId,
            safeSelectNode,
            safeUpdateCanvas,
            onUpdateCanvasAndSelectNode,
            applyHighlightToMove,
            annotateMovesEnabled, // Aggiungi la dipendenza
        ]
    );

    // Gestisce il salvataggio delle note con sincronizzazione migliorata
    const saveNote = useCallback(() => {
        if (!selectedNodeId || !internalCanvasData) return;

        // Se la nota è invariata, non fare nulla
        if (currentNote === lastSavedNoteRef.current) return;

        try {
            // Aggiorna il riferimento della nota salvata
            lastSavedNoteRef.current = currentNote;

            // Crea una copia profonda dell'oggetto canvas
            const updatedCanvas = JSON.parse(JSON.stringify(internalCanvasData));

            // Aggiorna la descrizione del nodo selezionato
            const nodeIndex = updatedCanvas.nodes.findIndex((node) => node.id === selectedNodeId);
            if (nodeIndex !== -1) {
                updatedCanvas.nodes[nodeIndex].description = currentNote;
            }

            // Aggiorna immediatamente il canvas
            safeUpdateCanvas(updatedCanvas);
        } catch (error) {
            console.error('Errore nel salvataggio della nota:', error);
        }
    }, [selectedNodeId, internalCanvasData, currentNote, safeUpdateCanvas]);

    // Gestisce il cambio del testo nella textarea
    const handleNoteChange = useCallback((e) => {
        setCurrentNote(e.target.value);
    }, []);

    // Gestisce gli eventi dei tasti nella textarea
    const handleNoteKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Impedisce l'inserimento dell'a capo
                saveNote();
                e.target.blur(); // Deseleziona il campo di testo
            }
        },
        [saveNote]
    );

    const formatMoveNotation = useCallback((move, index) => {
        const moveNumber = Math.floor(index / 2) + 1;
        return index % 2 === 0 ? `${moveNumber}. ${move.san}` : move.san;
    }, []);

    const handleSafeClose = useCallback(
        (e) => {
            e.stopPropagation();
            if (isUpdatingRef.current) {
                return;
            }
            // Assicuriamoci che le modifiche siano salvate prima di chiudere
            saveNote();
            onClose();
        },
        [onClose, saveNote]
    );

    const hasNextMoves = useCallback(() => {
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
    }, [currentIndex, moveHistory.length, selectedNodeId, internalCanvasData]);

    const toggleStockfish = useCallback(() => {
        setStockfishEnabled((prev) => !prev);
    }, []);

    const toggleAnnotation = useCallback(() => {
        setAnnotateMovesEnabled((prev) => !prev);
    }, []);

    const handleOpeningMoveSelect = useCallback(
        (moveSan) => {
            try {
                // Verifica che siamo all'ultima mossa della storia
                const isAtLatestMove = currentIndex === moveHistory.length - 1;
                if (!isAtLatestMove) return;

                // Crea una nuova posizione basata sulla mossa
                const gameCopy = new Chess(position);
                const result = gameCopy.move(moveSan);

                if (!result) return;

                // Imposta la nuova posizione
                setPosition(gameCopy.fen());

                // Evidenzia la mossa appena eseguita
                // Cerca le caselle di partenza e arrivo
                const moves = gameRef.current.moves({ verbose: true });
                const moveInfo = moves.find((m) => m.san === moveSan);
                if (moveInfo) {
                    applyHighlightToMove(moveInfo.from, moveInfo.to);
                }

                setSelectedSquare(null);

                // Aggiorna la storia delle mosse
                const newHistory = [...moveHistory.slice(0, currentIndex + 1), result];
                setMoveHistory(newHistory);
                setCurrentIndex(currentIndex + 1);

                // Aggiorna anche l'oggetto gameRef
                gameRef.current.move(moveSan);

                // === INIZIO LOGICA DI CREAZIONE NODI - Copiata da handlePieceDrop ===
                if (!annotateMovesEnabled || !internalCanvasData || !selectedNodeId) {
                    return;
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

                if (matchingNodeId) {
                    safeSelectNode(matchingNodeId);
                    return;
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
                // === FINE LOGICA DI CREAZIONE NODI ===
            } catch (error) {
                console.error("Errore nell'eseguire la mossa:", error);
            }
        },
        [
            position,
            moveHistory,
            currentIndex,
            selectedNodeId,
            internalCanvasData,
            safeSelectNode,
            safeUpdateCanvas,
            onUpdateCanvasAndSelectNode,
            applyHighlightToMove,
            annotateMovesEnabled, // Aggiungi la dipendenza
        ]
    );

    // Modifica il posizionamento dell'EvalBar in base alla visualizzazione
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 rounded-lg shadow-xl md:w-[96%] w-full max-w-6xl h-[98vh] flex flex-col overflow-hidden relative"
                style={{
                    height: 'calc(100% - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
                    marginTop: 'env(safe-area-inset-top)',
                    marginBottom: 'env(safe-area-inset-bottom)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Pulsante di chiusura */}
                <button
                    onClick={handleSafeClose}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-gray-800 bg-opacity-80 text-gray-300 hover:text-white hover:bg-gray-700 shadow-md"
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

                {/* NAVBAR ORIZZONTALE MOBILE */}
                {isMobileView && (
                    <div className="w-full px-1 border-b border-gray-700">
                        <div className="flex overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setActiveTab('moves')}
                                className={`flex items-center p-3 whitespace-nowrap flex-1 justify-center ${
                                    activeTab === 'moves'
                                        ? 'text-white border-b-2 border-indigo-500 bg-gray-700'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                                <span className="ml-1">Mosse</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('analysis')}
                                className={`flex items-center p-3 whitespace-nowrap flex-1 justify-center ${
                                    activeTab === 'analysis'
                                        ? 'text-white border-b-2 border-indigo-500 bg-gray-700'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                <span className="ml-1">Analisi</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('explorer')}
                                className={`flex items-center p-3 whitespace-nowrap flex-1 justify-center ${
                                    activeTab === 'explorer'
                                        ? 'text-white border-b-2 border-indigo-500 bg-gray-700'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-1">DB</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('notes')}
                                className={`flex items-center p-3 whitespace-nowrap flex-1 justify-center ${
                                    activeTab === 'notes'
                                        ? 'text-white border-b-2 border-indigo-500 bg-gray-700'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-1">Note</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Contenuto principale */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Container principale */}
                    <div className="flex flex-col md:w-2/3 w-full h-full">
                        {/* Contenitore scacchiera - con EvalBar verticale solo per desktop */}
                        <div
                            ref={boardContainerRef}
                            className="flex justify-center items-center md:flex-1 md:py-4 py-0 w-full"
                        >
                            {/* Barra di valutazione verticale - visibile solo su desktop con engine attivo */}
                            {stockfishEnabled && !isMobileView && (
                                <EvalBar
                                    evaluation={currentEvaluation}
                                    height={boardSize}
                                    isFlipped={boardOrientation === 'black'}
                                    orientation="vertical"
                                />
                            )}

                            {/* Scacchiera */}
                            <div
                                style={{
                                    width: `${boardSize}px`,
                                    height: `${boardSize}px`,
                                    maxWidth: '100%',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                }}
                                className="select-none shadow-lg"
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
                                    customSquareStyles={squareStyles}
                                    onSquareClick={onSquareClick}
                                    onPieceDragBegin={onPieceDragBegin}
                                    onPieceDragEnd={onPieceDragEnd}
                                    boardOrientation={boardOrientation}
                                    onDragOverSquare={() => {}}
                                    customDropSquareStyle={{
                                        boxShadow: 'none',
                                        backgroundColor: 'none',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Barra di valutazione orizzontale - visibile solo su mobile con engine attivo */}
                        {stockfishEnabled && isMobileView && (
                            <div className="w-full px-1 mt-1">
                                <EvalBar
                                    evaluation={currentEvaluation}
                                    isFlipped={boardOrientation === 'black'}
                                    orientation="horizontal"
                                />
                            </div>
                        )}

                        {/* Controlli di navigazione - desktop */}
                        <div className="hidden md:flex flex-col items-center mb-4 w-full">
                            {/* Pulsanti di navigazione ricentrati e ridisegnati */}
                            <div className="flex justify-center gap-1 mx-auto mb-2">
                                <div className="flex rounded-lg overflow-hidden shadow-lg">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToStart();
                                        }}
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-3 w-14 md:w-16"
                                        title="Inizio sequenza"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-3 w-14 md:w-16 border-l border-gray-800"
                                        title="Mossa precedente"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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
                                        disabled={!hasNextMoves()}
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-3 w-14 md:w-16 border-l border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Mossa successiva"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-3 w-14 md:w-16 border-l border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Ultima mossa"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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

                            {/* Riga aggiuntiva per pulsanti opzionali - DESKTOP */}
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleAnnotation();
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                                        annotateMovesEnabled
                                            ? 'bg-teal-600 hover:bg-teal-500'
                                            : 'bg-gray-600 hover:bg-gray-500'
                                    } text-white transition-colors shadow-md`}
                                    title={
                                        annotateMovesEnabled
                                            ? 'Disattiva annotazione mosse'
                                            : 'Attiva annotazione mosse'
                                    }
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    <span className="text-sm font-medium hidden md:inline">
                                        {annotateMovesEnabled
                                            ? 'Annotazione ON'
                                            : 'Annotazione OFF'}
                                    </span>
                                </button>

                                {initialNodeId && initialNodeId !== selectedNodeId && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToInitialNode();
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-md"
                                        title="Torna alla posizione iniziale"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm font-medium hidden md:inline">
                                            Posizione iniziale
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* NUOVO LAYOUT CONTROLLI - MOBILE: controlli su un'unica riga */}
                        <div className="md:hidden flex justify-between items-center px-2 mb-2 w-full">
                            <div className="flex-shrink-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleAnnotation();
                                    }}
                                    className={`flex items-center justify-center p-2 rounded-lg ${
                                        annotateMovesEnabled
                                            ? 'bg-teal-600 hover:bg-teal-500'
                                            : 'bg-gray-600 hover:bg-gray-500'
                                    } text-white shadow-md w-10 h-10`}
                                    title={
                                        annotateMovesEnabled
                                            ? 'Disattiva annotazione'
                                            : 'Attiva annotazione'
                                    }
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <div className="flex rounded-lg overflow-hidden shadow-lg">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToStart();
                                        }}
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-2 w-10"
                                        title="Inizio sequenza"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-2 w-10 border-l border-gray-800"
                                        title="Mossa precedente"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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
                                        disabled={!hasNextMoves()}
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-2 w-10 border-l border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Mossa successiva"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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
                                        className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white p-2 w-10 border-l border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Ultima mossa"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
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

                            <div className="flex-shrink-0">
                                {initialNodeId && initialNodeId !== selectedNodeId ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToInitialNode();
                                        }}
                                        className="flex items-center justify-center p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-md w-10 h-10"
                                        title="Torna alla posizione iniziale"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                ) : (
                                    <div className="w-10"></div>
                                )}
                            </div>
                        </div>

                        {/* INIZIO CONTENUTO MOBILE-ONLY - il contenuto dei tab, spostati dalla navbar */}
                        {isMobileView && (
                            <div className="flex-1 overflow-y-auto px-1 py-2">
                                {activeTab === 'moves' && (
                                    <div className="bg-gray-900 rounded-md p-2">
                                        <div className="flex items-center mb-2">
                                            <div
                                                className={`w-3 h-3 rounded-full mr-2 ${
                                                    position.includes(' w ')
                                                        ? 'bg-white'
                                                        : 'bg-black'
                                                }`}
                                            ></div>
                                            <span className="text-gray-300">
                                                {position.includes(' w ')
                                                    ? 'Muove il Bianco'
                                                    : 'Muove il Nero'}
                                            </span>
                                        </div>

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
                                )}

                                {activeTab === 'analysis' && (
                                    <div className="bg-gray-900 rounded-md p-2">
                                        <button
                                            onClick={toggleStockfish}
                                            className={`flex items-center justify-between w-full p-2 rounded-md mb-2 ${
                                                stockfishEnabled
                                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                                    : 'bg-gray-700 hover:bg-gray-600'
                                            } text-white transition-colors`}
                                        >
                                            <span className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2"
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
                                                Analisi Engine (beta)
                                            </span>
                                            <div
                                                className={`w-10 h-5 p-1 rounded-full ${
                                                    stockfishEnabled
                                                        ? 'bg-indigo-300'
                                                        : 'bg-gray-600'
                                                }`}
                                            >
                                                <div
                                                    className={`w-3 h-3 rounded-full transition-transform ${
                                                        stockfishEnabled
                                                            ? 'bg-white transform translate-x-5'
                                                            : 'bg-gray-400'
                                                    }`}
                                                />
                                            </div>
                                        </button>

                                        {stockfishEnabled && (
                                            <StockfishComponent
                                                fen={position}
                                                onEvaluationChange={setCurrentEvaluation}
                                            />
                                        )}
                                    </div>
                                )}

                                {activeTab === 'explorer' && (
                                    <div className="bg-gray-900 rounded-md p-2">
                                        <OpeningExplorer
                                            fen={position}
                                            onMoveSelect={handleOpeningMoveSelect}
                                        />
                                    </div>
                                )}

                                {activeTab === 'notes' && (
                                    <div className="bg-gray-900 rounded-md p-2">
                                        <h3 className="text-sm font-medium text-gray-300 mb-2">
                                            Note sulla posizione
                                        </h3>
                                        <textarea
                                            value={currentNote}
                                            onChange={handleNoteChange}
                                            onKeyDown={handleNoteKeyDown}
                                            onBlur={saveNote}
                                            className="w-full bg-gray-800 text-white text-sm p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            rows={4}
                                            placeholder="Inserisci note sulla posizione... (Premi Invio per salvare)"
                                            onClick={(e) => e.stopPropagation()}
                                        />

                                        <div className="mt-2">
                                            <h4 className="text-xs font-medium text-gray-400 mb-1">
                                                Posizione FEN
                                            </h4>
                                            <div className="bg-gray-800 p-2 rounded-md text-xs text-gray-400 overflow-x-auto break-all">
                                                {position}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* FINE CONTENUTO MOBILE-ONLY */}
                    </div>

                    {/* Pannello laterale desktop */}
                    <div className="hidden md:block md:w-1/3 border-l border-gray-700 bg-gray-800 p-4 overflow-y-auto">
                        <div className="mb-2">
                            <div className="flex items-center">
                                <div
                                    className={`w-3 h-3 rounded-full mr-2 ${
                                        position.includes(' w ') ? 'bg-white' : 'bg-black'
                                    }`}
                                ></div>
                                <span className="text-gray-300">
                                    {position.includes(' w ') ? 'Muove il Bianco' : 'Muove il Nero'}
                                </span>
                            </div>
                        </div>

                        {/* Desktop content remains unchanged */}
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

                        <div className="mt-4">
                            <button
                                onClick={toggleStockfish}
                                className={`flex items-center justify-between w-full p-2 rounded-md ${
                                    stockfishEnabled
                                        ? 'bg-indigo-600 hover:bg-indigo-700'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                } text-white transition-colors`}
                            >
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
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
                                    Analisi Engine (beta)
                                </span>
                                <div
                                    className={`w-10 h-5 p-1 rounded-full ${
                                        stockfishEnabled ? 'bg-indigo-300' : 'bg-gray-600'
                                    }`}
                                >
                                    <div
                                        className={`w-3 h-3 rounded-full transition-transform ${
                                            stockfishEnabled
                                                ? 'bg-white transform translate-x-5'
                                                : 'bg-gray-400'
                                        }`}
                                    />
                                </div>
                            </button>

                            {stockfishEnabled && (
                                <StockfishComponent
                                    fen={position}
                                    onEvaluationChange={setCurrentEvaluation}
                                />
                            )}
                        </div>

                        <OpeningExplorer fen={position} onMoveSelect={handleOpeningMoveSelect} />

                        <div className="mt-5 bg-gray-700 rounded-md p-3">
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

                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-1">
                                Posizione FEN
                            </h4>
                            <div className="bg-gray-900 p-2 rounded-md text-xs text-gray-400 overflow-x-auto break-all">
                                {position}
                            </div>
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
