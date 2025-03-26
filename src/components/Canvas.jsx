import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import Connection from './Connection';
import Annotation from './Annotation';
import {
    isValidChessMove,
    buildMovePath,
    calculateFenPosition,
    getNodeColor,
} from '../utils/chessLogic';

const Canvas = ({
    canvasData,
    setCanvasData,
    onNodeSelect,
    selectedNodeId,
    onAnnotationSelect,
    selectedAnnotationId,
    updateAnnotation,
    onGeneratePGN,
}) => {
    const canvasRef = useRef(null);
    const [isDraggingNode, setIsDraggingNode] = useState(false);
    const [isDraggingAnnotation, setIsDraggingAnnotation] = useState(false);
    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // All'avvio carichiamo i dati salvati da localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('canvasData');
        if (savedData) {
            setCanvasData(JSON.parse(savedData));
        }
    }, [setCanvasData]);

    // Auto-salvataggio ogni 15 secondi
    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.setItem('canvasData', JSON.stringify(canvasData));
            console.log('Canvas data salvato automaticamente');
        }, 15000);
        return () => clearInterval(interval);
    }, [canvasData]);

    // Funzione per aggiornare un nodo
    const updateNode = (updatedNode) => {
        const originalNode = canvasData.nodes.find((n) => n.id === updatedNode.id);

        // Se stiamo cambiando la label e questa non è vuota
        if (
            updatedNode.label !== originalNode?.label &&
            updatedNode.label &&
            updatedNode.label.trim() !== ''
        ) {
            // Verifica se è una mossa valida nel contesto
            const isValid = validateNodeUpdate(updatedNode);

            if (!isValid) {
                // Feedback all'utente più dettagliato
                const playerTurn = getNodeColor(
                    canvasData.nodes,
                    canvasData.connections,
                    updatedNode.id
                );
                const playerName = playerTurn === 'w' ? 'Bianco' : 'Nero';

                alert(
                    `La mossa "${updatedNode.label}" non è valida in questa posizione.\nÈ il turno del ${playerName}.`
                );
                return false;
            }

            // Se la mossa è valida, calcola la posizione FEN
            updatedNode.fenPosition = calculateFenPosition(
                canvasData.nodes,
                canvasData.connections,
                updatedNode.id
            );
        }

        // Aggiorna il nodo
        setCanvasData((prev) => ({
            ...prev,
            nodes: prev.nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)),
        }));

        // Se stiamo modificando il nodo selezionato, aggiorna anche quello
        if (selectedNodeId === updatedNode.id) {
            const movePath = buildMovePath(
                canvasData.nodes,
                canvasData.connections,
                updatedNode.id
            );
            if (onGeneratePGN) onGeneratePGN(movePath);
        }

        return true;
    };

    // Funzione per validare l'aggiornamento di un nodo
    const validateNodeUpdate = (updatedNode) => {
        // Se la label è vuota, non c'è niente da validare
        if (!updatedNode.label || updatedNode.label.trim() === '') {
            return true;
        }

        // Verifica se la mossa è valida nel contesto dell'albero
        return isValidChessMove(
            updatedNode.label,
            canvasData.nodes,
            canvasData.connections,
            updatedNode.id
        );
    };

    // Funzione per aggiungere un nodo figlio
    const handleAddChildNode = (parentId) => {
        // Trova il nodo genitore
        const parentNode = canvasData.nodes.find((node) => node.id === parentId);
        if (!parentNode) return;

        // Crea un nuovo nodo figlio posizionato leggermente sotto e a destra del genitore
        const childNode = {
            id: Date.now(),
            x: parentNode.x + 150,
            y: parentNode.y + 50,
            label: '',
            description: '',
            // Aggiungiamo un riferimento esplicito al padre
            parentId: parentId,
        };

        // Crea una nuova connessione
        const newConnection = {
            id: `${parentId}-${childNode.id}`,
            fromId: parentId,
            toId: childNode.id,
        };

        // Aggiungi il nodo e la connessione
        setCanvasData((prev) => ({
            ...prev,
            nodes: [...prev.nodes, childNode],
            connections: [...(prev.connections || []), newConnection],
        }));

        // Seleziona il nuovo nodo
        if (onNodeSelect) onNodeSelect(childNode.id);
    };

    // NUOVA FUNZIONE: Gestisce l'eliminazione di un nodo (con o senza figli)
    const handleDeleteNode = (nodeId, isRecursive) => {
        if (!nodeId || !canvasData) return;

        if (isRecursive) {
            // Eliminazione ricorsiva del nodo e di tutti i suoi figli
            const nodesToDelete = new Set();

            // Funzione ricorsiva per trovare tutti i nodi da eliminare
            const findDescendants = (id) => {
                nodesToDelete.add(id);

                // Trova tutte le connessioni dove questo nodo è genitore
                const childConnections = canvasData.connections.filter(
                    (conn) => conn.fromId === id
                );

                // Per ogni figlio, trova ricorsivamente i suoi discendenti
                childConnections.forEach((conn) => {
                    findDescendants(conn.toId);
                });
            };

            // Inizia la ricerca dei discendenti
            findDescendants(nodeId);

            // Filtra i nodi e le connessioni da mantenere
            const filteredNodes = canvasData.nodes.filter((node) => !nodesToDelete.has(node.id));
            const filteredConnections = canvasData.connections.filter(
                (conn) => !nodesToDelete.has(conn.fromId) && !nodesToDelete.has(conn.toId)
            );

            // Aggiorna il canvas
            setCanvasData({
                ...canvasData,
                nodes: filteredNodes,
                connections: filteredConnections,
            });

            // Se il nodo selezionato è stato eliminato, deselezionalo
            if (selectedNodeId && nodesToDelete.has(selectedNodeId)) {
                onNodeSelect(null);
            }
        } else {
            // Eliminazione semplice (solo il nodo specificato)
            const filteredNodes = canvasData.nodes.filter((node) => node.id !== nodeId);

            // Rimuovi anche le connessioni che coinvolgono questo nodo
            const filteredConnections = canvasData.connections.filter(
                (conn) => conn.fromId !== nodeId && conn.toId !== nodeId
            );

            // Aggiorna il canvas
            setCanvasData({
                ...canvasData,
                nodes: filteredNodes,
                connections: filteredConnections,
            });

            // Se il nodo selezionato è stato eliminato, deselezionalo
            if (selectedNodeId === nodeId) {
                onNodeSelect(null);
            }
        }
    };

    // Handler per la selezione del nodo
    const handleNodeSelect = (nodeId) => {
        if (onNodeSelect) {
            onNodeSelect(nodeId);
        }
    };

    // Handler per la selezione dell'annotazione
    const handleAnnotationSelect = (annotationId) => {
        if (onAnnotationSelect) {
            onAnnotationSelect(annotationId);
        }
    };

    // Click sul canvas deseleziona tutto
    const handleCanvasClick = (e) => {
        if (e.target === canvasRef.current) {
            if (selectedNodeId && onNodeSelect) {
                onNodeSelect(null);
            }
            if (selectedAnnotationId && onAnnotationSelect) {
                onAnnotationSelect(null);
            }
        }
    };

    // Gestione stato di trascinamento nodo
    const handleNodeDragStart = () => {
        setIsDraggingNode(true);
    };

    const handleNodeDragEnd = () => {
        setIsDraggingNode(false);
    };

    // Gestione stato di trascinamento annotazione
    const handleAnnotationDragStart = () => {
        setIsDraggingAnnotation(true);
    };

    const handleAnnotationDragEnd = () => {
        setIsDraggingAnnotation(false);
    };

    // Gestione dello spostamento del canvas
    const handleCanvasMouseDown = (e) => {
        // Se stiamo trascinando un elemento o l'evento non è sul canvas, non fare nulla
        if (isDraggingNode || isDraggingAnnotation || e.target !== canvasRef.current) return;

        setIsDraggingCanvas(true);
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    };

    const handleCanvasMouseMove = (e) => {
        if (!isDraggingCanvas) return;

        const dx = e.clientX - lastMousePosition.current.x;
        const dy = e.clientY - lastMousePosition.current.y;

        setCanvasPosition((prev) => ({
            x: prev.x + dx,
            y: prev.y + dy,
        }));

        lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleCanvasMouseUp = () => {
        setIsDraggingCanvas(false);
    };

    // Gestione dello scroll con la rotella del mouse
    const handleWheel = (e) => {
        if (isDraggingNode || isDraggingAnnotation) return;

        // Previene il comportamento di default dello scroll
        e.preventDefault();

        // Aggiorna la posizione del canvas in base alla direzione dello scroll
        setCanvasPosition((prev) => ({
            x: prev.x - e.deltaX,
            y: prev.y - e.deltaY,
        }));
    };

    // Aggiungi gestori eventi per il movimento del canvas
    useEffect(() => {
        if (isDraggingCanvas) {
            window.addEventListener('mousemove', handleCanvasMouseMove);
            window.addEventListener('mouseup', handleCanvasMouseUp);
        } else {
            window.removeEventListener('mousemove', handleCanvasMouseMove);
            window.removeEventListener('mouseup', handleCanvasMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleCanvasMouseMove);
            window.removeEventListener('mouseup', handleCanvasMouseUp);
        };
    }, [isDraggingCanvas]);

    // Aggiungi gestione per lo scroll con la rotella
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex-1 relative overflow-hidden">
            {/* Background grid fisso che si muove con il canvas */}
            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: `${canvasPosition.x % 20}px ${canvasPosition.y % 20}px`,
                }}
            />

            {/* Canvas trascinabile con dimensioni grandi abbastanza per tutte le connessioni */}
            <div
                ref={canvasRef}
                className="absolute"
                style={{
                    width: '20000px',
                    height: '20000px',
                    left: '-10000px',
                    top: '-10000px',
                    transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`,
                    cursor: isDraggingCanvas ? 'grabbing' : 'grab',
                }}
                onClick={handleCanvasClick}
                onMouseDown={handleCanvasMouseDown}
            >
                {/* Renderizza le connessioni */}
                {canvasData?.connections?.map((connection) => {
                    const fromNode = canvasData.nodes.find((node) => node.id === connection.fromId);
                    const toNode = canvasData.nodes.find((node) => node.id === connection.toId);
                    if (!fromNode || !toNode) return null;

                    return (
                        <Connection
                            key={connection.id}
                            fromNode={{
                                ...fromNode,
                                x: fromNode.x + 10000,
                                y: fromNode.y + 10000,
                            }}
                            toNode={{
                                ...toNode,
                                x: toNode.x + 10000,
                                y: toNode.y + 10000,
                            }}
                            scale={1}
                        />
                    );
                })}

                {/* Renderizza i nodi */}
                {canvasData?.nodes?.map((node) => (
                    <Node
                        key={node.id}
                        node={{
                            ...node,
                            x: node.x + 10000,
                            y: node.y + 10000,
                        }}
                        updateNode={(updatedNode) =>
                            updateNode({
                                ...updatedNode,
                                x: updatedNode.x - 10000,
                                y: updatedNode.y - 10000,
                            })
                        }
                        isSelected={node.id === selectedNodeId}
                        onSelect={() => handleNodeSelect(node.id)}
                        onAddChild={handleAddChildNode}
                        onDragStart={handleNodeDragStart}
                        onDragEnd={handleNodeDragEnd}
                        canvasData={canvasData}
                        onGeneratePGN={onGeneratePGN}
                        onDeleteNode={handleDeleteNode} // NUOVA PROP: passa la funzione di eliminazione
                    />
                ))}

                {/* Renderizza le annotazioni */}
                {canvasData?.annotations?.map((annotation) => (
                    <Annotation
                        key={annotation.id}
                        annotation={{
                            ...annotation,
                            x: annotation.x + 10000,
                            y: annotation.y + 10000,
                        }}
                        updateAnnotation={(updatedAnnotation) =>
                            updateAnnotation({
                                ...updatedAnnotation,
                                x: updatedAnnotation.x - 10000,
                                y: updatedAnnotation.y - 10000,
                            })
                        }
                        isSelected={annotation.id === selectedAnnotationId}
                        onSelect={() => handleAnnotationSelect(annotation.id)}
                        onDragStart={handleAnnotationDragStart}
                        onDragEnd={handleAnnotationDragEnd}
                    />
                ))}
            </div>
        </div>
    );
};

Canvas.propTypes = {
    canvasData: PropTypes.shape({
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
                label: PropTypes.string,
                description: PropTypes.string,
                onGeneratePGN: PropTypes.func,
            })
        ),
        connections: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                fromId: PropTypes.number.isRequired,
                toId: PropTypes.number.isRequired,
            })
        ),
        annotations: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired,
                text: PropTypes.string,
            })
        ),
    }).isRequired,
    setCanvasData: PropTypes.func.isRequired,
    onNodeSelect: PropTypes.func,
    selectedNodeId: PropTypes.number,
    onAnnotationSelect: PropTypes.func,
    selectedAnnotationId: PropTypes.number,
    updateAnnotation: PropTypes.func,
    onGeneratePGN: PropTypes.func,
};

export default Canvas;
