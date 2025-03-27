/**
 * Riorganizza tutti i nodi nel canvas in modo intelligente
 * Usa algoritmi diversi in base alla struttura del grafo
 * 
 * @param {Object} canvasData - Dati del canvas
 * @return {Object} - Dati del canvas aggiornati con nuove posizioni dei nodi
 */
export const reorganizeCanvasNodes = (canvasData) => {
  if (!canvasData || !canvasData.nodes || !canvasData.connections) {
    return canvasData;
  }

  const { nodes, connections } = canvasData;
  
  // Se non ci sono nodi o solo un nodo, non serve riorganizzare
  if (nodes.length <= 1) {
    return canvasData;
  }

  // 1. Analizza la struttura del grafo
  const graphStructure = analyzeGraphStructure(nodes, connections);
  
  // 2. Scegli e applica la strategia di layout più appropriata
  let updatedNodes;
  
  if (graphStructure.isTree) {
    // Per strutture ad albero: layout gerarchico top-down o left-right
    updatedNodes = applyHierarchicalLayout(nodes, connections, graphStructure.rootNodes);
  } else if (graphStructure.hasCycles) {
    // Per grafi ciclici: layout a forza direzionale
    updatedNodes = applyForceDirectedLayout(nodes, connections);
  } else {
    // Per DAG (Directed Acyclic Graph): layout a livelli
    updatedNodes = applyLayeredLayout(nodes, connections, graphStructure.entryPoints);
  }
  
  // 3. Normalizza le posizioni (centra il layout)
  const normalizedNodes = normalizeNodePositions(updatedNodes);
  
  return {
    ...canvasData,
    nodes: normalizedNodes
  };
};

/**
 * Analizza la struttura del grafo per determinare caratteristiche chiave
 */
const analyzeGraphStructure = (nodes, connections) => {
  // Costruisce un grafo direzionato
  const graph = buildDirectedGraph(nodes, connections);
  
  // Identifica i nodi radice (senza genitori)
  const rootNodes = nodes.filter(node => 
    !connections.some(conn => conn.toId === node.id)
  );
  
  // Identifica i nodi di ingresso (quelli da cui iniziare la traversata)
  const entryPoints = rootNodes.length > 0 ? 
    rootNodes : 
    findBestEntryPoints(nodes, connections);
  
  // Verifica se il grafo è un albero
  const isTree = checkIfTree(nodes, connections);
  
  // Verifica la presenza di cicli
  const hasCycles = detectCycles(graph);
  
  // Conta le componenti connesse
  const connectedComponents = findConnectedComponents(nodes, connections);
  
  return {
    rootNodes,
    entryPoints,
    isTree,
    hasCycles,
    connectedComponents,
    graph
  };
};

/**
 * Costruisce un grafo direzionato dai nodi e connessioni
 */
const buildDirectedGraph = (nodes, connections) => {
  const graph = {};
  
  // Inizializza il grafo
  nodes.forEach(node => {
    graph[node.id] = { 
      data: node, 
      outgoing: [], 
      incoming: [] 
    };
  });
  
  // Aggiungi le connessioni
  connections.forEach(conn => {
    if (graph[conn.fromId]) {
      graph[conn.fromId].outgoing.push(conn.toId);
    }
    if (graph[conn.toId]) {
      graph[conn.toId].incoming.push(conn.fromId);
    }
  });
  
  return graph;
};

/**
 * Verifica se il grafo è un albero (un componente connesso senza cicli)
 */
const checkIfTree = (nodes, connections) => {
  // Un albero ha esattamente n-1 archi per n nodi
  if (connections.length !== nodes.length - 1) {
    return false;
  }
  
  // Un albero è connesso e aciclico
  const graph = buildDirectedGraph(nodes, connections);
  
  // Verifica connessione
  const visited = new Set();
  const startNode = nodes[0].id;
  
  // DFS per contare nodi raggiungibili
  const dfs = (nodeId) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    if (graph[nodeId]) {
      graph[nodeId].outgoing.forEach(childId => dfs(childId));
      graph[nodeId].incoming.forEach(parentId => dfs(parentId));
    }
  };
  
  dfs(startNode);
  
  return visited.size === nodes.length;
};

/**
 * Rileva cicli nel grafo usando DFS
 */
