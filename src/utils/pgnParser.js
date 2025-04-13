import { parse } from '@mliebelt/pgn-parser';
import { Chess } from 'chess.js';
import { reorganizeCanvasNodes } from './layoutUtils';

/**
 * Analizza un PGN usando la libreria pgn-parser e lo trasforma in nodi e connessioni
 */
export function parsePgn(pgn) {
    // Strutture dati per risultato
    const nodes = [];
    const connections = [];
    let nextId = Date.now();

    try {
        // Estrai le annotazioni speciali e salvale separatamente
        const { cleanedPgn, annotationMap } = extractSpecialAnnotations(pgn);

        // Assicurati che il PGN abbia i tag richiesti
        const standardizedPgn = ensureRequiredTags(cleanedPgn);

        console.log('PGN preparato per il parsing:', standardizedPgn);

        // Analizza il PGN usando la libreria esterna
        const parsedGame = parse(standardizedPgn, { startRule: 'game' });

        // Stampa il risultato completo per debug
        console.log('Parsed PGN:', JSON.stringify(parsedGame, null, 2));

        // Mappa per tenere traccia delle posizioni (FEN -> nodeId)
        const fenToNodeId = new Map();

        // Stato iniziale della scacchiera
        const chess = new Chess();

        // Processa la linea principale
        processMoves(
            parsedGame.moves,
            chess,
            null,
            0,
            nodes,
            connections,
            fenToNodeId,
            nextId,
            annotationMap
        );

        // Applica il layout finale
        return reorganizeCanvasNodes({
            nodes,
            connections,
            annotations: [],
        });
    } catch (error) {
        console.error('Errore nel parsing del PGN:', error);

        // Fallback: prova con un metodo più manuale
        return parseWithFallback(pgn);
    }
}

/**
 * Estrae le annotazioni speciali dal PGN e le salva in una struttura dati separata
 */
function extractSpecialAnnotations(pgn) {
    const annotationMap = new Map();

    // Estrai le annotazioni [%cal ...] e [%csl ...]
    const calRegex = /\[%cal\s+([^\]]+)\]/g;
    const cslRegex = /\[%csl\s+([^\]]+)\]/g;
    const evpRegex = /\[%evp[^\]]*\]/g;

    // Salva le posizioni delle annotazioni per riassociarle dopo
    let match;
    let cleanedPgn = pgn;

    // Trova tutte le annotazioni %cal
    while ((match = calRegex.exec(pgn)) !== null) {
        const fullMatch = match[0];
        const calData = match[1];
        const position = match.index;

        // Trova la mossa più vicina prima di questa annotazione
        const moveBeforeAnnotation = findMoveBeforePosition(pgn, position);

        if (moveBeforeAnnotation) {
            if (!annotationMap.has(moveBeforeAnnotation)) {
                annotationMap.set(moveBeforeAnnotation, { arrows: [], squares: [] });
            }

            // Estrai le frecce
            const arrows = parseArrows(calData);
            annotationMap.get(moveBeforeAnnotation).arrows.push(...arrows);
        }

        // Rimuovi l'annotazione dal PGN
        cleanedPgn = cleanedPgn.replace(fullMatch, ' ');
    }

    // Trova tutte le annotazioni %csl
    while ((match = cslRegex.exec(pgn)) !== null) {
        const fullMatch = match[0];
        const cslData = match[1];
        const position = match.index;

        // Trova la mossa più vicina prima di questa annotazione
        const moveBeforeAnnotation = findMoveBeforePosition(pgn, position);

        if (moveBeforeAnnotation) {
            if (!annotationMap.has(moveBeforeAnnotation)) {
                annotationMap.set(moveBeforeAnnotation, { arrows: [], squares: [] });
            }

            // Estrai le caselle colorate
            const squares = parseSquares(cslData);
            annotationMap.get(moveBeforeAnnotation).squares.push(...squares);
        }

        // Rimuovi l'annotazione dal PGN
        cleanedPgn = cleanedPgn.replace(fullMatch, ' ');
    }

    // Rimuovi le annotazioni %evp che non sono supportate
    cleanedPgn = cleanedPgn.replace(evpRegex, ' ');

    // Rimuovi testo in italiano problematico
    cleanedPgn = cleanedPgn.replace(/è[^()\[\]{}0-9.]+/g, ' ');

    // Normalizza spazi
    cleanedPgn = cleanedPgn.replace(/\s+/g, ' ').trim();

    return { cleanedPgn, annotationMap };
}

