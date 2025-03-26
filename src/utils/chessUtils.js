
import { Chess } from 'chess.js';

/**
 * Carica un PGN e ottieni la storia delle mosse e la posizione finale
 * @param {string} pgn - Il PGN della partita
 * @returns {object} - Stato del gioco corrispondente al PGN
 */
export const loadPgn = (pgn) => {
    try {
        const game = new Chess();

        if (pgn && pgn.trim()) {
            game.loadPgn(pgn);
        }

        const history = game.history({ verbose: true });

        return {
            fen: game.fen(),
            history,
            currentIndex: history.length - 1,
        };
    } catch (error) {
        console.error('Errore nel caricamento del PGN:', error);
        return {
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            history: [],
            currentIndex: -1,
        };
    }
};

/**
 * Naviga alla posizione corrispondente a un indice di mossa
 * @param {string} pgn - Il PGN della partita
 * @param {number} moveIndex - Indice della mossa (-1 per posizione iniziale)
 * @returns {object} - Stato del gioco alla mossa specificata
 */
export const navigateToPosition = (pgn, moveIndex) => {
    try {
        const game = new Chess();

        // Carica il PGN se fornito
        if (pgn && pgn.trim()) {
            game.loadPgn(pgn);
        }

        // Ottieni la storia completa delle mosse
        const history = game.history({ verbose: true });

        // Reset alla posizione iniziale
        game.reset();

        // Se moveIndex è -1, restituisci la posizione iniziale
        if (moveIndex === -1) {
            return {
                fen: game.fen(),
                history,
                currentIndex: -1,
            };
        }

        // Altrimenti, rigioca le mosse fino all'indice richiesto
        for (let i = 0; i <= Math.min(moveIndex, history.length - 1); i++) {
            game.move(history[i]);
        }

        return {
            fen: game.fen(),
            history,
            currentIndex: moveIndex,
        };
    } catch (error) {
        console.error('Errore nella navigazione alla posizione:', error);
        return {
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            history: [],
            currentIndex: -1,
        };
    }
};

/**
 * Esegue una mossa e restituisce il nuovo stato del gioco
 * @param {string} fen - La posizione FEN corrente
 * @param {string} from - La casella di partenza
 * @param {string} to - La casella di arrivo
 * @param {string} promotion - Pezzo di promozione (opzionale)
 * @returns {object} - Stato del gioco dopo la mossa o null se mossa non valida
 */
export const executeMove = (fen, from, to, promotion = 'q') => {
    try {
        const game = new Chess(fen);

        // Tenta di eseguire la mossa
        const moveResult = game.move({
            from,
            to,
            promotion,
        });

        // Se la mossa non è valida, ritorna null
        if (!moveResult) {
            return null;
        }

        // Restituisci informazioni sulla mossa e la nuova posizione
        return {
            move: moveResult,
            fen: game.fen(),
            isCheck: game.isCheck(),
            isCheckmate: game.isCheckmate(),
            isDraw: game.isDraw(),
            history: game.history({ verbose: true }),
        };
    } catch (error) {
        console.error("Errore nell'esecuzione della mossa:", error);
        return null;
    }
};

/**
 * Formatta la notazione della mossa
 * @param {object} move - Oggetto mossa
 * @param {number} index - Indice della mossa
 * @returns {string} - Notazione formattata
 */
export const formatMoveNotation = (move, index) => {
    const moveNumber = Math.floor(index / 2) + 1;
    return index % 2 === 0 ? `${moveNumber}. ${move.san}` : move.san;
};