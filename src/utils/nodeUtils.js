/**
 * Trova un nodo per ID
 * @param {Array} nodes - Array di nodi
 * @param {string|number} nodeId - ID del nodo da trovare
 * @returns {Object|null} - Il nodo trovato o null
 */
export const findNodeById = (nodes, nodeId) => {
    if (!nodes || !nodeId) return null;
    return nodes.find((node) => node.id === nodeId) || null;
};

/**
 * Costruisce il percorso dei nodi dalla radice al nodo target
 * @param {Array} nodes - Array di nodi
 * @param {Array} connections - Array di connessioni
 * @param {string|number} targetNodeId - ID del nodo target
 * @returns {Array} - Array di nodi dal nodo radice al target
 */
export const buildNodePath = (nodes, connections, targetNodeId) => {
    // Crea un mappa delle connessioni per trovare rapidamente i genitori
    const parentsMap = {};
    connections.forEach((conn) => {
        if (conn.toId && conn.fromId) {
            parentsMap[conn.toId] = conn.fromId;
        }
    });

    // Costruisci il percorso dal target alla radice, poi inverti
    const path = [];
    let currentNodeId = targetNodeId;

    // Limita il numero di iterazioni per evitare loop infiniti
    const maxIterations = nodes.length;
    let iterations = 0;

    // Risali l'albero dalla foglia alla radice
    while (currentNodeId && iterations < maxIterations) {
        const node = findNodeById(nodes, currentNodeId);
        if (node) {
            // Aggiungi il nodo all'inizio dell'array (così alla fine sarà in ordine dalla radice alla foglia)
            path.unshift(node);
        }

        // Prendi il genitore del nodo corrente
        currentNodeId = parentsMap[currentNodeId];
        iterations++;
    }

    return path;
};

/**
 * Trova il nodo che corrisponde a un indice di mossa nella cronologia
 * @param {Array} nodePath - Percorso dei nodi (dal nodo principale al nodo selezionato)
 * @param {number} moveIndex - Indice della mossa (-1 per posizione iniziale)
 * @returns {Object|null} - Il nodo corrispondente o null
 */
export const findNodeByMoveIndex = (nodePath, moveIndex) => {
    // Se è la posizione iniziale o non ci sono nodi nel percorso
    if (moveIndex === -1 || !nodePath.length) {
        // Ritorna il primo nodo del percorso (il nodo radice) se esiste
        return nodePath[0] || null;
    }

    // Trova il nodo che corrisponde all'indice della mossa
    // Considerando che il primo nodo (nodePath[0]) è per la posizione iniziale (-1)
    // e gli altri nodi sono per le mosse 0, 1, 2, ...
    const nodeIndex = moveIndex + 1;
    return nodeIndex < nodePath.length ? nodePath[nodeIndex] : null;
};

/**
 * Trova il nodo "migliore" in caso di biforcazioni
 * Utilizza come euristica il nodo più recentemente creato
 * @param {Array} nodes - Array di nodi
 * @param {Array} connections - Array di connessioni
 * @param {string|number} parentNodeId - ID del nodo genitore
 * @returns {Object|null} - Il nodo "migliore" o null
 */
export const findBestChildNode = (nodes, connections, parentNodeId) => {
    if (!parentNodeId) return null;

    // Trova tutti i figli del nodo genitore
    const childrenConnections = connections.filter((conn) => conn.fromId === parentNodeId);

    if (!childrenConnections.length) return null;

    // Se c'è un solo figlio, ritorna quello
    if (childrenConnections.length === 1) {
        return findNodeById(nodes, childrenConnections[0].toId);
    }

    // Altrimenti, trova il nodo con l'ID più alto (presumibilmente il più recente)
    // Oppure puoi implementare un'altra euristica qui
    const childrenNodes = childrenConnections
        .map((conn) => findNodeById(nodes, conn.toId))
        .filter(Boolean);

    if (!childrenNodes.length) return null;

    // Ordina per ID decrescente (presumibilmente i più recenti hanno ID più alti)
    // o puoi usare un altro criterio di ordinamento
    return childrenNodes.sort((a, b) => b.id - a.id)[0];
};

/**
 * Crea un nuovo nodo per una mossa
 * @param {Object} move - Oggetto mossa Chess.js
 * @param {string|number} parentNodeId - ID del nodo genitore
 * @param {number} x - Coordinata X del nuovo nodo
 * @param {number} y - Coordinata Y del nuovo nodo
 * @returns {Object} - Nuovo nodo e connessione
 */
export const createMoveNode = (move, parentNodeId, x = 0, y = 0) => {
    const newNodeId = Date.now();

    // Calcola una posizione offset rispetto al genitore se non sono specificate
    const nodeX = x || Math.random() * 100 + 50;
    const nodeY = y || Math.random() * 100 + 50;

    const newNode = {
        id: newNodeId,
        x: nodeX,
        y: nodeY,
        label: move.san,
        description: '',
        type: 'move',
    };

    const newConnection = {
        id: `conn-${Date.now()}`,
        fromId: parentNodeId,
        toId: newNodeId,
    };

    return { node: newNode, connection: newConnection };
};

/**
 * Verifica se un nodo è direttamente o indirettamente collegato a un altro nodo
 * @param {Array} connections - Array di connessioni
 * @param {string|number} startNodeId - ID del nodo di partenza
 * @param {string|number} targetNodeId - ID del nodo target
 * @returns {boolean} - True se c'è un percorso, false altrimenti
 */
export const isNodeConnected = (connections, startNodeId, targetNodeId) => {
    if (startNodeId === targetNodeId) return true;

    // Implementa una ricerca in ampiezza
    const visited = new Set();
    const queue = [startNodeId];

    while (queue.length > 0) {
        const currentId = queue.shift();

        if (currentId === targetNodeId) return true;

        if (!visited.has(currentId)) {
            visited.add(currentId);

            // Trova tutti i nodi connessi al nodo corrente
            connections
                .filter((conn) => conn.fromId === currentId)
                .forEach((conn) => {
                    if (!visited.has(conn.toId)) {
                        queue.push(conn.toId);
                    }
                });
        }
    }

    return false;
};