const detectCycles = (graph) => {
  const visited = new Set();
  const recStack = new Set();
  
  const hasCycle = (nodeId) => {
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      recStack.add(nodeId);
      
      if (graph[nodeId]) {
        for (const neighbor of graph[nodeId].outgoing) {
          if (!visited.has(neighbor) && hasCycle(neighbor)) {
            return true;
          } else if (recStack.has(neighbor)) {
            return true;
          }
        }
      }
    }
    
    recStack.delete(nodeId);
    return false;
  };
  
  for (const nodeId in graph) {
    if (!visited.has(parseInt(nodeId)) && hasCycle(parseInt(nodeId))) {
      return true;
    }
  }
  
  return false;
};

/**
 * Identifica i punti di ingresso migliori quando non ci sono nodi radice
 */
const findBestEntryPoints = (nodes, connections) => {
  // Trova i nodi con il minor numero di connessioni in entrata
  const inDegrees = nodes.map(node => ({
    id: node.id,
    inDegree: connections.filter(conn => conn.toId === node.id).length
  }));
  
  inDegrees.sort((a, b) => a.inDegree - b.inDegree);
  
  // Prendi il 10% dei nodi con minor grado in entrata, o almeno 1
  const numEntryPoints = Math.max(1, Math.ceil(nodes.length * 0.1));
  return inDegrees.slice(0, numEntryPoints).map(entry => 
    nodes.find(node => node.id === entry.id)
  );
};

/**
 * Trova le componenti connesse del grafo
 */
const findConnectedComponents = (nodes, connections) => {
  const components = [];
  const visited = new Set();
  
  // Costruisci un grafo non direzionato per verificare la connettività
  const undirectedGraph = {};
  
  nodes.forEach(node => {
    undirectedGraph[node.id] = { node, neighbors: [] };
  });
  
  connections.forEach(conn => {
    if (undirectedGraph[conn.fromId]) {
      undirectedGraph[conn.fromId].neighbors.push(conn.toId);
    }
    if (undirectedGraph[conn.toId]) {
      undirectedGraph[conn.toId].neighbors.push(conn.fromId);
    }
  });
  
  // DFS per trovare componenti connesse
  const exploreComponent = (nodeId) => {
    const component = [];
    const stack = [nodeId];
    
    while (stack.length > 0) {
      const current = stack.pop();
      
      if (!visited.has(current)) {
        visited.add(current);
        component.push(current);
        
        if (undirectedGraph[current]) {
          undirectedGraph[current].neighbors.forEach(neighbor => {
            if (!visited.has(neighbor)) {
              stack.push(neighbor);
            }
          });
        }
      }
    }
    
    return component;
  };
  
  // Trova tutte le componenti
  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      const component = exploreComponent(node.id);
      components.push(component);
    }
  });
  
  return components;
};

/**
 * Applica layout gerarchico per strutture ad albero
 */
const applyHierarchicalLayout = (nodes, connections, rootNodes) => {
  // Costruisci il grafo
  const graph = buildDirectedGraph(nodes, connections);
  
  // Layout gerarchico con spaziatura verticale
  const LEVEL_HEIGHT = 100;
  const NODE_WIDTH = 80;
  
  // Calcola la profondità di ogni nodo
  const depths = {};
  const widths = {}; // larghezza per ogni livello
  const positions = {};
  
  // Inizializza counters per livello
  for (let i = 0; i < nodes.length; i++) {
    widths[i] = 0;
  }
  
  // Assegna livelli con BFS
  const queue = rootNodes.map(node => ({ id: node.id, depth: 0 }));
  const visited = new Set();
  
  while (queue.length > 0) {
    const { id, depth } = queue.shift();
    
    if (visited.has(id)) continue;
    visited.add(id);
    
    depths[id] = depth;
    widths[depth]++;
    
    // Aggiungi figli alla coda
    if (graph[id]) {
      graph[id].outgoing.forEach(childId => {
        if (!visited.has(childId)) {
          queue.push({ id: childId, depth: depth + 1 });
        }
      });
    }
  }
  
  // Calcola la posizione orizzontale per ogni nodo a ogni livello
  const levelPositions = {};
  
  for (let level = 0; level < nodes.length; level++) {
    if (widths[level] > 0) {
      levelPositions[level] = [];
    }
  }
  
  // Prima passata per assegnare posizioni x iniziali
  nodes.forEach(node => {
    if (depths[node.id] !== undefined) {
      const level = depths[node.id];
      levelPositions[level].push(node.id);
    }
  });
  
  // Posiziona i nodi in orizzontale
  for (const level in levelPositions) {
    const nodesAtLevel = levelPositions[level];
    const levelWidth = nodesAtLevel.length * NODE_WIDTH;
    const startX = -levelWidth / 2;
    
    nodesAtLevel.forEach((nodeId, index) => {
      positions[nodeId] = {
        x: startX + index * NODE_WIDTH,
        y: level * LEVEL_HEIGHT
      };
    });
  }
  
  // Seconda passata per ottimizzare le posizioni
  for (let i = 0; i < 3; i++) { // alcune iterazioni per migliorare
    optimizeHorizontalPositions(positions, graph, depths);
  }
  
  // Applica le nuove posizioni ai nodi
  return nodes.map(node => {
    if (positions[node.id]) {
      return {
        ...node,
        x: positions[node.id].x,
        y: positions[node.id].y
      };
    }
    return node;
  });
};

