import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const EvalBar = ({ evaluation, height, isFlipped = false }) => {
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
                    className={`absolute top-2 left-0 right-0 text-center font-semibold  transition-all duration-500 z-20
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
};

EvalBar.propTypes = {
    evaluation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    isFlipped: PropTypes.bool,
};

export default EvalBar;
