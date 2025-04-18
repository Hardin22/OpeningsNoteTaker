import React, { useCallback, useEffect, useRef, useState } from 'react';
import Canvas from './components/Canvas';
import ChessboardPopup from './components/ChessboardPopup';
import DrillMode from './components/DrillMode';
import Sidebar from './components/Sidebar';
import { generatePGN } from './utils/chessLogic';
import { useAuth } from './components/AuthContext';
import { databaseSaver } from './utils/DatabaseSaver';


function App() {
    // Stato iniziale del canvas
    const [canvasData, setCanvasData] = useState({
        nodes: [],
        connections: [],
        annotations: [],
    });
    const [currentPGN, setCurrentPGN] = useState('');
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedAnnotation, setSelectedAnnotation] = useState(null);
    const [isChessboardOpen, setIsChessboardOpen] = useState(false);
    const [isDrillModeOpen, setIsDrillModeOpen] = useState(false);
    const { currentUser, userData, userRepertoires } = useAuth();
    const hasLogged = useRef(false);


    // Refs
    const isGeneratingPGN = useRef(false);
    useEffect(() => {
        // Esegui il log solo una volta dopo che i dati sono disponibili
        if (currentUser && userData && !hasLogged.current) {
            console.log('Utente autenticato:', {
                uid: currentUser.uid,
                email: currentUser.email,
            });
            console.log('Dati utente da Firestore:', userData);
            console.log('Repertori utente:', userRepertoires);

            // Imposta il flag per evitare log duplicati
            hasLogged.current = true;
        }
    }, [currentUser, userData, userRepertoires]);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const activeRepertoireRef = useRef(null);
    const [activeRepertoireId, setActiveRepertoireId] = useState(null);

    const calculateFullLines = useCallback((canvas) => {
        if (!canvas || !canvas.nodes || !canvas.connections) return [];

        // Trova i nodi foglia (quelli senza figli)
        const leafNodes = canvas.nodes.filter(
            (node) => !canvas.connections.some((conn) => conn.fromId === node.id)
        );

        // Estrai i PGN dai nodi foglia
        return leafNodes.map((node) => node.pgn).filter((pgn) => pgn && pgn.trim() !== '');
    }, []);


    // Funzione per inizializzare il sistema di salvataggio quando l'utente è autenticato
    useEffect(() => {
        if (currentUser && userRepertoires?.length > 0) {
            // Se abbiamo repertori esistenti, inizializza con il primo
            const activeRepertoire = userRepertoires[0];
            activeRepertoireRef.current = activeRepertoire.id;

            // Carica i dati dal repertorio attivo
            try {
                if (activeRepertoire.canvasData) {
                    const parsedData = JSON.parse(activeRepertoire.canvasData);
                    setCanvasData(parsedData);

                    // Inizializza il database saver
                    databaseSaver.initialize(currentUser.uid, activeRepertoire.id, parsedData);
                }
            } catch (error) {
                console.error('Errore nel parsing dei dati del repertorio:', error);
            }
        }

        return () => {
            // Cleanup quando il componente viene smontato
            databaseSaver.cleanup();
        };
    }, [currentUser, userRepertoires]);

    // Aggiorna il saver quando canvasData cambia
    useEffect(() => {
        if (currentUser && activeRepertoireRef.current && canvasData) {
            databaseSaver.setCanvasData(canvasData);
        }
    }, [canvasData, currentUser]);

    // Funzione per salvare manualmente
    const handleSaveRepertoire = useCallback(
        async (customTitle) => {
            if (!currentUser || !activeRepertoireRef.current) {
                // Se è il primo salvataggio, crea un nuovo repertorio
                if (currentUser && canvasData) {
                    setIsSaving(true);

                    // Usa il titolo passato da Sidebar se disponibile, altrimenti chiedi un nome
                    const title =
                        customTitle ||
                        prompt('Inserisci un nome per il tuo repertorio:', 'Nuovo Repertorio');

                    if (!title) {
                        setIsSaving(false);
                        return;
                    }

                    if (title) {
                        const newId = await databaseSaver.createNewRepertoire(title);
                        if (newId) {
                            activeRepertoireRef.current = newId;
                            setLastSaved(new Date());
                            alert(`Repertorio "${title}" salvato con successo!`);
                        }
                    }
                    setIsSaving(false);
                }
                return;
            }

            // Salva il repertorio esistente
            setIsSaving(true);
            const success = await databaseSaver.forceSave();
            setIsSaving(false);

            if (success) {
                setLastSaved(new Date());
            }
        },
        [currentUser, canvasData]
    );

    // Rilevamento di alta attività per adattare gli intervalli di salvataggio
    

    // Funzione per costruire il percorso delle mosse da un nodo alla radice
    const buildMovePath = (nodes, connections, targetNodeId) => {
        const nodesMap = new Map(nodes.map((node) => [node.id, node]));
        const parentMap = new Map();

        for (const conn of connections) {
            parentMap.set(conn.toId, conn.fromId);
        }

        const path = [];
        let currentId = targetNodeId;

        while (currentId) {
            const node = nodesMap.get(currentId);
            if (node && node.label) {
                path.unshift(node.label);
            }
            currentId = parentMap.get(currentId);
        }

        return path;
    };

    // Funzione per generare PGN da un nodo
    const generatePGNFromNode = (canvasData, nodeId) => {
        const selectedNode = canvasData.nodes.find((node) => node.id === nodeId);
        // Se il nodo ha già il PGN salvato, usalo direttamente
        if (selectedNode && selectedNode.pgn && selectedNode.pgn.trim() !== '') {
            return selectedNode.pgn;
        }
        // Altrimenti ricostruisci il percorso e genera il PGN
        const movePath = buildMovePath(canvasData.nodes, canvasData.connections, nodeId);
        return generatePGN(movePath);
    };

    // Funzione per generare PGN quando un nodo viene selezionato
    const handleGeneratePGN = (movePath) => {
        if (!movePath || movePath.length === 0) {
            setCurrentPGN('');
            return;
        }
        console.log('App: Generazione PGN per percorso:', movePath);
        const pgnText = generatePGN(movePath);
        console.log('App: PGN generato:', pgnText);
        setCurrentPGN(pgnText);
    };

    // Funzione per aggiungere un nuovo nodo
    const handleAddNode = () => {
        const newNode = {
            id: Date.now(),
            x: 50,
            y: 50,
            label: '',
            description: '',
            type: 'move',
        };
        setCanvasData((prev) => ({
            ...prev,
            nodes: [...prev.nodes, newNode],
        }));
    };

    // Funzione per aggiornare un nodo
    const updateNode = (updatedNode) => {
        setCanvasData((prev) => ({
            ...prev,
            nodes: prev.nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)),
        }));

        // Aggiorna anche il nodo selezionato se è quello che stiamo modificando
        if (selectedNode && selectedNode.id === updatedNode.id) {
            setSelectedNode(updatedNode);

            // Rigenera il PGN quando aggiorniamo un nodo selezionato
            const movePath = buildMovePath(
                canvasData.nodes,
                canvasData.connections,
                updatedNode.id
            );
            handleGeneratePGN(movePath);
        }
    };

    // Funzione per gestire la selezione di un nodo
    const handleNodeSelect = useCallback(
        (nodeId) => {
            setSelectedNode(canvasData.nodes.find((node) => node.id === nodeId) || null);
            setSelectedAnnotation(null);

            // Se c'è un nodo selezionato, genera il PGN
            if (nodeId) {
                // Utilizza una flag per evitare la rigenerazione continua
                if (!isGeneratingPGN.current) {
                    isGeneratingPGN.current = true;
                    const pgn = generatePGNFromNode(canvasData, nodeId);
                    setCurrentPGN(pgn);
                    setTimeout(() => {
                        isGeneratingPGN.current = false;
                    }, 100);
                }
            } else {
                setCurrentPGN('');
            }
        },
        [canvasData]
    );

    // Funzione per aggiungere una nuova annotazione
    const handleAddAnnotation = () => {
        const newAnnotation = {
            id: Date.now(),
            x: 100,
            y: 100,
            width: 250,
            height: 150,
            text: '',
        };
        setCanvasData((prev) => ({
            ...prev,
            annotations: [...prev.annotations, newAnnotation],
        }));
    };

    // Funzione per aggiornare un'annotazione
    const updateAnnotation = (updatedAnnotation) => {
        setCanvasData((prev) => ({
            ...prev,
            annotations: prev.annotations.map((ann) =>
                ann.id === updatedAnnotation.id ? updatedAnnotation : ann
            ),
        }));

        // Aggiorna anche l'annotazione selezionata se è quella che stiamo modificando
        if (selectedAnnotation && selectedAnnotation.id === updatedAnnotation.id) {
            setSelectedAnnotation(updatedAnnotation);
        }
    };

    // Funzione per gestire la selezione di un'annotazione
    const handleAnnotationSelect = (annotationId) => {
        if (annotationId) {
            // Seleziona l'annotazione e deseleziona qualsiasi nodo
            const foundAnnotation = canvasData.annotations.find((ann) => ann.id === annotationId);
            setSelectedAnnotation(foundAnnotation || null);
            setSelectedNode(null);
        } else {
            setSelectedAnnotation(null);
        }
    };

    // Funzione per eliminare un elemento selezionato (nodo o annotazione)
    const deleteSelectedElement = () => {
        if (selectedNode) {
            setCanvasData((prev) => ({
                ...prev,
                nodes: prev.nodes.filter((node) => node.id !== selectedNode.id),
                connections: prev.connections
                    ? prev.connections.filter(
                          (conn) => conn.fromId !== selectedNode.id && conn.toId !== selectedNode.id
                      )
                    : [],
            }));
            setSelectedNode(null);
        } else if (selectedAnnotation) {
            setCanvasData((prev) => ({
                ...prev,
                annotations: prev.annotations.filter((ann) => ann.id !== selectedAnnotation.id),
            }));
            setSelectedAnnotation(null);
        }
    };

    // Funzione per chiudere il popup della scacchiera
    const handleCloseChessboard = () => {
        setIsChessboardOpen(false);
    };

    // Funzione per aggiornare il canvas dalla scacchiera
    const handleUpdateCanvasFromChessboard = (updatedCanvas) => {
        setCanvasData(updatedCanvas);

        // Se un nodo è selezionato, aggiorna anche lo stato selectedNode
        if (selectedNode?.id) {
            const updatedNode = updatedCanvas.nodes.find((node) => node.id === selectedNode.id);
            if (updatedNode) {
                setSelectedNode(updatedNode);
            }
        }
    };
    // Aggiungi questa funzione per gestire l'aggiornamento e la selezione in un'unica operazione
    const handleUpdateCanvasAndSelectNode = useCallback((updatedCanvasData, newNodeId) => {
        // Aggiorna il canvas e seleziona il nuovo nodo in un'unica operazione di stato
        setCanvasData((prev) => {
            const newCanvasData = updatedCanvasData || prev;

            // Dopo l'aggiornamento del canvas, seleziona il nodo
            if (newNodeId) {
                const newNode = newCanvasData.nodes.find((node) => node.id === newNodeId);
                if (newNode) {
                    // Aggiorna selectedNode solo dopo che canvasData è stato aggiornato
                    setTimeout(() => {
                        setSelectedNode(newNode);
                    }, 0);
                }
            }

            return newCanvasData;
        });
    }, []);

    const [drillModeFullLines, setDrillModeFullLines] = useState([]);

    const handleStartDrillMode = useCallback(() => {
        // Calcola le fullLines dal canvas attualmente attivo
        const currentFullLines = calculateFullLines(canvasData);

        // Passa queste fullLines come prop a DrillMode
        setDrillModeFullLines(currentFullLines);
        setIsDrillModeOpen(true);
    }, [canvasData, calculateFullLines]);

    const handleCloseDrillMode = () => {
        setIsDrillModeOpen(false);
    };
    const handleDeleteNode = (nodeId, isRecursive) => {
        if (!nodeId || !canvasData) return;

        // Clone dei dati del canvas attuali
        const newCanvasData = { ...canvasData };

        if (isRecursive) {
            // Eliminazione ricorsiva: elimina il nodo e tutti i figli
            const nodesToDelete = new Set();

            // Funzione per trovare tutti i nodi figli ricorsivamente
            const findDescendants = (id) => {
                nodesToDelete.add(id);
                const childConnections = canvasData.connections.filter(
                    (conn) => conn.fromId === id
                );
                childConnections.forEach((conn) => {
                    findDescendants(conn.toId);
                });
            };

            findDescendants(nodeId);

            // Filtra i nodi, rimuovendo quelli da eliminare
            newCanvasData.nodes = canvasData.nodes.filter((node) => !nodesToDelete.has(node.id));

            // Filtra le connessioni, rimuovendo quelle che coinvolgono nodi eliminati
            newCanvasData.connections = canvasData.connections.filter(
                (conn) => !nodesToDelete.has(conn.fromId) && !nodesToDelete.has(conn.toId)
            );

            // Deseleziona il nodo se è stato eliminato
            if (selectedNode && nodesToDelete.has(selectedNode.id)) {
                setSelectedNode(null);
            }
        } else {
            // Implementa qui l'eliminazione non ricorsiva se necessario
        }

        // Aggiorna il canvas
        setCanvasData(newCanvasData);

        // Salva in localStorage
        //localStorage.setItem('canvasData', JSON.stringify(newCanvasData));
    };
    {/*
    // Carica i dati dal localStorage all'avvio dell'app}
    useEffect(() => {
        // Carica i dati dal localStorage
        const savedData = localStorage.getItem('canvasData');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Migra i nodi esistenti aggiungendo la proprietà arrows se mancante
                if (parsed.nodes) {
                    parsed.nodes = parsed.nodes.map((node) => ({
                        ...node,
                        arrows: node.arrows || [], // Aggiungi arrows se non esiste
                    }));
                }
                setCanvasData(parsed);
            } catch (e) {
                console.error('Errore nel caricamento dei dati:', e);
            }
        }
    }, []);*/}

    // Nella sezione di rendering, passa la nuova prop al ChessboardPopup
    {
        isChessboardOpen && selectedNode && (
            <ChessboardPopup
                pgn={currentPGN}
                onClose={handleCloseChessboard}
                nodeDescription={selectedNode.description}
                canvasData={canvasData}
                selectedNodeId={selectedNode.id}
                onUpdateCanvas={handleUpdateCanvasFromChessboard}
                onSelectNode={handleNodeSelect}
                onUpdateCanvasAndSelectNode={handleUpdateCanvasAndSelectNode} // Nuova prop
            />
        );
    }

    // Listener per tasti (x per cancellare, Ctrl+B per aprire scacchiera)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Shortcut per aprire la scacchiera (Ctrl+B)
            if (e.key === 'b' && e.ctrlKey && selectedNode) {
                e.preventDefault();
                setIsChessboardOpen(true);
            }

            // Rimuovi o commenta questa parte:
            // if (e.key === 'x' && (selectedNode || selectedAnnotation)) {
            //     deleteSelectedElement();
            // }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedNode, selectedAnnotation]);

    return (
        <div className="h-screen w-screen flex bg-gray-900 overflow-hidden max-h-screen max-w-screen">
            <Sidebar
                onAddNode={handleAddNode}
                onAddAnnotation={handleAddAnnotation}
                selectedNode={selectedNode}
                updateNode={updateNode}
                canvasData={canvasData}
                currentPGN={currentPGN}
                onOpenChessboard={() => setIsChessboardOpen(true)}
                onStartDrillMode={handleStartDrillMode}
                setCanvasData={setCanvasData}
                onDeleteNode={handleDeleteNode}
                onSaveRepertoire={handleSaveRepertoire}
                isSaving={isSaving}
                lastSaved={lastSaved}
            />
            <Canvas
                canvasData={canvasData}
                setCanvasData={setCanvasData}
                onNodeSelect={handleNodeSelect}
                selectedNodeId={selectedNode?.id || null}
                onAnnotationSelect={handleAnnotationSelect}
                selectedAnnotationId={selectedAnnotation?.id || null}
                updateAnnotation={updateAnnotation}
                onGeneratePGN={handleGeneratePGN}
            />
            {isChessboardOpen && selectedNode && (
                <ChessboardPopup
                    pgn={currentPGN}
                    onClose={handleCloseChessboard}
                    nodeDescription={selectedNode.description}
                    canvasData={canvasData}
                    selectedNodeId={selectedNode.id}
                    onUpdateCanvas={handleUpdateCanvasFromChessboard}
                    onSelectNode={handleNodeSelect}
                    onUpdateCanvasAndSelectNode={handleUpdateCanvasAndSelectNode}
                />
            )}

            {/* Mostra la modalità drill se attiva */}
            {isDrillModeOpen && (
                <DrillMode fullLines={drillModeFullLines} onClose={handleCloseDrillMode} />
            )}
        </div>
    );
}

export default App;
