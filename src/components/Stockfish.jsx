import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { uciToSan } from '../utils/notation';
import { Chess } from 'chess.js';

export function useStockfish() {
    const [isReady, setIsReady] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [isMate, setIsMate] = useState(false);
    const [mateIn, setMateIn] = useState(null);
    const [bestMove, setBestMove] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [depth, setDepth] = useState(0);
    const [lines, setLines] = useState([]);
    const [showMultiPV, setShowMultiPV] = useState(false);
    const engineWorker = useRef(null);
    const processMessageWorker = useRef(null);
    const currentFen = useRef(null);
    const currentTurn = useRef('w');
    const updateTimeoutRef = useRef(null);
    const pendingUpdatesRef = useRef(null);

    // Inizializza il processMessage worker
    useEffect(() => {
        // Crea un blob con il codice del worker
        const workerCode = `
            self.onmessage = function(e) {
                const { action, data } = e.data;
                
                if (action === 'convertSan') {
                    const { moves, fen } = data;
                    if (!moves || !moves.length) {
                        self.postMessage({ action: 'sanConverted', data: [] });
                        return;
                    }
                    
                    try {
                        // Importa dinamicamente chess.js
                        importScripts('/chess.js/chess.min.js');
                        const chess = new Chess(fen);
                        
                        const sanMoves = moves.map(move => {
                            try {
                                const from = move.substring(0, 2);
                                const to = move.substring(2, 4);
                                const promotion = move.length > 4 ? move.substring(4) : undefined;
                                
                                const result = chess.move({ from, to, promotion });
                                return result ? result.san : move;
                            } catch (e) {
                                return move;
                            }
                        });
                        
                        self.postMessage({ 
                            action: 'sanConverted', 
                            data: sanMoves,
                            originalMoves: moves,
                            lineIdx: data.lineIdx,
                            eval: data.eval,
                            isMate: data.isMate,
                            mateIn: data.mateIn
                        });
                    } catch (e) {
                        self.postMessage({ 
                            action: 'sanConverted', 
                            data: moves,
                            originalMoves: moves,
                            lineIdx: data.lineIdx,
                            eval: data.eval,
                            isMate: data.isMate,
                            mateIn: data.mateIn
                        });
                    }
                } else if (action === 'processMessage') {
                    const { message, fen, currentTurn } = data;
                    
                    // Analizza il messaggio di Stockfish
                    if (message.startsWith('info') && (message.includes('score cp') || message.includes('score mate'))) {
                        const parts = message.split(/\\s+(?=multipv|pv|score|depth)/);
                        let pvSection = '';
                        let depthValue = 0;
                        let evalValue = 0;
                        let isMateLine = false;
                        let mateValue = 0;
                        let multipvValue = 1;
                        
                        for (let i = 0; i < parts.length; i++) {
                            const part = parts[i];
                            if (part.startsWith('multipv')) {
                                multipvValue = parseInt(part.split(' ')[1], 10) || 1;
                            } else if (part.startsWith('depth')) {
                                depthValue = parseInt(part.split(' ')[1], 10) || 0;
                            } else if (part.startsWith('score cp')) {
                                const scoreMatch = part.match(/(-?\\d+)/);
                                evalValue = scoreMatch ? parseInt(scoreMatch[1], 10) / 100 : 0;
                                isMateLine = false;
                            } else if (part.startsWith('score mate')) {
                                const mateMatch = part.match(/mate\\s+(-?\\d+)/);
                                if (mateMatch) {
                                    mateValue = parseInt(mateMatch[1], 10);
                                    isMateLine = true;
                                    evalValue = mateValue > 0 ? 99 : -99;
                                }
                            } else if (part.startsWith('pv')) {
                                pvSection = part.replace('pv ', '').trim();
                                const moveMatches = pvSection.match(/([a-h][1-8][a-h][1-8][qrbnk]?)/gi) || [];
                                
                                self.postMessage({
                                    action: 'lineUpdated',
                                    data: {
                                        lineIdx: multipvValue - 1,
                                        eval: evalValue,
                                        moves: moveMatches,
                                        depth: depthValue,
                                        isMate: isMateLine,
                                        mateIn: isMateLine ? mateValue : null,
                                        isMainLine: multipvValue === 1
                                    }
                                });
                            }
                        }
                    } else if (message.startsWith('bestmove')) {
                        const bestMoveMatch = message.match(/bestmove\\s+(\\S+)/);
                        if (bestMoveMatch) {
                            const move = bestMoveMatch[1];
                            if (move && move.length >= 4) {
                                // Importa dinamicamente chess.js
                                importScripts('/chess.js/chess.min.js');
                                const chess = new Chess(fen);
                                
                                try {
                                    const from = move.substring(0, 2);
                                    const to = move.substring(2, 4);
                                    const promotion = move.length > 4 ? move.substring(4) : undefined;
                                    
                                    const result = chess.move({ from, to, promotion });
                                    self.postMessage({ 
                                        action: 'bestMove', 
                                        data: result ? result.san : move
                                    });
                                } catch (e) {
                                    self.postMessage({ action: 'bestMove', data: move });
                                }
                            }
                        }
                        
                        self.postMessage({ action: 'analysisComplete' });
                    }
                }
            };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);

        // Crea il worker
        processMessageWorker.current = new Worker(workerUrl);

        // Gestisci i messaggi dal worker
        processMessageWorker.current.onmessage = (event) => {
            const { action, data } = event.data;

            if (action === 'sanConverted') {
                // Aggiorna le linee con le mosse SAN convertite
                setLines((prevLines) => {
                    const newLines = [...prevLines];
                    if (data.lineIdx < newLines.length) {
                        newLines[data.lineIdx] = {
                            ...newLines[data.lineIdx],
                            sanMoves: data.data,
                        };
                    }
                    return newLines;
                });
            } else if (action === 'lineUpdated') {
                // Memorizza l'aggiornamento in attesa invece di applicarlo immediatamente
                if (!pendingUpdatesRef.current) {
                    pendingUpdatesRef.current = {
                        lines: {},
                        depth: null,
                        evaluation: null,
                        isMate: null,
                        mateIn: null,
                        bestMove: null,
                    };
                }

                // Memorizza o aggiorna la linea
                pendingUpdatesRef.current.lines[data.lineIdx] = data;

                // Se è la linea principale, aggiorna anche le valutazioni principali
                if (data.isMainLine) {
                    pendingUpdatesRef.current.depth = data.depth;
                    pendingUpdatesRef.current.evaluation = data.eval;
                    pendingUpdatesRef.current.isMate = data.isMate;
                    pendingUpdatesRef.current.mateIn = data.mateIn;
                }

                // Pianifica l'aggiornamento se non è già pianificato
                if (!updateTimeoutRef.current) {
                    updateTimeoutRef.current = setTimeout(() => {
                        // Applica tutti gli aggiornamenti in una sola volta
                        if (pendingUpdatesRef.current) {
                            // Aggiorna la profondità e la valutazione principale
                            if (pendingUpdatesRef.current.depth !== null) {
                                setDepth(pendingUpdatesRef.current.depth);
                            }

                            if (pendingUpdatesRef.current.evaluation !== null) {
                                setEvaluation(pendingUpdatesRef.current.evaluation);
                            }

                            setIsMate(!!pendingUpdatesRef.current.isMate);
                            setMateIn(pendingUpdatesRef.current.mateIn);

                            // Aggiorna le linee
                            setLines((prevLines) => {
                                const newLines = [...prevLines];

                                // Controlla ogni linea aggiornata
                                Object.values(pendingUpdatesRef.current.lines).forEach(
                                    (lineData) => {
                                        const {
                                            lineIdx,
                                            eval: evalValue,
                                            moves,
                                            isMate,
                                            mateIn,
                                        } = lineData;

                                        // Assicurati che ci sia spazio per questa linea
                                        while (newLines.length <= lineIdx) {
                                            newLines.push({
                                                eval: 0,
                                                moves: [],
                                                sanMoves: [],
                                                isMate: false,
                                                mateIn: null,
                                            });
                                        }

                                        // Aggiorna la linea
                                        newLines[lineIdx] = {
                                            ...newLines[lineIdx],
                                            eval: evalValue,
                                            moves: moves,
                                            isMate: isMate,
                                            mateIn: mateIn,
                                        };

                                        // Converti le mosse in SAN in un secondo momento
                                        processMessageWorker.current.postMessage({
                                            action: 'convertSan',
                                            data: {
                                                moves: moves,
                                                fen: currentFen.current,
                                                lineIdx: lineIdx,
                                                eval: evalValue,
                                                isMate: isMate,
                                                mateIn: mateIn,
                                            },
                                        });
                                    }
                                );

                                return newLines;
                            });

                            // Resetta gli aggiornamenti in attesa
                            pendingUpdatesRef.current = null;
                        }

                        updateTimeoutRef.current = null;
                    }, 150); // Aggiorna massimo ogni 150ms
                }
            } else if (action === 'bestMove') {
                setBestMove(data);
            } else if (action === 'analysisComplete') {
                setIsAnalyzing(false);
            }
        };

        return () => {
            if (processMessageWorker.current) {
                processMessageWorker.current.terminate();
            }
            URL.revokeObjectURL(workerUrl);
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
        };
    }, []);

    // Effect per inizializzare l'engine
    useEffect(() => {
        function wasmThreadsSupported() {
            try {
                const sab = new SharedArrayBuffer(1);
                const sa = new Int8Array(sab);
                sa[0] = 42;
                Atomics.add(sa, 0, 1);
                return sa[0] === 43;
            } catch (e) {
                return false;
            }
        }

        if (wasmThreadsSupported()) {
            engineWorker.current = new Worker('/stockfish/stockfish.wasm.js');

            engineWorker.current.onmessage = (event) => {
                const message = event.data;

                if (message === 'readyok') {
                    setIsReady(true);
                } else {
                    // Delega l'elaborazione del messaggio al worker secondario
                    processMessageWorker.current?.postMessage({
                        action: 'processMessage',
                        data: {
                            message,
                            fen: currentFen.current,
                            currentTurn: currentTurn.current,
                        },
                    });
                }
            };

            // Inizializza l'engine
            engineWorker.current.postMessage('uci');
            engineWorker.current.postMessage('isready');
            engineWorker.current.postMessage('setoption name Threads value 4');
            engineWorker.current.postMessage('setoption name Hash value 128');
            engineWorker.current.postMessage('setoption name Use NNUE value true');
            engineWorker.current.postMessage('setoption name EvalFile value nn-5af11540bbfe.nnue');
            engineWorker.current.postMessage('setoption name MultiPV value 3');

            return () => {
                if (engineWorker.current) {
                    engineWorker.current.terminate();
                }
            };
        } else {
            console.error('WebAssembly threads not supported in this browser');
        }
    }, []);

    // Funzione ottimizzata per estrarre il turno dal FEN
    const extractTurnFromFen = useCallback((fen) => {
        if (!fen) return 'w';
        const parts = fen.split(' ');
        return parts.length > 1 ? parts[1] : 'w';
    }, []);

    // Funzione ottimizzata per analizzare la posizione
    const analyzeFen = useCallback(
        (fen, maxDepth = 20) => {
            if (engineWorker.current && isReady) {
                currentFen.current = fen;
                currentTurn.current = extractTurnFromFen(fen);

                // Raggruppa gli aggiornamenti di stato per ridurre i re-render
                setIsAnalyzing(true);
                setDepth(0);
                setLines([]);
                setIsMate(false);
                setMateIn(null);
                setBestMove(null);

                // Resetta gli aggiornamenti in attesa
                pendingUpdatesRef.current = null;
                if (updateTimeoutRef.current) {
                    clearTimeout(updateTimeoutRef.current);
                    updateTimeoutRef.current = null;
                }

                // Invia comandi all'engine
                engineWorker.current.postMessage('ucinewgame');
                engineWorker.current.postMessage(`position fen ${fen}`);
                engineWorker.current.postMessage(`go depth ${maxDepth}`);
            }
        },
        [isReady, extractTurnFromFen]
    );

    return {
        isReady,
        evaluation,
        isMate,
        mateIn,
        bestMove,
        isAnalyzing,
        analyzeFen,
        depth,
        lines,
        showMultiPV,
        setShowMultiPV,
        currentTurn: currentTurn.current,
    };
}

// Usa memo per evitare render inutili
const StatusIndicator = React.memo(({ isReady, isAnalyzing }) => {
    if (!isReady) {
        return (
            <div className="flex items-center">
                <svg
                    className="animate-spin mr-2 h-4 w-4 text-indigo-400"
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
                Caricamento engine...
            </div>
        );
    } else if (isAnalyzing) {
        return (
            <div className="flex items-center">
                <svg
                    className="animate-pulse mr-2 h-4 w-4 text-indigo-400"
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
                Analisi in corso...
            </div>
        );
    } else {
        return (
            <div className="flex items-center">
                <svg
                    className="mr-2 h-4 w-4 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                Analisi completata
            </div>
        );
    }
});

// Componente memoizzato per la valutazione
const EvaluationDisplay = React.memo(
    ({ evaluation, depth, isMate, mateIn, currentTurn, formatEvaluation, getEvaluationColor }) => {
        const text = formatEvaluation(evaluation, currentTurn, isMate, mateIn);
        const color = getEvaluationColor(evaluation, currentTurn, isMate, mateIn);

        return (
            <div className="w-1/2 pr-2">
                <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-300">
                        Valutazione <span className="text-xs text-gray-400">(depth={depth})</span>
                    </span>
                </div>
                <div className={`text-xl font-mono font-semibold ${color}`}>{text}</div>
            </div>
        );
    }
);

// Componente memoizzato per mostrare le linee
const LineDisplay = React.memo(({ line, index, currentTurn }) => {
    const adjustedEval = currentTurn === 'b' ? -line.eval : line.eval;
    const adjustedMateIn = line.isMate ? (currentTurn === 'b' ? -line.mateIn : line.mateIn) : null;

    const evalColor = line.isMate
        ? adjustedMateIn > 0
            ? 'text-green-400'
            : 'text-red-400'
        : adjustedEval > 0
        ? 'text-green-400'
        : adjustedEval < 0
        ? 'text-red-400'
        : 'text-gray-300';

    const evalText = line.isMate
        ? adjustedMateIn > 0
            ? `#${Math.abs(line.mateIn)}`
            : `-#${Math.abs(line.mateIn)}`
        : adjustedEval > 0
        ? `+${Math.abs(adjustedEval).toFixed(2)}`
        : adjustedEval.toFixed(2);

    return (
        <div
            className={`p-1.5 ${index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-700'} ${
                index !== 0 ? 'border-t border-gray-600' : ''
            }`}
        >
            <div className="flex items-center">
                <span className={`text-sm font-mono font-medium mr-2 flex-shrink-0 ${evalColor}`}>
                    {evalText}
                </span>
                <div
                    className="text-sm text-gray-300 whitespace-nowrap overflow-hidden"
                    style={{
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}
                >
                    {line.sanMoves.map((move, moveIdx) => (
                        <span key={moveIdx} className="mr-1 font-mono">
                            {move}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default function StockfishComponent({ fen }) {
    const {
        isReady,
        evaluation,
        isMate,
        mateIn,
        bestMove,
        isAnalyzing,
        analyzeFen,
        depth,
        lines,
        showMultiPV,
        setShowMultiPV,
        currentTurn,
    } = useStockfish();
    const analyzedFenRef = useRef(null);

    // Trigger dell'analisi quando cambia il FEN
    useEffect(() => {
        if (isReady && analyzedFenRef.current !== fen) {
            analyzedFenRef.current = fen;
            analyzeFen(fen);
        }
    }, [fen, isReady, analyzeFen]);

    // Funzione per formattare la valutazione con POV fisso (memorizzata)
    const formatEvaluation = useCallback((evalValue, turn, isMateVal, mateInVal) => {
        if (isMateVal) {
            const adjustedMate = turn === 'b' ? -mateInVal : mateInVal;
            if (adjustedMate === 0) return 'Matto';

            const prefix = adjustedMate > 0 ? '#' : '-#';
            return `${prefix}${Math.abs(adjustedMate)}`;
        } else {
            // POV fisso dal bianco
            let adjustedEval = turn === 'b' ? -evalValue : evalValue;
            return adjustedEval > 0 ? `+${adjustedEval.toFixed(2)}` : adjustedEval.toFixed(2);
        }
    }, []);

    // Funzione per determinare il colore della valutazione (memorizzata)
    const getEvaluationColor = useCallback((evalValue, turn, isMateVal, mateInVal) => {
        if (isMateVal) {
            const adjustedMate = turn === 'b' ? -mateInVal : mateInVal;
            return adjustedMate > 0 ? 'text-green-400' : 'text-red-400';
        }

        const adjustedEval = turn === 'b' ? -evalValue : evalValue;
        return adjustedEval > 0
            ? 'text-green-400'
            : adjustedEval < 0
            ? 'text-red-400'
            : 'text-gray-300';
    }, []);

    return (
        <div className="mt-2 space-y-3">
            {/* Stato dell'analisi - componente memoizzato */}
            <div className="text-xs text-gray-400 flex items-center">
                <StatusIndicator isReady={isReady} isAnalyzing={isAnalyzing} />
            </div>

            {/* Valutazione e mossa migliore */}
            {(evaluation !== null || bestMove) && (
                <div className="bg-gray-700 rounded-md p-2">
                    <div className="flex flex-row justify-between">
                        {evaluation !== null && (
                            <EvaluationDisplay
                                evaluation={evaluation}
                                depth={depth}
                                isMate={isMate}
                                mateIn={mateIn}
                                currentTurn={currentTurn}
                                formatEvaluation={formatEvaluation}
                                getEvaluationColor={getEvaluationColor}
                            />
                        )}

                        <div className="w-1/2 pl-2 border-l border-gray-600">
                            <div className="flex items-center mb-1">
                                <span className="text-sm font-medium text-gray-300">
                                    Mossa migliore
                                </span>
                            </div>
                            {bestMove && (
                                <div className="text-xl font-mono font-semibold text-white">
                                    {bestMove}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Sezione "Mostra linee" con animazione */}
            <div className="mt-1 overflow-hidden">
                {/* Pulsante "Mostra linee" */}
                <div className="bg-gray-700 rounded-md transition-all duration-300 overflow-hidden">
                    <button
                        onClick={() => setShowMultiPV(!showMultiPV)}
                        className="flex items-center justify-between w-full p-1.5 text-white bg-gray-700"
                    >
                        <span className="flex items-center">
                            <svg
                                className={`w-3 h-3 mr-1 transition-transform duration-300 ${
                                    showMultiPV ? 'transform rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                            <span className="text-xs text-gray-300">Mostra linee</span>
                        </span>
                        <div
                            className={`w-8 h-4 p-0.5 rounded-full ${
                                showMultiPV ? 'bg-gray-500' : 'bg-gray-600'
                            }`}
                        >
                            <div
                                className={`w-3 h-3 rounded-full transition-transform duration-300 ${
                                    showMultiPV ? 'bg-white transform translate-x-4' : 'bg-gray-400'
                                }`}
                            />
                        </div>
                    </button>

                    {/* Contenitore delle linee con animazione */}
                    <div
                        className={`transition-all duration-300 ${
                            showMultiPV ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        {lines.length > 0 && (
                            <div className="border-t border-gray-600">
                                {lines.map((line, index) => (
                                    <LineDisplay
                                        key={index}
                                        line={line}
                                        index={index}
                                        currentTurn={currentTurn}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
