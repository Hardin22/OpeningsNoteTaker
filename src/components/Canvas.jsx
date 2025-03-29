import React, { useEffect, useRef, useState, useCallback } from 'react';
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
    const lastTouchPosition = useRef({ x: 0, y: 0 });
    const touchStartTime = useRef(0);
    const [pinchStartDistance, setPinchStartDistance] = useState(null);
    const [initialZoom, setInitialZoom] = useState(1);

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
        }, 15000);
        return () => clearInterval(interval);
    }, [canvasData]);

    // Esporta i dati del canvas come file JSON
    const exportCanvasToFile = useCallback(() => {
        const leafNodes = canvasData.nodes.filter(
            (node) => !canvasData.connections.some((conn) => conn.fromId === node.id)
        );
        const fullLines = leafNodes
            .map((node) => node.pgn)
            .filter((pgn) => pgn && pgn.trim() !== '');
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
    }, [canvasData]);

    // Funzione per aggiornare un nodo
    const updateNode = useCallback((updatedNode) => {
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
    }, [canvasData, selectedNodeId, onGeneratePGN, setCanvasData]);

    // Funzione per validare l'aggiornamento di un nodo
    const validateNodeUpdate = useCallback((updatedNode) => {
        if (!updatedNode.label || updatedNode.label.trim() === '') return true;
        return isValidChessMove(
            updatedNode.label,
            canvasData.nodes,
            canvasData.connections,
            updatedNode.id
        );
    }, [canvasData]);

    // Funzione per aggiungere un nodo figlio
    const handleAddChildNode = useCallback((parentId) => {
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
    }, [canvasData, onNodeSelect, setCanvasData]);

    // Riorganizza i nodi automaticamente
    const handleReorganizeNodes = useCallback(() => {
        const updatedCanvasData = reorganizeCanvasNodes(canvasData);
        setCanvasData(updatedCanvasData);
    }, [canvasData, setCanvasData]);

    // Funzione per eliminare un nodo (con o senza figli)
    const handleDeleteNode = useCallback((nodeId, isRecursive) => {
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
    }, [canvasData, selectedNodeId, onNodeSelect, setCanvasData]);

    // Handler per la selezione di nodi e annotazioni
    const handleNodeSelect = useCallback((nodeId) => {
        if (onNodeSelect) {
            onNodeSelect(nodeId);
        }
    }, [onNodeSelect]);

    const handleAnnotationSelect = useCallback((annotationId) => {
        if (onAnnotationSelect) {
            onAnnotationSelect(annotationId);
        }
    }, [onAnnotationSelect]);

    // Click sul canvas deseleziona tutto
    const handleCanvasClick = useCallback((e) => {
        if (e.target === canvasRef.current) {
            if (selectedNodeId && onNodeSelect) {
                onNodeSelect(null);
            }
            if (selectedAnnotationId && onAnnotationSelect) {
                onAnnotationSelect(null);
            }
        }
    }, [selectedNodeId, selectedAnnotationId, onNodeSelect, onAnnotationSelect]);

    // Gestione dello stato di trascinamento
    const handleNodeDragStart = useCallback(() => {
        setIsDraggingNode(true);
    }, []);

    const handleNodeDragEnd = useCallback(() => {
        setIsDraggingNode(false);
    }, []);

    const handleAnnotationDragStart = useCallback(() => {
        setIsDraggingAnnotation(true);
    }, []);

    const handleAnnotationDragEnd = useCallback(() => {
        setIsDraggingAnnotation(false);
    }, []);

    // Eliminazione di un'annotazione
    const handleDeleteAnnotation = useCallback((annotationId) => {
        if (!annotationId || !canvasData) return;
        if (window.confirm('Sei sicuro di voler eliminare questa annotazione?')) {
            setCanvasData({
                ...canvasData,
                annotations: canvasData.annotations.filter((ann) => ann.id !== annotationId),
            });
            if (selectedAnnotationId === annotationId && onAnnotationSelect) {
                onAnnotationSelect(null);
            }
        }
    }, [canvasData, selectedAnnotationId, onAnnotationSelect, setCanvasData]);

    // Evento pressione tasto per eliminare annotazione
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '\\') {
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
    }, [selectedAnnotationId, handleDeleteAnnotation]);

    // Gestione spostamento canvas con mouse
    const handleCanvasMouseDown = useCallback((e) => {
        if (isDraggingNode || isDraggingAnnotation || e.target !== canvasRef.current) return;
        setIsDraggingCanvas(true);
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    }, [isDraggingNode, isDraggingAnnotation]);

    const handleCanvasMouseMove = useCallback((e) => {
        if (!isDraggingCanvas) return;
        const dx = e.clientX - lastMousePosition.current.x;
        const dy = e.clientY - lastMousePosition.current.y;
        setCanvasPosition((prev) => ({
            x: prev.x + dx,
            y: prev.y + dy,
        }));
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }, [isDraggingCanvas]);

    const handleCanvasMouseUp = useCallback(() => {
        setIsDraggingCanvas(false);
    }, []);

    // Gestione evento wheel (scroll)
    const handleWheel = useCallback((e) => {
        if (isDraggingNode || isDraggingAnnotation) return;
        e.preventDefault();
        setCanvasPosition((prev) => ({
            x: prev.x - e.deltaX,
            y: prev.y - e.deltaY,
        }));
    }, [isDraggingNode, isDraggingAnnotation]);

    // TOUCH SUPPORT - Gestione eventi touch per dispositivi mobili
    const handleTouchStart = useCallback((e) => {
        if (e.target !== canvasRef.current) return;
        touchStartTime.current = Date.now();
        
        if (e.touches.length === 1) {
            // Single touch - panning
            setIsDraggingCanvas(true);
            const touch = e.touches[0];
            lastTouchPosition.current = { x: touch.clientX, y: touch.clientY };
        } else if (e.touches.length === 2) {
            // Pinch to zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            setPinchStartDistance(distance);
            setInitialZoom(zoom);
        }
        e.preventDefault();
    }, [zoom]);

    const handleTouchMove = useCallback((e) => {
        e.preventDefault();
        if (e.touches.length === 1 && isDraggingCanvas) {
            // Handle panning
            const touch = e.touches[0];
            const dx = touch.clientX - lastTouchPosition.current.x;
            const dy = touch.clientY - lastTouchPosition.current.y;
            setCanvasPosition((prev) => ({
                x: prev.x + dx,
                y: prev.y + dy,
            }));
            lastTouchPosition.current = { x: touch.clientX, y: touch.clientY };
        } else if (e.touches.length === 2 && pinchStartDistance !== null) {
            // Handle pinch zooming
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            const scale = distance / pinchStartDistance;
            const newZoom = Math.max(0.3, Math.min(2, initialZoom * scale));
            setZoom(newZoom);
        }
    }, [isDraggingCanvas, pinchStartDistance, initialZoom]);

    const handleTouchEnd = useCallback((e) => {
        // Check if it was a tap (quick touch)
        const touchDuration = Date.now() - touchStartTime.current;
        if (touchDuration < 200 && e.touches.length === 0 && e.target === canvasRef.current) {
            // This was a tap, deselect items
            if (selectedNodeId && onNodeSelect) {
                onNodeSelect(null);
            }
            if (selectedAnnotationId && onAnnotationSelect) {
                onAnnotationSelect(null);
            }
        }
        
        setIsDraggingCanvas(false);
        setPinchStartDistance(null);
    }, [selectedNodeId, selectedAnnotationId, onNodeSelect, onAnnotationSelect]);

    // Imposta gli event listener
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
    }, [isDraggingCanvas, handleCanvasMouseMove, handleCanvasMouseUp]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            
            // Aggiungi gestori di eventi touch
            container.addEventListener('touchstart', handleTouchStart, { passive: false });
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('touchcancel', handleTouchEnd);
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
                container.removeEventListener('touchcancel', handleTouchEnd);
            }
        };
    }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

    // Limita il zoom a valori ragionevoli
    const limitedZoom = Math.max(0.3, Math.min(2, zoom));

    return (
        <div ref={containerRef} className="w-full h-full flex-1 relative overflow-hidden">
            {/* Pattern griglia sfondo */}
            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: `${canvasPosition.x % 20}px ${canvasPosition.y % 20}px`,
                }}
            />

            {/* Pulsante esporta in alto a destra */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={exportCanvasToFile}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md shadow-lg focus:outline-none flex items-center justify-center"
                    title="Esporta JSON"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                    </svg>
                    <span className="hidden sm:inline">Esporta JSON</span>
                </button>
            </div>

            {/* Canvas principale */}
            <div
                ref={canvasRef}
                className="absolute"
                style={{
                    width: '20000px',
                    height: '20000px',
                    left: '-10000px',
                    top: '-10000px',
                    transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${limitedZoom})`,
                    cursor: isDraggingCanvas ? 'grabbing' : 'grab',
                    transformOrigin: 'center center',
                }}
                onClick={handleCanvasClick}
                onMouseDown={handleCanvasMouseDown}
            >
                {/* Connessioni, nodi e annotazioni (invariati) */}
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
                            scale={limitedZoom}
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

            {/* Barra dei controlli unificata in basso a destra */}
            <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2">
                {/* Pulsante scorciatoie - nascosto su mobile */}
                <div className="relative group  md:block">
                    <button
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none flex items-center justify-center"
                        title="Scorciatoie"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                        </svg>
                    </button>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full right-0 mb-2 bg-black/70 text-white text-sm p-3 rounded min-w-[200px] whitespace-pre-line z-50">
                        <p className="font-semibold mb-1">Scorciatoie:</p>
                        <p>9: aggiungi Nodo</p>
                        <p>x: elimina Nodo</p>
                        <p>\: elimina Nodo con figli</p>
                    </div>
                </div>

                {/* Pulsante riorganizza - visibile anche su mobile */}
                <button
                    onClick={handleReorganizeNodes}
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none flex items-center justify-center"
                    title="Riorganizza Nodi"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                </button>

                {/* Pulsanti zoom - nascosti su mobile */}
                <button
                    onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.3))}
                    className="hidden md:flex w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none items-center justify-center"
                    title="Zoom out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
                    className="hidden md:flex w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-md shadow-lg focus:outline-none items-center justify-center"
                    title="Zoom in"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
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