/**
 * Ottimizza le posizioni orizzontali per minimizzare incroci
 */
const optimizeHorizontalPositions = (positions, graph, depths) => {
  // Per ogni nodo, prova a centrarlo rispetto ai suoi figli/genitori
  for (const nodeId in graph) {
    const node = graph[nodeId];
    const depth = depths[nodeId];
    
    // Centra il nodo sopra i suoi figli
    if (node.outgoing.length > 0) {
      let sumX = 0;
      node.outgoing.forEach(childId => {
        if (positions[childId]) {
          sumX += positions[childId].x;
        }
      });
      
      const avgX = sumX / node.outgoing.length;
      
      // Sposta il nodo verso la media delle posizioni dei figli (con peso)
      if (positions[nodeId]) {
        positions[nodeId].x = (positions[nodeId].x * 0.5) + (avgX * 0.5);
      }
    }
    
    // Se è un nodo non radice, centra rispetto ai genitori
    if (node.incoming.length > 0 && depth > 0) {
      let sumX = 0;
      node.incoming.forEach(parentId => {
        if (positions[parentId]) {
          sumX += positions[parentId].x;
        }
      });
      
      const avgX = sumX / node.incoming.length;
      
      // Sposta il nodo verso la media delle posizioni dei genitori (con peso)
      if (positions[nodeId]) {
        positions[nodeId].x = (positions[nodeId].x * 0.8) + (avgX * 0.2);
      }
    }
  }
  
  // Risolvi sovrapposizioni allo stesso livello
  for (let level = 0; level < 100; level++) { // un limite superiore ragionevole
    const nodesAtLevel = Object.keys(positions).filter(id => 
      depths[id] === level && positions[id]
    );
    
    if (nodesAtLevel.length <= 1) continue;
    
    // Ordina i nodi per posizione x
    nodesAtLevel.sort((a, b) => positions[a].x - positions[b].x);
    
    // Verifica e risolvi sovrapposizioni
    const MIN_DISTANCE = 100;
    for (let i = 1; i < nodesAtLevel.length; i++) {
      const prevId = nodesAtLevel[i-1];
      const currId = nodesAtLevel[i];
      
      const prevX = positions[prevId].x;
      const currX = positions[currId].x;
      
      if (currX - prevX < MIN_DISTANCE) {
        positions[currId].x = prevX + MIN_DISTANCE;
      }
    }
  }
};

/**
 * Applica un layout a forza direzionale per grafi ciclici
 */
