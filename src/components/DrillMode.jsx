import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import PropTypes from 'prop-types';

const hardcodedPGN =
    '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. f3 g6 6. c4 Bg7 7. Be3 O-O 8. Qd2 Nc6 9. Nc3';
    
// Funzione che parsifica la PGN e restituisce un array di mosse SAN.
const parsePGN = (pgn) => {
    const tokens = pgn.split(/\s+/);
    return tokens.filter((token) => !/^\d+\.$/.test(token));
};

const DrillMode = ({ onClose }) => {
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
    const currentMoveIndexRef = useRef(0);
    const gameRef = useRef(new Chess());
    const [currentLine, setCurrentLine] = useState('');

    // Funzione per inizializzare (o re-inizializzare) il drill
    const initializeDrill = (useSameLine = false) => {
        // Determina quale linea usare
        let chosenPGN;

        if (useSameLine && currentLine) {
            // Se vogliamo riutilizzare la stessa linea e ce n'è una corrente
            chosenPGN = currentLine;
        } else {
            // Seleziona una nuova linea
            const storedData = JSON.parse(localStorage.getItem('canvasData'));
            if (storedData && storedData.fullLines && storedData.fullLines.length > 0) {
                console.log('Linee complete salvate:', storedData.fullLines);
                const lines = storedData.fullLines;
                chosenPGN = lines[Math.floor(Math.random() * lines.length)];
            } else {
                chosenPGN = hardcodedPGN;
            }

            // Salva la nuova linea corrente
            setCurrentLine(chosenPGN);
        }

        // Continua con il reset del gioco come prima
        const movesArr = parsePGN(chosenPGN);
        setActiveMoves(movesArr);
        currentMoveIndexRef.current = 0;
        gameRef.current.reset();
        setPosition(gameRef.current.fen());
        setMoveHistory([]);
        setGameOver(false);
        setMessage('');
        setErrorMessage('');

        // Se l'utente gioca nero, il computer muove per primo
        if (playerColor === 'b' && movesArr.length > 0) {
            const compMove = movesArr[currentMoveIndexRef.current];
            const result = gameRef.current.move(compMove);
            if (result) {
                setPosition(gameRef.current.fen());
                setMoveHistory((prev) => [...prev, result]);
                currentMoveIndexRef.current++;
            } else {
                console.error('Errore nel far eseguire la mossa al computer:', compMove);
            }
        }
    };
    // Inizializza il drill quando il colore viene selezionato
    useEffect(() => {
        if (!playerColor) return;
        initializeDrill(false); // Sempre una nuova linea all'inizio
    }, [playerColor]);

    const handleRestart = () => {
        if (!playerColor) return;
        initializeDrill(true); // Usa la stessa linea
    };

    const handleNextLine = () => {
        if (!playerColor) return;
        initializeDrill(false); // Seleziona una nuova linea
    };

    // Gestione della mossa dell'utente
    const handlePieceDrop = (sourceSquare, targetSquare) => {
        if (gameOver || gameRef.current.turn() !== playerColor) return false;
        try {
            const moveObj = { from: sourceSquare, to: targetSquare, promotion: 'q' };
            const tempGame = new Chess(gameRef.current.fen());
            const userMove = tempGame.move(moveObj);
            if (!userMove) return false;

            const expectedMove = activeMoves[currentMoveIndexRef.current];
            if (userMove.san !== expectedMove) {
                setErrorMessage(`Mossa errata! Hai giocato ${userMove.san} ma si attendeva ${expectedMove}.`);
                setTimeout(() => setErrorMessage(''), 1500);
                return false;
            }

            const result = gameRef.current.move(moveObj);
            setPosition(gameRef.current.fen());
            setMoveHistory((prev) => [...prev, result]);
            currentMoveIndexRef.current++;

            // Se il turno è del computer, esegui la mossa successiva
            if (
                !gameRef.current.isGameOver() &&
                gameRef.current.turn() !== playerColor &&
                currentMoveIndexRef.current < activeMoves.length
            ) {
                setTimeout(() => {
                    const compExpected = activeMoves[currentMoveIndexRef.current];
                    const compResult = gameRef.current.move(compExpected);
                    if (compResult) {
                        setPosition(gameRef.current.fen());
                        setMoveHistory((prev) => [...prev, compResult]);
                        currentMoveIndexRef.current++;
                        if (currentMoveIndexRef.current === activeMoves.length) {
                            setGameOver(true);
                            setMessage('Linea completata!');
                        }
                    } else {
                        setErrorMessage(`Errore nella mossa del computer: ${compExpected}`);
                        setTimeout(() => setErrorMessage(''), 3000);
                    }
                }, 500);
            } else {
                if (currentMoveIndexRef.current === activeMoves.length) {
                    setGameOver(true);
                    setMessage('Linea completata!');
                }
            }
            return true;
        } catch (error) {
            console.error("Errore durante l'esecuzione della mossa:", error);
            return false;
        }
    };

    // Permette di trascinare solo i pezzi del colore del giocatore
    const isDraggablePiece = ({ piece }) => {
        if (gameOver) return false;
        return piece.charAt(0) === playerColor;
    };

    // Schermata di scelta del colore
    if (showColorSelection) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
                <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-5xl w-full mx-4">
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-xl font-semibold text-white">Allenamento (Drill)</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={onClose}
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
                    <div className="flex flex-col items-center p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">
                            Scegli con quale colore vuoi giocare
                        </h2>
                        <div className="flex justify-center space-x-6 mb-8">
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

    // Render principale con UI abbellita
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-5xl w-full mx-4">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">Allenamento (Drill)</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={onClose}
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
                    <div className="md:w-2/3 p-4">
                        <div className="aspect-square w-full max-w-lg mx-auto relative">
                            {errorMessage && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10 rounded">
                                    <div className="text-white bg-red-800 px-4 py-2 rounded shadow-lg">
                                        {errorMessage}
                                    </div>
                                </div>
                            )}
                            <Chessboard
                                position={position}
                                boardWidth={530}
                                areArrowsAllowed={false}
                                customDarkSquareStyle={{ backgroundColor: '#4b7399' }}
                                customLightSquareStyle={{ backgroundColor: '#eae9d2' }}
                                onPieceDrop={handlePieceDrop}
                                boardOrientation={playerColor === 'b' ? 'black' : 'white'}
                                isDraggablePiece={isDraggablePiece}
                            />
                        </div>
                        <div className="flex justify-center space-x-4 mt-10">
                            <button
                                onClick={handleRestart}
                                className="w-56 h-15 bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-3 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600"
                            >
                                Ricomincia
                            </button>
                            <button
                                onClick={handleNextLine}
                                className="w-56 h-15 bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-3 rounded-md transition-all text-sm flex items-center justify-center gap-2 border border-gray-600"
                            >
                                Nuova linea
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-700">
                        <h3 className="text-lg font-medium text-white mb-3">
                            Dettagli allenamento
                        </h3>
                        {message && (
                            <div
                                className={`mb-4 p-3 rounded ${
                                    gameOver ? 'bg-green-600/30' : 'bg-blue-600/30'
                                }`}
                            >
                                <p className="text-white">{message}</p>
                            </div>
                        )}
                        <div className="bg-gray-900 p-3 rounded mb-4">
                            <h4 className="text-md font-medium text-gray-300 mb-2">
                                Stai giocando con:
                            </h4>
                            <div className="flex items-center">
                                <div
                                    className={`w-4 h-4 rounded-full mr-2 ${
                                        playerColor === 'w' ? 'bg-white' : 'bg-black'
                                    }`}
                                ></div>
                                <span className="text-gray-300">
                                    {playerColor === 'w' ? 'Bianco' : 'Nero'}
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-900 p-3 rounded mb-4">
                            <h4 className="text-md font-medium text-gray-300 mb-2">
                                Mosse giocate:
                            </h4>
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
                        
                        <div className="mt-4 bg-gray-900/50 p-3 rounded">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Regole:</h4>
                            <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                                <li>Puoi eseguire solo mosse che corrispondono alla linea drill</li>
                                <li>Il computer risponderà in automatico</li>
                                <li>L'allenamento termina alla fine della linea</li>
                            </ul>
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