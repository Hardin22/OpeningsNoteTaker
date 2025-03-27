import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import Connection from './Connection';
import Annotation from './Annotation';
import { reorganizeCanvasNodes } from '../utils/layoutUtils';
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
    const containerRef = useRef(null);
    const [isDraggingNode, setIsDraggingNode] = useState(false);
    const [isDraggingAnnotation, setIsDraggingAnnotation] = useState(false);
    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const lastMousePosition = useRef({ x: 0, y: 0 });

    // All'avvio carichiamo i dati salvati da localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('canvasData');
        if (savedData) {
            setCanvasData(JSON.parse(savedData));
        }
    }, [setCanvasData]);

    // Auto-salvataggio ogni 15 secondi su localStorage
    useEffect(() => {
        const interval = setInterval(() => {
            const leafNodes = canvasData.nodes.filter(
                (node) => !canvasData.connections.some((conn) => conn.fromId === node.id)
            );

            const fullLines = leafNodes
                .map((node) => node.pgn)
                .filter((pgn) => pgn && pgn.trim() !== '');

            const dataToSave = {
                ...canvasData,
                fullLines: fullLines,
            };

            localStorage.setItem('canvasData', JSON.stringify(dataToSave));
            console.log('Dati salvati con fullLines nel localStorage');
        }, 15000);
        return () => clearInterval(interval);
    }, [canvasData]); // Aggiungi canvasData come dipendenza

    // Funzione per esportare i dati del canvas e scaricarli come file JSON
    // Modifica alla funzione exportCanvasToFile
    const exportCanvasToFile = () => {
        // Identifica i nodi foglia (senza figli)
        const leafNodes = canvasData.nodes.filter(
            (node) => !canvasData.connections.some((conn) => conn.fromId === node.id)
        );

        // Estrae i PGN validi dai nodi foglia
        const fullLines = leafNodes
            .map((node) => node.pgn)
            .filter((pgn) => pgn && pgn.trim() !== '');

        // Crea l'oggetto dati con le full lines
        const exportData = {
            ...canvasData,
            fullLines: fullLines,
        };

        const jsonData = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'canvasData.json';
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    };

    // Funzione per aggiornare un nodo
    const updateNode = (updatedNode) => {
        const originalNode = canvasData.nodes.find((n) => n.id === updatedNode.id);

        if (
            updatedNode.label !== originalNode?.label &&
            updatedNode.label &&
            updatedNode.label.trim() !== ''
        ) {
            const isValid = validateNodeUpdate(updatedNode);
            if (!isValid) {
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
            updatedNode.fenPosition = calculateFenPosition(
                canvasData.nodes,
                canvasData.connections,
                updatedNode.id
            );
        }

        setCanvasData((prev) => ({
            ...prev,
            nodes: prev.nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)),
        }));

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
        if (!updatedNode.label || updatedNode.label.trim() === '') return true;
        return isValidChessMove(
            updatedNode.label,
            canvasData.nodes,
            canvasData.connections,
            updatedNode.id
        );
    };

    // Funzione per aggiungere un nodo figlio
    const handleAddChildNode = (parentId) => {
        const parentNode = canvasData.nodes.find((node) => node.id === parentId);
        if (!parentNode) return;
        const childNode = {
            id: Date.now(),
            x: parentNode.x + 150,
            y: parentNode.y + 50,
            label: '',
            description: '',
            parentId: parentId,
        };
        const newConnection = {
            id: `${parentId}-${childNode.id}`,
            fromId: parentId,
            toId: childNode.id,
        };
        setCanvasData((prev) => ({
            ...prev,
            nodes: [...prev.nodes, childNode],
            connections: [...(prev.connections || []), newConnection],
        }));
        if (onNodeSelect) onNodeSelect(childNode.id);
    };
    const handleReorganizeNodes = () => {
        const updatedCanvasData = reorganizeCanvasNodes(canvasData);
        setCanvasData(updatedCanvasData);
    };

    // Funzione per eliminare un nodo (con o senza figli)
    const handleDeleteNode = (nodeId, isRecursive) => {
        if (!nodeId || !canvasData) return;

        if (isRecursive) {
            const nodesToDelete = new Set();
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
            const filteredNodes = canvasData.nodes.filter((node) => !nodesToDelete.has(node.id));
            const filteredConnections = canvasData.connections.filter(
                (conn) => !nodesToDelete.has(conn.fromId) && !nodesToDelete.has(conn.toId)
            );
            setCanvasData({
                ...canvasData,
                nodes: filteredNodes,
                connections: filteredConnections,
            });
            if (selectedNodeId && nodesToDelete.has(selectedNodeId)) {
                onNodeSelect(null);
            }
        } else {
            const filteredNodes = canvasData.nodes.filter((node) => node.id !== nodeId);
            const filteredConnections = canvasData.connections.filter(
                (conn) => conn.fromId !== nodeId && conn.toId !== nodeId
            );
            setCanvasData({
                ...canvasData,
                nodes: filteredNodes,
                connections: filteredConnections,
            });
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

    // Gestione dello stato di trascinamento del nodo
    const handleNodeDragStart = () => {
        setIsDraggingNode(true);
    };
    const handleNodeDragEnd = () => {
        setIsDraggingNode(false);
    };

    // Gestione dello stato di trascinamento dell'annotazione
    const handleAnnotationDragStart = () => {
        setIsDraggingAnnotation(true);
    };
    const handleAnnotationDragEnd = () => {
        setIsDraggingAnnotation(false);
    };

    // Gestione dello spostamento del canvas
    const handleCanvasMouseDown = (e) => {
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
    const handleDeleteAnnotation = (annotationId) => {
        if (!annotationId || !canvasData) return;

        // Chiedi conferma all'utente
        if (window.confirm('Sei sicuro di voler eliminare questa annotazione?')) {
            // Rimuovi l'annotazione dal canvasData
            setCanvasData({
                ...canvasData,
                annotations: canvasData.annotations.filter((ann) => ann.id !== annotationId),
            });

            // Deseleziona l'annotazione corrente
            if (selectedAnnotationId === annotationId && onAnnotationSelect) {
                onAnnotationSelect(null);
            }
        }
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Intercetta il tasto "\" (backslash)
            if (e.key === '\\') {
                // Se c'è un'annotazione selezionata, eliminala
                if (selectedAnnotationId) {
                    e.preventDefault();
                    handleDeleteAnnotation(selectedAnnotationId);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedAnnotationId, canvasData]);

    // Gestione dello scroll con la rotella del mouse
    const handleWheel = (e) => {
        if (isDraggingNode || isDraggingAnnotation) return;
        e.preventDefault();
        setCanvasPosition((prev) => ({
            x: prev.x - e.deltaX,
            y: prev.y - e.deltaY,
        }));
    };

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
            {/* Pulsante per esportare il canvas */}
            <div className="absolute top-2 right-2 z-50">
                <button
                    onClick={exportCanvasToFile}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                    Esporta JSON
                </button>
            </div>
            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: `${canvasPosition.x % 20}px ${canvasPosition.y % 20}px`,
                }}
            />
            <div className="absolute bottom-4 right-4 group z-50">
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-lg focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="20"
                            fill="currentColor"
                        >
                            ⌘
                        </text>
                    </svg>
                </button>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none absolute bottom-full right-0 mb-2 bg-black/70 text-white text-sm px-6 py-1 rounded min-w-[250px] whitespace-pre-line">
                    Shortcuts:
                    <br />
                    9: aggiungi Nodo
                    <br />
                    x: elimina Nodo
                    <br />
                    \: elimina Nodo con figli
                </div>
            </div>
            {/* Nuovi pulsanti per zoom */}
            <div className="absolute bottom-4 right-20 z-50 flex space-x-1">
                <button
                    onClick={handleReorganizeNodes}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none flex items-center justify-center"
                    title="Riorganizza Nodi"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none flex items-center justify-center"
                >
                    +
                </button>
                <button
                    onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.3))}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none flex items-center justify-center"
                >
                    −
                </button>
            </div>
            <div
                ref={canvasRef}
                className="absolute"
                style={{
                    width: '20000px',
                    height: '20000px',
                    left: '-10000px',
                    top: '-10000px',
                    transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${zoom})`,
                    cursor: isDraggingCanvas ? 'grabbing' : 'grab',
                }}
                onClick={handleCanvasClick}
                onMouseDown={handleCanvasMouseDown}
            >
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
                        onDeleteNode={handleDeleteNode}
                    />
                ))}
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