/**
 * Assicura che il PGN abbia i tag richiesti
 */
function ensureRequiredTags(pgn) {
    // Controlla se il PGN ha già tag
    const hasTagsRegex = /\[\s*(\w+)\s+\"([^\"]*)\"\s*\]/;

    if (!hasTagsRegex.test(pgn)) {
        // Aggiungi tag obbligatori
        const requiredTags = `[Event "Chess Analysis"]
[Site "Chess Notes"]
[Date "2025.04.03"]
[Round "?"]
[White "White"]
[Black "Black"]
[Result "*"]

`;
        pgn = requiredTags + pgn;
    }

    return pgn;
}

/**
 * Trova la mossa che appare prima di una certa posizione nel testo
 */
function findMoveBeforePosition(pgn, position) {
    const textBefore = pgn.substring(0, position);

    // Cerca l'ultima mossa valida nel testo precedente
    const moveRegex = /([KQRBNP]?[a-h]?[1-8]?x?[a-h][1-8](=[QRBN])?[+#]?|O-O(?:-O)?)/g;
    let lastMove = null;
    let match;

    while ((match = moveRegex.exec(textBefore)) !== null) {
        lastMove = match[0];
    }

    return lastMove;
}

/**
 * Analizza i dati delle frecce
 */
function parseArrows(calData) {
    const arrows = [];
    const arrowsData = calData.split(',');

    arrowsData.forEach((arrow) => {
        arrow = arrow.trim();
        if (arrow.length >= 5) {
            const color = arrow[0];
            const from = arrow.substring(1, 3);
            const to = arrow.substring(3, 5);

            if (from && to) {
                arrows.push({
                    from,
                    to,
                    color: mapColorCode(color),
                });
            }
        }
    });

    return arrows;
}

/**
 * Analizza i dati delle caselle colorate
 */
function parseSquares(cslData) {
    const squares = [];
    const squaresData = cslData.split(',');

    squaresData.forEach((square) => {
        square = square.trim();
        if (square.length >= 3) {
            const color = square[0];
            const squareName = square.substring(1, 3);

            if (squareName) {
                squares.push({
                    square: squareName,
                    color: mapColorCode(color),
                });
            }
        }
    });

    return squares;
}

/**
 * Processa ricorsivamente le mosse e crea nodi e connessioni
 */
function processMoves(
    moves,
    chess,
    parentNodeId,
    depth,
    nodes,
    connections,
    fenToNodeId,
    nextId,
    annotationMap
) {
    if (!moves || moves.length === 0) return;

    let currentNodeId = parentNodeId;

    for (const move of moves) {
        try {
            // Clone della posizione corrente
            const currentChess = new Chess(chess.fen());

            // Esegui la mossa
            const moveResult = currentChess.move(move.notation.notation);

            if (moveResult) {
                const fen = currentChess.fen();

                // Se abbiamo già un nodo per questa posizione, usa quello esistente
                if (fenToNodeId.has(fen)) {
                    const existingNodeId = fenToNodeId.get(fen);

                    // Crea connessione al nodo esistente
                    if (currentNodeId !== null) {
                        connections.push({
                            id: `conn-${nextId++}`,
                            fromId: currentNodeId,
                            toId: existingNodeId,
                        });
                    }

                    currentNodeId = existingNodeId;
                } else {
                    // Crea un nuovo nodo per questa posizione
                    const nodeId = nextId++;

                    // Estrai commenti dalla mossa
                    const comments = move.commentAfter || move.commentMove || '';

                    // Cerca annotazioni speciali associate a questa mossa
                    let arrows = [];
                    let squares = [];

                    if (annotationMap.has(move.notation.notation)) {
                        const annotation = annotationMap.get(move.notation.notation);
                        arrows = annotation.arrows;
                        squares = annotation.squares;
                    }

                    // Crea il nodo
                    const node = {
                        id: nodeId,
                        x: 100 + depth * 100, // Posizionamento temporaneo
                        y: 100 * (nodes.length % 5), // Posizionamento temporaneo
                        label: move.notation.notation,
                        description: comments,
                        type: 'move',
                        fenPosition: fen,
                        arrows: arrows,
                        squares: squares,
                    };

                    nodes.push(node);
                    fenToNodeId.set(fen, nodeId);

                    // Crea connessione
                    if (currentNodeId !== null) {
                        connections.push({
                            id: `conn-${nextId++}`,
                            fromId: currentNodeId,
                            toId: nodeId,
                        });
                    }

                    currentNodeId = nodeId;
                }

                // Aggiorna la posizione per i prossimi nodi
                chess.move(move.notation.notation);
            }

            // Processa ricorsivamente le varianti
            if (move.variations && move.variations.length > 0) {
                for (const variation of move.variations) {
                    // Usa il nodo corrente come genitore per la variante
                    processMoves(
                        variation,
                        new Chess(currentChess.fen()),
                        currentNodeId,
                        depth + 1,
                        nodes,
                        connections,
                        fenToNodeId,
                        nextId,
                        annotationMap
                    );
                }
            }
        } catch (error) {
            console.warn(
                `Errore nell'elaborare la mossa ${move.notation?.notation || 'sconosciuta'}:`,
                error
            );
        }
    }
}

/**
 * Parser di fallback che usa un approccio manuale per i PGN problematici
 */
function parseWithFallback(pgn) {
    console.log('Utilizzando parser di fallback per PGN problematico');

    const nodes = [];
    const connections = [];
    let nextId = Date.now();

    try {
        // Rimuovi tutte le annotazioni problematiche
        let cleanPgn = pgn.replace(/\[%[^\]]*\]/g, '');

        // Rimuovi testo in italiano problematico
        cleanPgn = cleanPgn.replace(/è[^()\[\]{}0-9.]+/g, ' ');

        // Estrai solo le mosse essenziali
        const moveMatches = cleanPgn.match(
            /\b([KQRBNP]?[a-h]?[1-8]?x?[a-h][1-8](=[QRBN])?[+#]?|O-O(?:-O)?)\b/g
        );

        if (moveMatches && moveMatches.length > 0) {
            const chess = new Chess();
            let lastNodeId = null;

            for (let i = 0; i < moveMatches.length; i++) {
                try {
                    const moveText = moveMatches[i];
                    const moveResult = chess.move(moveText);

                    if (moveResult) {
                        const nodeId = nextId++;

                        const node = {
                            id: nodeId,
                            x: 100 + i * 100,
                            y: 50,
                            label: moveResult.san,
                            description: '', // Non abbiamo commenti nel fallback
                            type: 'move',
                            fenPosition: chess.fen(),
                            arrows: [],
                            squares: [],
                        };

                        nodes.push(node);

                        if (lastNodeId !== null) {
                            connections.push({
                                id: `conn-${nextId++}`,
                                fromId: lastNodeId,
                                toId: nodeId,
                            });
                        }

                        lastNodeId = nodeId;
                    }
                } catch (moveError) {
                    console.warn(
                        `Errore nell'eseguire la mossa "${moveMatches[i]}" nel fallback:`,
                        moveError
                    );
                }
            }
        }

        return reorganizeCanvasNodes({
            nodes,
            connections,
            annotations: [],
        });
    } catch (error) {
        console.error('Errore anche nel parser di fallback:', error);
        return { nodes: [], connections: [] };
    }
}

/**
 * Mappa i codici colore PGN ai colori CSS
 */
function mapColorCode(code) {
    switch (code.toUpperCase()) {
        case 'R':
            return 'red';
        case 'G':
            return 'green';
        case 'B':
            return 'blue';
        case 'Y':
            return 'yellow';
        case 'C':
            return 'cyan';
        default:
            return 'red';
    }
}
