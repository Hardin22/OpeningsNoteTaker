import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import PropTypes from 'prop-types';
import customPieces from '../utils/customPieces';
const hardcodedPGN =
    '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. f3 g6 6. c4 Bg7 7. Be3 O-O 8. Qd2 Nc6 9. Nc3';

const parsePGN = (pgn) => {
    const tokens = pgn.split(/\s+/);
    return tokens.filter((token) => !/^\d+\.$/.test(token));
};

const DrillMode = ({ onClose }) => {
    // Stati esistenti
    const [playerColor, setPlayerColor] = useState(null);
    const [showColorSelection, setShowColorSelection] = useState(true);
    const [position, setPosition] = useState(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    const [moveHistory, setMoveHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [activeMoves, setActiveMoves] = useState([]);
    const [showMobilePanel, setShowMobilePanel] = useState(false);
    const currentMoveIndexRef = useRef(0);
    const gameRef = useRef(new Chess());

    // Stati per gestire la dimensione della scacchiera
    const boardContainerRef = useRef(null);
    const [boardSize, setBoardSize] = useState(400);
    const isResizing = useRef(false);
    const startX = useRef(0);
    const startSize = useRef(0);
    const containerRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(0);

    // Funzioni per gestire lo zoom
    const zoomIn = () => {
        setZoomLevel((prev) => {
            const newLevel = prev + 1;
            updateBoardSize(newLevel);
            return newLevel;
        });
    };

    const zoomOut = () => {
        setZoomLevel((prev) => {
            const newLevel = Math.max(prev - 1, -2);
            updateBoardSize(newLevel);
            return newLevel;
        });
    };

    // Funzione per dimensionare la scacchiera correttamente
    const updateBoardSize = useCallback((zoom = 0) => {
        const isMobile = window.innerWidth < 768;
        let baseSize;

        if (isMobile) {
            // Per mobile, manteniamo il dimensionamento attuale
            baseSize = Math.min(window.innerWidth * 0.9, 380);
        } else {
            // Per desktop - NUOVA LOGICA basata anche sull'altezza
            const containerWidth = containerRef.current?.offsetWidth || window.innerWidth * 0.5;
            const heightBasedSize = window.innerHeight * 0.65; // 65% dell'altezza dello schermo
            baseSize = Math.min(containerWidth * 0.7, heightBasedSize, 500);
        }

        // Applica lo zoom (ogni livello = 20px)
        const zoomAdjustment = zoom * 20;
        setBoardSize(
            Math.max(
                200,
                Math.min(
                    baseSize + zoomAdjustment,
                    isMobile ? window.innerWidth * 0.9 : window.innerHeight * 0.75
                )
            )
        );
    }, []);

    // Inizializza e aggiorna la dimensione della scacchiera al resize
    useEffect(() => {
        updateBoardSize(zoomLevel);
        const handleResize = () => updateBoardSize(zoomLevel);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateBoardSize, zoomLevel]);

    // Gestione resize manuale della scacchiera (solo desktop)
    const handleMouseDown = useCallback(
        (e) => {
            if (window.innerWidth < 768) return;
            isResizing.current = true;
            startX.current = e.clientX;
            startSize.current = boardSize;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        },
        [boardSize]
    );

    // MODIFICA: Resize manuale usando altezza come vincolo
    const handleMouseMove = useCallback((e) => {
        if (!isResizing.current) return;
        const delta = e.clientX - startX.current;

        // Vincolo basato sull'altezza dello schermo invece che larghezza
        const heightBasedLimit = window.innerHeight * 0.75;
        const newSize = Math.min(
            Math.max(startSize.current + delta, 300),
            heightBasedLimit,
            window.innerWidth * 0.8
        );

        setBoardSize(newSize);

        // Adatta il contenitore padre per evitare overflow
        if (containerRef.current) {
            containerRef.current.style.minWidth = `${newSize + 300}px`;
        }

        // Adatta anche il contenitore della scacchiera
        if (boardContainerRef.current) {
            boardContainerRef.current.style.minWidth = `${newSize + 80}px`;
        }
    }, []);

    const handleMouseUp = useCallback(() => {
        isResizing.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);
    const lastUsedPgnRef = useRef(null);
    const initializeDrill = useCallback(
        (useSameLine = false) => {
            const storedData = JSON.parse(localStorage.getItem('canvasData'));
            let chosenPGN;

            if (useSameLine && lastUsedPgnRef.current) {
                // Se vogliamo rigiocare la stessa linea
                chosenPGN = lastUsedPgnRef.current;
            } else {
                // Altrimenti prendi una linea a caso (logica esistente)
                chosenPGN =
                    storedData?.fullLines?.length > 0
                        ? storedData.fullLines[
                              Math.floor(Math.random() * storedData.fullLines.length)
                          ]
                        : hardcodedPGN;
                lastUsedPgnRef.current = chosenPGN;
            }

            const movesArr = parsePGN(chosenPGN);
            currentMoveIndexRef.current = 0;
            gameRef.current.reset();
            setActiveMoves(movesArr);
            setPosition(gameRef.current.fen());
            setMoveHistory([]);
            setGameOver(false);
            setMessage('');
            setErrorMessage('');

            if (playerColor === 'b' && movesArr.length > 0) {
                const compMove = movesArr[currentMoveIndexRef.current];
                const result = gameRef.current.move(compMove);
                if (result) {
                    setPosition(gameRef.current.fen());
                    setMoveHistory((prev) => [...prev, result]);
                    currentMoveIndexRef.current++;
                }
            }
        },
        [playerColor]
    );

    useEffect(() => {
        if (playerColor) initializeDrill(false);
    }, [playerColor, initializeDrill]);

    const handleRestart = () => playerColor && initializeDrill(true);
    const handleNextLine = () => playerColor && initializeDrill(false);
    const toggleMobilePanel = () => setShowMobilePanel(!showMobilePanel);

    // MODIFICA: Migliorato per mostrare il messaggio di completamento
    const handlePieceDrop = (sourceSquare, targetSquare) => {
        if (gameOver || gameRef.current.turn() !== playerColor) return false;
        try {
            const moveObj = { from: sourceSquare, to: targetSquare, promotion: 'q' };
            const tempGame = new Chess(gameRef.current.fen());
            const userMove = tempGame.move(moveObj);
            if (!userMove) return false;

            const expectedMove = activeMoves[currentMoveIndexRef.current];
            if (userMove.san !== expectedMove) {
                setErrorMessage(`Mossa errata! Atteso: ${expectedMove}`);
                setTimeout(() => setErrorMessage(''), 1000);
                return false;
            }

            const result = gameRef.current.move(moveObj);
            setPosition(gameRef.current.fen());
            setMoveHistory((prev) => [...prev, result]);
            currentMoveIndexRef.current++;

            // Verifica se la linea è completata dopo la mossa dell'utente
            if (currentMoveIndexRef.current === activeMoves.length) {
                setGameOver(true);
                setMessage('Linea completata con successo!');
                return true;
            }

            if (!gameRef.current.isGameOver() && gameRef.current.turn() !== playerColor) {
                setTimeout(() => {
                    const compExpected = activeMoves[currentMoveIndexRef.current];
                    const compResult = gameRef.current.move(compExpected);
                    if (compResult) {
                        setPosition(gameRef.current.fen());
                        setMoveHistory((prev) => [...prev, compResult]);
                        currentMoveIndexRef.current++;

                        // Verifica se la linea è completata dopo la mossa del computer
                        if (currentMoveIndexRef.current === activeMoves.length) {
                            setGameOver(true);
                            setMessage('Linea completata con successo!');
                        }
                    }
                }, 500);
            }
            return true;
        } catch (error) {
            console.error("Errore durante l'esecuzione della mossa:", error);
            return false;
        }
    };

    const isDraggablePiece = ({ piece }) => !gameOver && piece.charAt(0) === playerColor;

    if (showColorSelection) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
                <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-5xl w-full mx-4">
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-xl font-semibold text-white">Allenamento (Drill)</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg
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
                    <div className="flex flex-col items-center p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">
                            Scegli colore
                        </h2>
                        <div className="flex gap-6 mb-8">
                            <button
                                onClick={() => {
                                    setPlayerColor('w');
                                    setShowColorSelection(false);
                                }}
                                className="w-32 h-32 bg-white text-gray-800 hover:bg-gray-200 rounded-lg shadow-lg transition flex flex-col items-center justify-center"
                            >
                                <span className="text-6xl mb-2">♔</span>
                                <span className="font-medium">Bianco</span>
                            </button>
                            <button
                                onClick={() => {
                                    setPlayerColor('b');
                                    setShowColorSelection(false);
                                }}
                                className="w-32 h-32 bg-gray-900 text-white hover:bg-gray-700 rounded-lg shadow-lg transition flex flex-col items-center justify-center"
                            >
                                <span className="text-6xl mb-2">♚</span>
                                <span className="font-medium">Nero</span>
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded transition"
                        >
                            Annulla
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
            <div
                ref={containerRef}
                className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col min-w-[300px]"
                style={{
                    // Margini laterali ridotti su mobile
                    maxWidth: window.innerWidth < 768 ? '99%' : '96%',
                }}
            >
                <div className="flex justify-between items-center p-3 bg-gray-900 border-b border-gray-700">
                    <h2 className="text-lg font-bold text-white">Allenamento (Drill)</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleMobilePanel}
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
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
                        <button
                            onClick={onClose}
                            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
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

                <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
                    {/* Contenitore scacchiera - ora occupa tutta la larghezza su mobile */}
                    <div
                        ref={boardContainerRef}
                        className="md:w-2/3 p-2 md:p-4 flex flex-col items-center overflow-y-auto "
                        style={{
                            minWidth: window.innerWidth >= 768 ? `${boardSize + 100}px` : 'auto',
                        }}
                    >
                        {/* MODIFICA: Messaggio di completamento più elegante */}
                        {message && (
                            <div className="mb-3 w-full md:hidden">
                                <div
                                    className={`p-3 rounded-md text-center font-medium shadow-lg ${
                                        gameOver
                                            ? 'bg-green-700/80 text-white border border-green-500'
                                            : 'bg-blue-600/30 text-white'
                                    }`}
                                >
                                    {gameOver && (
                                        <span className="inline-block mr-2">
                                            <svg
                                                className="w-5 h-5 inline"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                    {message}
                                </div>
                            </div>
                        )}

                        {/* Scacchiera ridimensionata correttamente */}
                        <div
                            className="relative"
                            style={{
                                width: `${boardSize}px`,
                                height: `${boardSize}px`,
                                maxWidth: '95vw',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                userSelect: 'none',
                                WebkitUserSelect: 'none', // Garantisce che non esca mai dallo schermo
                            }}
                        >
                            <div
                                className="absolute -right-2 top-0 bottom-0 w-4 cursor-col-resize z-20 hover:bg-gray-600 transition-colors"
                                onMouseDown={handleMouseDown}
                                style={{
                                    display: window.innerWidth >= 768 ? 'block' : 'none',
                                    right: `${-boardSize / 100}px`,
                                }}
                            />
                            {errorMessage && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10 rounded">
                                    <div className="text-white bg-red-800 px-4 py-2 rounded shadow-lg">
                                        {errorMessage}
                                    </div>
                                </div>
                            )}
                            <Chessboard
                                position={position}
                                boardWidth={boardSize}
                                areArrowsAllowed={true}
                                customDarkSquareStyle={{ backgroundColor: '#ad7456' }}
                                customLightSquareStyle={{ backgroundColor: '#ead8c0' }}
                                onPieceDrop={handlePieceDrop}
                                boardOrientation={playerColor === 'b' ? 'black' : 'white'}
                                isDraggablePiece={isDraggablePiece}
                                customPieces={customPieces}
                                arePremovesAllowed={true}
                            />
                        </div>

                        {/* Pulsanti principali - mantengono la stessa larghezza della scacchiera */}
                        <div
                            className="flex justify-center space-x-3 mt-4 w-full"
                            style={{ maxWidth: `${boardSize}px` }}
                        >
                            <button
                                onClick={handleRestart}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-3 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600"
                            >
                                Ricomincia
                            </button>
                            <button
                                onClick={handleNextLine}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-3 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600"
                            >
                                Nuova linea
                            </button>
                        </div>

                        {/* Pannello mobile - ora appare DOPO la scacchiera e solo quando togglato */}
                        {showMobilePanel && (
                            <div className="md:hidden mt-6 w-full border-t border-gray-700 pt-4">
                                {/* Informazioni sul giocatore */}
                                <div className="bg-gray-900 p-3 rounded mb-4">
                                    <h4 className="text-md font-medium text-gray-300 mb-2">
                                        Giocatore
                                    </h4>
                                    <div className="flex items-center">
                                        <div
                                            className={`w-4 h-4 rounded-full mr-2 ${
                                                playerColor === 'w' ? 'bg-white' : 'bg-black'
                                            }`}
                                        />
                                        <span className="text-gray-300">
                                            {playerColor === 'w' ? 'Bianco' : 'Nero'}
                                        </span>
                                    </div>
                                </div>

                                {/* Mosse giocate */}
                                <div className="bg-gray-900 p-3 rounded mb-4">
                                    <h4 className="text-md font-medium text-gray-300 mb-2">
                                        Mosse giocate
                                    </h4>
                                    <div className="max-h-32 overflow-y-auto">
                                        {moveHistory.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-2">
                                                {moveHistory.map((move, index) => (
                                                    <div
                                                        key={index}
                                                        className={`p-2 text-sm rounded ${
                                                            (playerColor === 'w' &&
                                                                index % 2 === 0) ||
                                                            (playerColor === 'b' && index % 2 === 1)
                                                                ? 'bg-indigo-600/30 text-white'
                                                                : 'bg-gray-800 text-gray-300'
                                                        }`}
                                                    >
                                                        {index % 2 === 0
                                                            ? `${Math.floor(index / 2) + 1}.`
                                                            : ''}{' '}
                                                        {move.san}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic text-center py-2">
                                                Nessuna mossa giocata
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Regole */}
                                <div className="bg-gray-900/50 p-3 rounded">
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                                        Regole
                                    </h4>
                                    <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                                        <li>Segui la linea di mosse prestabilita</li>
                                        <li>Il computer risponde automaticamente</li>
                                        <li>Completa tutta la sequenza per vincere</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pannello desktop - visibile solo su schermi grandi */}
                    <div
                        className="hidden md:block md:w-1/3 bg-gray-800 p-4 overflow-y-auto"
                        style={{userSelect: 'none', WebkitUserSelect: 'none' }}
                    >
                        <h3 className="text-lg font-medium text-white mb-3">
                            Dettagli allenamento
                        </h3>
                        {/* MODIFICA: Messaggio di completamento più elegante nel pannello desktop */}
                        {message && (
                            <div
                                className={`mb-4 p-3 rounded-md shadow-lg ${
                                    gameOver
                                        ? 'bg-green-700/80 text-white border border-green-500'
                                        : 'bg-blue-600/30 text-white'
                                }`}
                            >
                                {gameOver && (
                                    <span className="inline-block mr-2">
                                        <svg
                                            className="w-5 h-5 inline"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                )}
                                <span className="font-medium">{message}</span>
                            </div>
                        )}
                        <div className="bg-gray-900 p-3 rounded mb-4">
                            <h4 className="text-md font-medium text-gray-300 mb-2">Giocatore</h4>
                            <div className="flex items-center">
                                <div
                                    className={`w-4 h-4 rounded-full mr-2 ${
                                        playerColor === 'w' ? 'bg-white' : 'bg-black'
                                    }`}
                                />
                                <span className="text-gray-300">
                                    {playerColor === 'w' ? 'Bianco' : 'Nero'}
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-900 p-3 rounded mb-4">
                            <h4 className="text-md font-medium text-gray-300 mb-2">Mosse</h4>
                            <div className="h-48 overflow-y-auto">
                                {moveHistory.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-2">
                                        {moveHistory.map((move, index) => (
                                            <div
                                                key={index}
                                                className={`p-2 text-sm rounded ${
                                                    (playerColor === 'w' && index % 2 === 0) ||
                                                    (playerColor === 'b' && index % 2 === 1)
                                                        ? 'bg-indigo-600/30 text-white'
                                                        : 'bg-gray-800 text-gray-300'
                                                }`}
                                            >
                                                {index % 2 === 0
                                                    ? `${Math.floor(index / 2) + 1}.`
                                                    : ''}{' '}
                                                {move.san}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">Nessuna mossa giocata</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-900/50 p-3 rounded mb-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Regole</h4>
                            <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                                <li>Segui la linea di mosse prestabilita</li>
                                <li>Il computer risponde automaticamente</li>
                                <li>Completa tutta la sequenza per vincere</li>
                            </ul>
                        </div>

                        {/* Controlli zoom - solo desktop */}
                        <div className="relative border-t border-gray-700 pt-4">
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={zoomOut}
                                    className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300"
                                    title="Riduci dimensione"
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
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={zoomIn}
                                    className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300"
                                    title="Aumenta dimensione"
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
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DrillMode.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default DrillMode;
