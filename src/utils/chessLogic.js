import { Chess } from 'chess.js';

/**
 * Determina il colore del giocatore di un nodo in base alla sua profondità nell'albero
 * @param {Array} nodes - Lista di tutti i nodi
 * @param {Array} connections - Lista di tutte le connessioni
 * @param {number} nodeId - ID del nodo
 * @returns {string} - 'w' per bianco, 'b' per nero
 */
export const getNodeColor = (nodes, connections, nodeId) => {
    // Invece di basarci sul percorso, calcoliamo la profondità del nodo nell'albero
    const depth = calculateNodeDepth(nodes, connections, nodeId);
    // La radice (profondità 0) è bianco, profondità dispari è nero, profondità pari è bianco
    return depth % 2 === 0 ? 'w' : 'b';
};

/**
 * Calcola la profondità di un nodo nell'albero
 * @param {Array} nodes - Lista di tutti i nodi
 * @param {Array} connections - Lista di tutte le connessioni
 * @param {number} nodeId - ID del nodo
 * @returns {number} - Profondità del nodo (0 per la radice)
 */
export const calculateNodeDepth = (nodes, connections, nodeId) => {
    // Costruisci il dizionario delle relazioni padre-figlio
    const parentMap = new Map();
    for (const connection of connections) {
        parentMap.set(connection.toId, connection.fromId);
    }

    // Conta quanti passaggi ci sono fino alla radice
    let depth = 0;
    let currentNodeId = nodeId;

    while (parentMap.has(currentNodeId)) {
        depth++;
        currentNodeId = parentMap.get(currentNodeId);
    }

    console.log(`Profondità del nodo ${nodeId}: ${depth}`);
    return depth;
};

/**
 * Verifica se una mossa è valida dato lo stato corrente della partita
 * @param {string} move - La mossa in notazione algebrica
 * @param {Array} nodes - Lista di tutti i nodi
 * @param {Array} connections - Lista di tutte le connessioni
 * @param {number} nodeId - ID del nodo da validare
 * @returns {boolean} - True se la mossa è valida, false altrimenti
 */
export const isValidChessMove = (move, nodes, connections, nodeId) => {
    if (!move || typeof move !== 'string') return false;

    try {
        // Ottieni il percorso dalla radice al nodo padre
        const parentId = getParentId(connections, nodeId);
        const movePath = parentId ? buildMovePath(nodes, connections, parentId) : [];

        // Crea un'istanza di Chess e applica tutte le mosse precedenti
        const chess = new Chess();

        for (const prevMove of movePath) {
            if (prevMove && prevMove.trim() !== '') {
                try {
                    chess.move(prevMove);
                } catch (e) {
                    console.error(`Errore applicando la mossa precedente ${prevMove}:`, e);
                    return false;
                }
            }
        }

        // Debug
        const currentTurn = chess.turn();
        console.log(`Verifica mossa: ${move}`);
        console.log(`Turno attuale: ${currentTurn === 'w' ? 'Bianco' : 'Nero'}`);
        console.log(`Mosse valide:`, chess.moves());

        // Verifica anche che il turno corrisponda alla profondità
        const expectedTurn = getNodeColor(nodes, connections, nodeId);
        if (currentTurn !== expectedTurn) {
            console.error(`Errore di turno: atteso ${expectedTurn}, attuale ${currentTurn}`);
        }

        // Prova a eseguire la mossa
        try {
            const result = chess.move(move);
            return result !== null;
        } catch (e) {
            // Fallback: confronta con l'elenco delle mosse legittime
            return chess.moves().some((validMove) => {
                const normalizedValidMove = validMove.replace(/\+|#/g, '');
                const normalizedMove = move.replace(/\+|#/g, '');
                const matches =
                    normalizedValidMove === normalizedMove ||
                    normalizedValidMove.toLowerCase() === normalizedMove.toLowerCase();

                if (matches) console.log(`Mossa valida trovata: ${validMove}`);
                return matches;
            });
        }
    } catch (error) {
        console.error('Errore durante la validazione della mossa:', error);
        return false;
    }
};

/**
 * Ottiene l'ID del nodo padre
 * @param {Array} connections - Lista delle connessioni
 * @param {number} nodeId - ID del nodo figlio
 * @returns {number|null} - ID del nodo padre o null se è un nodo radice
 */
export const getParentId = (connections, nodeId) => {
    const connection = connections.find((conn) => conn.toId === nodeId);
    return connection ? connection.fromId : null;
};

/**
 * Genera la notazione PGN per un percorso specifico
 * @param {Array} movePath - Percorso di mosse dalla radice
 * @returns {string} - PGN formattato
 */
export const generatePGN = (movePath) => {
    if (!movePath || movePath.length === 0) return '';

    const chess = new Chess();
    let movesSoFar = 0;

    // Log di debug
    console.log('Generazione PGN per il percorso:', movePath);

    try {
        // Applica le mosse
        for (const move of movePath) {
            if (!move || move.trim() === '') continue;

            try {
                const result = chess.move(move);
                if (result) {
                    movesSoFar++;

                } else {
                    console.error(`Mossa non valida nel percorso: ${move}`);
                    break;
                }
            } catch (e) {
                console.error(`Errore nell'applicare la mossa ${move}:`, e);
                break;
            }
        }

        // Output di debug
        console.log(`PGN generato con ${movesSoFar} mosse valide`);

        // Genera il PGN
        return chess.pgn();
    } catch (error) {
        console.error('Errore nella generazione del PGN:', error);
        return 'Errore nella generazione del PGN';
    }
};

/**
 * Calcola la posizione FEN dopo una sequenza di mosse
 * @param {Array} nodes - Lista di tutti i nodi
 * @param {Array} connections - Lista di tutte le connessioni
 * @param {number} nodeId - ID del nodo
 * @returns {string} - Stringa FEN che rappresenta la posizione
 */
export const calculateFenPosition = (nodes, connections, nodeId) => {
    const movePath = buildMovePath(nodes, connections, nodeId);
    const chess = new Chess();

    for (const move of movePath) {
        if (move && move.trim() !== '') {
            try {
                chess.move(move);
            } catch (e) {
                console.error(`Errore applicando la mossa ${move}:`, e);
                break;
            }
        }
    }

    return chess.fen();
};

/**
 * Converte una sequenza di nodi in un percorso di mosse
 * @param {Array} nodes - Lista di tutti i nodi nel canvas
 * @param {Array} connections - Lista di tutte le connessioni
 * @param {number} targetNodeId - ID del nodo di destinazione
 * @returns {Array} - Percorso di mosse dal nodo radice al nodo target
 */
export const buildMovePath = (nodes, connections, targetNodeId) => {
    // Costruisci un dizionario di nodi per accesso veloce
    const nodesMap = new Map(nodes.map((node) => [node.id, node]));

    // Costruisci un dizionario di relazioni padre-figlio
    const parentMap = new Map();
    for (const connection of connections) {
        parentMap.set(connection.toId, connection.fromId);
    }

    // Risali l'albero dal nodo target alla radice
    const path = [];
    let currentNodeId = targetNodeId;

    while (currentNodeId) {
        const currentNode = nodesMap.get(currentNodeId);

        // Aggiungi la mossa all'inizio dell'array (ordine inverso mentre risaliamo)
        if (currentNode && currentNode.label && currentNode.label.trim() !== '') {
            path.unshift(currentNode.label);
        }

        // Passa al nodo padre
        currentNodeId = parentMap.get(currentNodeId);
    }

    console.log(`Percorso per nodo ${targetNodeId}:`, path);
    return path;
};