const applyForceDirectedLayout = (nodes, connections) => {
  // Parametri del layout
  const REPULSION = 500;  // Forza di repulsione tra nodi
  const ATTRACTION = 0.1; // Forza di attrazione per le connessioni
  const ITERATIONS = 100; // Numero di iterazioni
  
  // Copia i nodi con posizioni casuali se non esistono
  let layoutNodes = nodes.map(node => ({
    ...node,
    vx: 0,   // velocità x
    vy: 0,   // velocità y
    fx: null, // posizione fissa x (null = mobile)
    fy: null  // posizione fissa y (null = mobile)
  }));
  
  // Mappa di nodi per accesso rapido
  const nodeMap = {};
  layoutNodes.forEach(node => {
    nodeMap[node.id] = node;
  });
  
  // Simulazione
  for (let i = 0; i < ITERATIONS; i++) {
    // Forza di repulsione tra tutti i nodi
    for (let j = 0; j < layoutNodes.length; j++) {
      for (let k = j + 1; k < layoutNodes.length; k++) {
        const nodeA = layoutNodes[j];
        const nodeB = layoutNodes[k];
        
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        
        // Evita divisione per zero e forze eccessive
        const force = Math.min(REPULSION / (distance * distance), 10);
        
        const forceX = (dx / distance) * force;
        const forceY = (dy / distance) * force;
        
        nodeA.vx -= forceX;
        nodeA.vy -= forceY;
        nodeB.vx += forceX;
        nodeB.vy += forceY;
      }
    }
    
    // Forza di attrazione per le connessioni
    connections.forEach(conn => {
      const source = nodeMap[conn.fromId];
      const target = nodeMap[conn.toId];
      
      if (!source || !target) return;
      
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      
      // Evita distanze eccessive
      const force = distance * ATTRACTION;
      
      const forceX = (dx / distance) * force;
      const forceY = (dy / distance) * force;
      
      source.vx += forceX;
      source.vy += forceY;
      target.vx -= forceX;
      target.vy -= forceY;
    });
    
    // Aggiorna posizioni
    layoutNodes.forEach(node => {
      if (node.fx === null) { // se non è un nodo fissato
        // Damping per stabilizzare
        node.vx *= 0.9;
        node.vy *= 0.9;
        
        // Limita le velocità
        const maxVelocity = 5;
        node.vx = Math.max(-maxVelocity, Math.min(maxVelocity, node.vx));
        node.vy = Math.max(-maxVelocity, Math.min(maxVelocity, node.vy));
        
        // Aggiorna posizione
        node.x += node.vx;
        node.y += node.vy;
      }
    });
  }
  
  // Rimuovi le proprietà aggiuntive
  return layoutNodes.map(node => ({
    ...node,
    vx: undefined,
    vy: undefined,
    fx: undefined,
    fy: undefined
  }));
};

/**
 * Applica un layout a livelli per DAG (Directed Acyclic Graphs)
 */
const applyLayeredLayout = (nodes, connections, entryPoints) => {
  // Calcola i livelli per ogni nodo
  const levels = calculateNodeLevels(nodes, connections, entryPoints);
  
  // Raggruppa i nodi per livello
  const nodesByLevel = {};
  Object.keys(levels).forEach(nodeId => {
    const level = levels[nodeId];
    if (!nodesByLevel[level]) {
      nodesByLevel[level] = [];
    }
    nodesByLevel[level].push(parseInt(nodeId));
  });
  
  // Ordina i nodi all'interno di ogni livello (riduce incroci)
  Object.keys(nodesByLevel).forEach(level => {
    const levelNodes = nodesByLevel[level];
    levelNodes.sort((a, b) => {
      // Ordina in base ai genitori
      const parentsA = connections
        .filter(conn => conn.toId === a)
        .map(conn => conn.fromId);
      
      const parentsB = connections
        .filter(conn => conn.toId === b)
        .map(conn => conn.fromId);
      
      // Se entrambi hanno genitori, ordina in base alla media delle posizioni dei genitori
      if (parentsA.length && parentsB.length) {
        const avgA = parentsA.reduce((sum, id) => sum + getNodeIndex(id, nodesByLevel[level-1] || []), 0) / parentsA.length;
        const avgB = parentsB.reduce((sum, id) => sum + getNodeIndex(id, nodesByLevel[level-1] || []), 0) / parentsB.length;
        return avgA - avgB;
      }
      
      return 0;
    });
  });
  
  // Posiziona i nodi
  const LEVEL_HEIGHT = 100;
  const NODE_WIDTH = 100;
  const positions = {};
  
  // Per ogni livello
  Object.keys(nodesByLevel).sort((a, b) => parseInt(a) - parseInt(b)).forEach(level => {
    const levelNodes = nodesByLevel[level];
    const levelWidth = levelNodes.length * NODE_WIDTH;
    
    // Posiziona i nodi del livello
    levelNodes.forEach((nodeId, index) => {
      positions[nodeId] = {
        x: (index * NODE_WIDTH) - (levelWidth / 2) + (NODE_WIDTH / 2),
        y: parseInt(level) * LEVEL_HEIGHT
      };
    });
  });
  
  // Ottimizzazione orizzontale
  for (let i = 0; i < 2; i++) {
    // Centra i nodi rispetto ai loro genitori/figli
    Object.keys(levels).forEach(nodeId => {
      const level = levels[nodeId];
      nodeId = parseInt(nodeId);
      
      // Padri del nodo corrente
      const parents = connections
        .filter(conn => conn.toId === nodeId)
        .map(conn => conn.fromId);
      
      // Figli del nodo corrente
      const children = connections
        .filter(conn => conn.fromId === nodeId)
        .map(conn => conn.toId);
      
      if (parents.length > 0) {
        // Media delle x dei genitori
        const parentAvgX = parents.reduce((sum, id) => {
          return positions[id] ? sum + positions[id].x : sum;
        }, 0) / parents.length;
        
        // Sposta verso la media (con peso)
        if (positions[nodeId]) {
          positions[nodeId].x = 0.5 * positions[nodeId].x + 0.5 * parentAvgX;
        }
      }
      
      if (children.length > 0) {
        // Media delle x dei figli
        const childrenAvgX = children.reduce((sum, id) => {
          return positions[id] ? sum + positions[id].x : sum;
        }, 0) / children.length;
        
        // Sposta verso la media (con peso)
        if (positions[nodeId]) {
          positions[nodeId].x = 0.7 * positions[nodeId].x + 0.3 * childrenAvgX;
        }
      }
    });
    
    // Previeni sovrapposizioni nello stesso livello
    Object.keys(nodesByLevel).forEach(level => {
      const levelNodes = nodesByLevel[level].slice();
      levelNodes.sort((a, b) => positions[a].x - positions[b].x);
      
      const MIN_DISTANCE = 80;
      for (let i = 1; i < levelNodes.length; i++) {
        const prevId = levelNodes[i-1];
        const currId = levelNodes[i];
        
        if (positions[currId].x - positions[prevId].x < MIN_DISTANCE) {
          positions[currId].x = positions[prevId].x + MIN_DISTANCE;
        }
      }
    });
  }
  
  // Applica le posizioni ai nodi
  return nodes.map(node => {
    if (positions[node.id]) {
      return {
        ...node,
        x: positions[node.id].x,
        y: positions[node.id].y
      };
    }
    return node;
  });
};

