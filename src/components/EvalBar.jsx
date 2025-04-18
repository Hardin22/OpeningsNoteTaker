import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

const EvalBar = ({ evaluation, height, width, isFlipped = false, orientation = 'vertical' }) => {
    // Limita la valutazione per la visualizzazione della barra (tra -5 e +5)
    const limitedEval = useMemo(() => {
        if (evaluation === 'mate') return 5;
        if (evaluation === '-mate') return -5;

        // Se è un numero, limitiamo tra -5 e +5 per la visualizzazione
        const numEval = parseFloat(evaluation);
        if (isNaN(numEval)) return 0;

        // Non invertiamo più il valore, usiamo direttamente quello fornito da Stockfish
        return Math.max(-5, Math.min(5, numEval));
    }, [evaluation]);

    // Calcola la percentuale per la barra (da 0% a 100%, con 50% come posizione neutra)
    const barPercentage = useMemo(() => {
        return 50 - limitedEval * 10;
    }, [limitedEval]);

    // Formatta la valutazione per la visualizzazione
    const formattedEval = useMemo(() => {
        if (evaluation === 'mate') return '+ #';
        if (evaluation === '-mate') return '- #';

        const numEval = parseFloat(evaluation);
        if (isNaN(numEval)) return '0.0';

        const absEval = Math.abs(numEval);
        const sign = numEval > 0 ? '+' : numEval < 0 ? '-' : '';
        return `${sign}${absEval.toFixed(1)}`;
    }, [evaluation]);

    // Rendering per barra verticale (desktop)
    if (orientation === 'vertical') {
        return (
            <div
                className="flex flex-col items-center"
                style={{
                    height: `${height}px`,
                    marginRight: '8px',
                }}
            >
                <div className="h-full w-6 relative bg-white rounded-md overflow-hidden">
                    {/* Divisore centrale */}
                    <div className="absolute w-full h-[1px] bg-gray-500 top-1/2 transform -translate-y-1/2 z-10" />

                    {/* Area nera (sempre presente in basso) */}
                    <div
                        className="absolute bottom-0 w-full bg-black transition-all duration-500 ease-out"
                        style={{
                            height: `${barPercentage}%`,
                        }}
                    />

                    {/* Etichetta valutazione */}
                    <div
                        className={`absolute top-2 left-0 right-0 text-center font-semibold transition-all duration-500 z-20
                        ${limitedEval >= 0 ? 'text-gray-800' : 'text-gray-300'}`}
                        style={{
                            fontSize: '10px',
                        }}
                    >
                        {formattedEval}
                    </div>
                </div>
            </div>
        );
    }

    // Rendering per barra orizzontale (mobile)
    return (
        <div
            className="flex flex-col items-center w-full"
            style={{
                width: '100%',
                height: '20px',
                marginBottom: '4px',
            }}
        >
            <div className="w-full h-6 relative bg-white rounded-md overflow-hidden">
                {/* Divisore centrale */}
                <div className="absolute h-full w-[1px] bg-gray-500 left-1/2 transform -translate-x-1/2 z-10" />

                {/* Area nera (sempre presente a sinistra) */}
                <div
                    className="absolute left-0 h-full bg-black transition-all duration-500 ease-out"
                    style={{
                        width: `${barPercentage}%`,
                    }}
                />

                {/* Etichetta valutazione */}
                <div
                    className={`absolute top-0 bottom-0 flex items-center justify-center font-semibold transition-all duration-500 z-20 
                    ${limitedEval >= 0 ? 'right-2 text-gray-800' : 'left-2 text-gray-300'}`}
                    style={{
                        fontSize: '10px',
                    }}
                >
                    {formattedEval}
                </div>
            </div>
        </div>
    );
};

EvalBar.propTypes = {
    evaluation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number,
    width: PropTypes.number,
    isFlipped: PropTypes.bool,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default EvalBar;
