import React, { useState, useEffect } from 'react';

function OpeningExplorer({ fen, onMoveSelect }) {
    const [movesData, setMovesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    // Toggle del pannello database
    const toggleDatabase = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Facciamo la chiamata API solo se il pannello è aperto
        if (!isOpen || !fen) return;

        setLoading(true);

        fetch(
            `https://explorer.lichess.ovh/lichess?fen=${encodeURIComponent(
                fen
            )}&speeds=blitz,rapid,classical&ratings=1600,1800,2000,2200,2500`
        )
            .then((response) => {
                if (!response.ok) throw new Error('Errore nella risposta API');
                return response.json();
            })
            .then((data) => {
                setMovesData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [fen, isOpen]);

    return (
        <div className="mt-5 py-2 px-3 bg-gray-700 rounded-md">
            {/* Header senza margin-bottom fisso */}
            <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-white">Database Mosse</h3>
                <button
                    onClick={toggleDatabase}
                    className="p-0.5 bg-transparent rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    aria-label={isOpen ? 'Chiudi database' : 'Apri database'}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isOpen ? 'M18 12H6' : 'M12 6v12M18 12H6'}
                        />
                    </svg>
                </button>
            </div>

            {/* Spacer condizionale che appare solo quando il pannello è aperto */}
            {isOpen && <div className="h-3"></div>}

            {/* Contenuto con animazione di apertura/chiusura */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                {loading && (
                    <div className="flex justify-center items-center h-16">
                        <div className="animate-pulse flex space-x-2">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        </div>
                    </div>
                )}

                {error && <div className="text-red-400 text-sm p-2">Errore: {error}</div>}

                {!loading &&
                    !error &&
                    (!movesData || !movesData.moves || movesData.moves.length === 0) && (
                        <div className="text-gray-400 text-sm p-2 text-center">
                            Nessun dato disponibile per questa posizione
                        </div>
                    )}

                {!loading &&
                    !error &&
                    movesData &&
                    movesData.moves &&
                    movesData.moves.length > 0 && (
                        <div className="space-y-3">
                            {movesData.moves.map((move, index) => {
                                const total = move.white + move.draws + move.black;
                                const whitePercent = Math.round((move.white / total) * 100);
                                const drawPercent = Math.round((move.draws / total) * 100);
                                const adjustedBlackPercent = 100 - whitePercent - drawPercent;

                                return (
                                    <div
                                        key={index}
                                        className="relative cursor-pointer"
                                        onClick={() => onMoveSelect && onMoveSelect(move.san)}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center">
                                                <span className="text-white font-medium text-sm">
                                                    {move.san}
                                                </span>
                                                <span className="ml-2 text-gray-400 text-xs">
                                                    {total.toLocaleString()} partite
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative h-7 w-full rounded-md overflow-hidden bg-gray-800 flex">
                                            {/* Barra bianco */}
                                            <div
                                                className="h-full bg-gray-200 relative flex items-center justify-center transition-all duration-300 ease-in-out"
                                                style={{ width: `${whitePercent}%` }}
                                            >
                                                {whitePercent >= 15 && (
                                                    <span className="text-gray-800 text-xs font-medium z-10">
                                                        {whitePercent}%
                                                    </span>
                                                )}
                                            </div>

                                            {/* Barra patta */}
                                            <div
                                                className="h-full bg-gray-500 relative flex items-center justify-center transition-all duration-300 ease-in-out"
                                                style={{ width: `${drawPercent}%` }}
                                            >
                                                {drawPercent >= 15 && (
                                                    <span className="text-white text-xs font-medium z-10">
                                                        {drawPercent}%
                                                    </span>
                                                )}
                                            </div>

                                            {/* Barra nero */}
                                            <div
                                                className="h-full bg-black relative flex items-center justify-center transition-all duration-300 ease-in-out"
                                                style={{ width: `${adjustedBlackPercent}%` }}
                                            >
                                                {adjustedBlackPercent >= 15 && (
                                                    <span className="text-white text-xs font-medium z-10">
                                                        {adjustedBlackPercent}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="mt-1 pt-1 border-t border-gray-700 text-gray-400 text-xs flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-gray-200 mr-1"></div>
                                    <span>Bianco vince</span>
                                </div>
                                <div className="flex items-center mx-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
                                    <span>Patta</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-black mr-1"></div>
                                    <span>Nero vince</span>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default OpeningExplorer;