/**
 * Calcola il livello (profondità) di ogni nodo nel grafo
 */
const calculateNodeLevels = (nodes, connections, entryPoints) => {
  const levels = {};
  
  // Inizializza i nodi di entrata al livello 0
  entryPoints.forEach(node => {
    levels[node.id] = 0;
  });
  
  // BFS per propagare i livelli
  const queue = entryPoints.map(node => node.id);
  
  while (queue.length > 0) {
    const nodeId = queue.shift();
    const currentLevel = levels[nodeId];
    
    // Trova i figli
    const children = connections
      .filter(conn => conn.fromId === nodeId)
      .map(conn => conn.toId);
    
    children.forEach(childId => {
      // Prendi il massimo dei livelli dei genitori + 1
      const existingLevel = levels[childId];
      const newLevel = currentLevel + 1;
      
      if (existingLevel === undefined || newLevel > existingLevel) {
        levels[childId] = newLevel;
        queue.push(childId);
      }
    });
  }
  
  // Assegna livelli ai nodi isolati
  nodes.forEach(node => {
    if (levels[node.id] === undefined) {
      levels[node.id] = 0;
    }
  });
  
  return levels;
};

/**
 * Helper per trovare l'indice di un nodo in un array
 */
const getNodeIndex = (nodeId, nodeArray) => {
  const index = nodeArray.indexOf(nodeId);
  return index === -1 ? 0 : index;
};

/**
 * Normalizza le posizioni dei nodi (centra il layout)
 */
const normalizeNodePositions = (nodes) => {
  if (nodes.length === 0) return nodes;
  
  // Calcola il bounding box di tutti i nodi
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;
  
  nodes.forEach(node => {
    minX = Math.min(minX, node.x);
    minY = Math.min(minY, node.y);
    maxX = Math.max(maxX, node.x);
    maxY = Math.max(maxY, node.y);
  });
  
  // Calcola il centro del bounding box
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  
  // Centra i nodi rispetto all'origine (0,0)
  return nodes.map(node => ({
    ...node,
    x: node.x - centerX,
    y: node.y - centerY
  }));
};
