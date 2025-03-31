import { Chess } from 'chess.js';

/**
 * Converte una mossa in formato UCI (es. e2e4) in notazione algebrica standard (es. e4)
 * @param {string} uciMove - Mossa in formato UCI (es. "e2e4", "e7e8q")
 * @param {string} fen - Posizione FEN corrente
 * @returns {string} Mossa in notazione algebrica standard
 */
export function uciToSan(uciMove, fen) {
    if (!uciMove || !fen) return '';

    try {
        // Creiamo un'istanza di Chess con la posizione FEN corrente
        const chess = new Chess(fen);

        // Estrai le coordinate dalla mossa UCI
        const from = uciMove.substring(0, 2);
        const to = uciMove.substring(2, 4);
        const promotion = uciMove.length > 4 ? uciMove.substring(4) : undefined;

        // Crea l'oggetto mossa per chess.js
        const move = {
            from,
            to,
            promotion,
        };

        // Esegui la mossa e ottieni l'oggetto mossa completo
        const result = chess.move(move);

        // Restituisci la notazione SAN
        return result ? result.san : uciMove;
    } catch (error) {
        console.error('Errore nella conversione UCI → SAN:', error);
        // In caso di errore, ritorniamo la mossa UCI originale
        return uciMove;
    }
}
