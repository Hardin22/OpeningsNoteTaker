import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isValidChessNotation } from '../utils/chessNotation';
import { isValidChessMove, buildMovePath } from '../utils/chessLogic';

const Node = ({
    node,
    updateNode,
    isSelected,
    onSelect,
    onAddChild,
    onDragStart,
    onDragEnd,
    canvasData,
    onGeneratePGN,
    onDeleteNode,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [editValue, setEditValue] = useState(node.label || '');
    const [isValidNotation, setIsValidNotation] = useState(true);
    const [isContextuallyValid, setIsContextuallyValid] = useState(true);
    const nodeRef = useRef(null);
    const inputRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });
    const touchRef = useRef(false);

    // Quando il nodo viene selezionato, genera automaticamente il PGN
    useEffect(() => {
        if (isSelected && onGeneratePGN && canvasData) {
            const movePath = buildMovePath(canvasData.nodes, canvasData.connections, node.id);
            onGeneratePGN(movePath);
        }
    }, [isSelected, node.id, canvasData, onGeneratePGN]);

    // Gestione del drag and drop con mouse
    const handleMouseDown = (e) => {
        if (isEditing) return;

        setIsDragging(true);
        onSelect(); // Seleziona il nodo quando inizia il drag

        // Calcola l'offset del mouse rispetto al nodo
        dragOffset.current = {
            x: e.clientX - node.x,
            y: e.clientY - node.y,
        };

        // Notifica Canvas che inizia il trascinamento
        if (onDragStart) onDragStart();

        // Previeni il comportamento di default e la propagazione
        e.preventDefault();
        e.stopPropagation();
    };

    // Gestione del drag and drop con touch
    const handleTouchStart = (e) => {
        if (isEditing) return;

        touchRef.current = true;
        setIsDragging(true);
        onSelect(); // Seleziona il nodo quando inizia il drag

        const touch = e.touches[0];
        // Calcola l'offset del touch rispetto al nodo
        dragOffset.current = {
            x: touch.clientX - node.x,
            y: touch.clientY - node.y,
        };

        // Notifica Canvas che inizia il trascinamento
        if (onDragStart) onDragStart();

        // Previeni il comportamento di default e la propagazione
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMouseMove = (e) => {
        if (!isDragging || touchRef.current) return;
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        updateNode({
            ...node,
            x: newX,
            y: newY,
        });
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !touchRef.current) return;

        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.current.x;
        const newY = touch.clientY - dragOffset.current.y;

        updateNode({
            ...node,
            x: newX,
            y: newY,
        });

        e.preventDefault();
    };

    const handleMouseUp = () => {
        if (isDragging && !touchRef.current) {
            setIsDragging(false);
            // Notifica Canvas che il trascinamento è terminato
            if (onDragEnd) onDragEnd();
        }
    };

    const handleTouchEnd = () => {
        if (isDragging && touchRef.current) {
            setIsDragging(false);
            touchRef.current = false;
            // Notifica Canvas che il trascinamento è terminato
            if (onDragEnd) onDragEnd();
        }
    };

    // Gestione hover
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Gestione click per modifica testo
    const handleDoubleClick = (e) => {
        setIsEditing(true);
        setIsValidNotation(true); // Reset validazione all'inizio dell'editing
        setIsContextuallyValid(true); // Reset validazione contestuale
        onSelect(); // Seleziona il nodo quando inizia l'editing
        e.stopPropagation();
    };

    const handleClick = (e) => {
        if (!isEditing) {
            onSelect();
            e.stopPropagation(); // Previene la propagazione al canvas
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        // Valida la notazione in tempo reale
        const isValid = value === '' || isValidChessNotation(value);
        setIsValidNotation(isValid);

        // Se la notazione è valida e abbiamo i dati del canvas, verifichiamo anche la validità contestuale
        if (isValid && value && canvasData && value.trim() !== '') {
            // Verifica se la mossa è valida nel contesto attuale
            const isValidInContext = isValidChessMove(
                value,
                canvasData.nodes,
                canvasData.connections,
                node.id
            );
            setIsContextuallyValid(isValidInContext);
        } else {
            setIsContextuallyValid(true); // Reset per mosse vuote o notazioni non valide
        }

        setEditValue(value);
    };

    const handleInputBlur = () => {
        finishEditing();
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            finishEditing();
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    const finishEditing = () => {
        setIsEditing(false);

        // Salva solo se la notazione è valida e (è vuota o è contestualmente valida)
        if (isValidNotation && (editValue === '' || isContextuallyValid)) {
            updateNode({
                ...node,
                label: editValue,
            });
        } else {
            // Reset al valore precedente se non valido
            setEditValue(node.label || '');
            setIsValidNotation(true);
            setIsContextuallyValid(true);
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditValue(node.label || '');
        setIsValidNotation(true);
        setIsContextuallyValid(true);
    };

    // NUOVE FUNZIONI: Utilizzo di confirm() del browser

    // Funzione per eliminare un singolo nodo con conferma browser
    const handleDeleteNode = () => {
        const confirmed = window.confirm(
            `Sei sicuro di voler eliminare il nodo "${node.label || 'senza nome'}"?`
        );
        if (confirmed && onDeleteNode) {
            onDeleteNode(node.id, false); // false = non ricorsivo
        }
    };

    // Funzione per eliminazione ricorsiva con conferma browser
    const handleRecursiveDelete = () => {
        const confirmed = window.confirm(
            `ATTENZIONE! Stai per eliminare il nodo "${
                node.label || 'senza nome'
            }" e TUTTI I SUOI NODI FIGLI.\n\nQuesta azione non può essere annullata. Vuoi procedere?`
        );
        if (confirmed && onDeleteNode) {
            onDeleteNode(node.id, true); // true = eliminazione ricorsiva
        }
    };

    // Aggiunta e rimozione dei listener globali per il drag
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
            window.addEventListener('touchcancel', handleTouchEnd);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [isDragging]);

    // Listener per i tasti '9', 'x' e '\'
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isSelected || isEditing) return;

            // Aggiunta nodo figlio con '9'
            if (e.key === '9') {
                e.preventDefault();
                onAddChild(node.id);
            }

            // Eliminazione semplice con 'x'
            if (e.key === 'x') {
                e.preventDefault();
                handleDeleteNode(); // Usa direttamente il confirm del browser
            }

            // Eliminazione ricorsiva con '\'
            if (e.key === '\\') {
                e.preventDefault();
                handleRecursiveDelete(); // Usa direttamente il confirm del browser
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSelected, node.id, onAddChild, isEditing, onDeleteNode]);

    // Auto-focus sull'input quando entra in modalità editing
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    // Determinazione dello stile del nodo in base allo stato
    let nodeStyle = {
        left: node.x,
        top: node.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isSelected || isDragging ? 10 : 1,
        boxShadow:
            isHovered || isSelected
                ? '0 8px 16px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.5)'
                : '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        userSelect: 'none', // Previene la selezione del testo
        WebkitUserSelect: 'none', // Per Safari
        MozUserSelect: 'none', // Per Firefox
        msUserSelect: 'none', // Per IE/Edge
    };

    // Determinazione della classe CSS in base allo stato
    let nodeClass = `absolute h-16 w-16 rounded-full flex items-center justify-center 
        transition-all duration-200 backdrop-blur-sm`;

    // Gradienti moderni e colori eleganti
    if (isSelected) {
        nodeClass += ' bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white';
    } else if (isHovered) {
        nodeClass += ' bg-gradient-to-br from-blue-400 to-indigo-600 text-white';
    } else {
        nodeClass += ' bg-slate-700  text-slate-100  border-slate-900';
    }

    // Effetto extra quando si trascina
    if (isDragging) {
        nodeClass += ' scale-105';
        nodeStyle.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.5)';
    }

    return (
        <>
            <div
                ref={nodeRef}
                style={nodeStyle}
                className={nodeClass}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onDoubleClick={handleDoubleClick}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isEditing ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={editValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleInputKeyDown}
                            className={`bg-transparent text-white font-medium text-center w-3/4 outline-none ring-1 ${
                                !isValidNotation
                                    ? 'ring-red-500'
                                    : !isContextuallyValid
                                    ? 'ring-yellow-500'
                                    : 'ring-white/30'
                            } rounded px-1`}
                            placeholder="e4, Nf3..."
                        />
                        {!isValidNotation && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-400 bg-black/70 px-1 py-0.5 rounded whitespace-nowrap">
                                Notazione scacchi non valida
                            </div>
                        )}
                        {isValidNotation && !isContextuallyValid && editValue && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 bg-black/70 px-1 py-0.5 rounded whitespace-nowrap">
                                Mossa non valida in questa posizione
                            </div>
                        )}
                    </div>
                ) : (
                    // Qui inserisci il rendering del nodo in modalità "non editing"
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        {node.label ? (
                            <span className="text-white font-medium text-sm break-words p-1 text-center leading-tight">
                                {node.label}
                            </span>
                        ) : (
                            <span className="text-white/50 text-xs italic p-1">
                                {isHovered ? 'Doppio click per modificare' : ''}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

Node.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        label: PropTypes.string,
        description: PropTypes.string,
        fenPosition: PropTypes.string,
    }).isRequired,
    updateNode: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onAddChild: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    canvasData: PropTypes.object,
    onGeneratePGN: PropTypes.func,
    onDeleteNode: PropTypes.func,
};

Node.defaultProps = {
    isSelected: false,
};

export default Node;
