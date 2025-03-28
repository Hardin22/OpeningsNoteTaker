import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Annotation = ({
    annotation,
    updateAnnotation,
    isSelected,
    onSelect,
    onDragStart,
    onDragEnd,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [editValue, setEditValue] = useState(annotation.text || '');
    const annotationRef = useRef(null);
    const contentRef = useRef(null);
    const textareaRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 });

    // Calcola la dimensione responsive del testo in base alle dimensioni dell'annotazione
    const calculateFontSize = () => {
        const { width, height } = annotation;
        const minFontSize = 8;
        const maxFontSize = 16;
        const referenceWidth = 400;
        const referenceHeight = 250;
        const widthFactor = Math.min(1, width / referenceWidth);
        const heightFactor = Math.min(1, height / referenceHeight);
        const scaleFactor =
            Math.min(widthFactor, heightFactor) * 0.7 + Math.max(widthFactor, heightFactor) * 0.3;
        return `${Math.max(
            minFontSize,
            Math.round((minFontSize + (maxFontSize - minFontSize) * scaleFactor) * 2) / 2
        )}px`;
    };

    const fontSize = calculateFontSize();

    const finishEditing = useCallback(() => {
        if (!isEditing) return;
        setIsEditing(false);
        updateAnnotation({
            ...annotation,
            text: editValue,
        });
    }, [isEditing, annotation, editValue, updateAnnotation]);

    useEffect(() => {
        if (!isSelected && isEditing) {
            finishEditing();
        }
    }, [isSelected, isEditing, finishEditing]);

    const handleMouseDown = (e) => {
        if (isEditing || isResizing || e.target.classList.contains('resize-handle')) return;
        setIsDragging(true);
        onSelect();
        dragOffset.current = {
            x: e.clientX - annotation.x,
            y: e.clientY - annotation.y,
        };
        if (onDragStart) onDragStart();
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - dragOffset.current.x;
            const newY = e.clientY - dragOffset.current.y;
            updateAnnotation({
                ...annotation,
                x: newX,
                y: newY,
            });
        } else if (isResizing) {
            const dx = e.clientX - resizeStart.current.x;
            const dy = e.clientY - resizeStart.current.y;
            updateAnnotation({
                ...annotation,
                width: Math.max(100, resizeStart.current.width + dx),
                height: Math.max(50, resizeStart.current.height + dy),
            });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            if (onDragEnd) onDragEnd();
        }
        if (isResizing) {
            setIsResizing(false);
        }
    };

    const handleResizeStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        resizeStart.current = {
            width: annotation.width,
            height: annotation.height,
            x: e.clientX,
            y: e.clientY,
        };
        onSelect();
    };

    const handleDoubleClick = (e) => {
        if (isResizing) return;
        setIsEditing(true);
        onSelect();
        e.stopPropagation();
    };

    const handleClick = (e) => {
        if (!isEditing && !isResizing) {
            onSelect();
            e.stopPropagation();
        }
    };

    const handleTextareaChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleTextareaBlur = () => {
        finishEditing();
    };

    const handleTextareaKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            return;
        }
        if (e.key === 'Enter' && !e.ctrlKey) {
            e.preventDefault();
            finishEditing();
            return;
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setEditValue(annotation.text || '');
            e.preventDefault();
        }
    };

    // Gestione hover per lo scrolling
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Gestione dello scrolling nel contenuto dell'annotazione
    const handleWheel = (e) => {
        if (!contentRef.current) return;

        e.stopPropagation();
        e.preventDefault();

        // Imposta lo scroll del contenuto anziché del canvas
        contentRef.current.scrollTop += e.deltaY;

        // Se c'è uno scroll orizzontale, gestiscilo anche
        if (Math.abs(e.deltaX) > 0) {
            contentRef.current.scrollLeft += e.deltaX;
        }
    };

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (isEditing && annotationRef.current && !annotationRef.current.contains(e.target)) {
                finishEditing();
            }
        };
        if (isEditing) {
            document.addEventListener('mousedown', handleDocumentClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [isEditing, finishEditing]);

    useEffect(() => {
        if (isDragging || isResizing) {
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
    }, [isDragging, isResizing]);

    // Aggiunge gestione dello scroll sull'annotazione quando è hover o selezionata
    useEffect(() => {
        const element = annotationRef.current;
        if (element && (isHovered || isSelected)) {
            element.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (element) {
                element.removeEventListener('wheel', handleWheel);
            }
        };
    }, [isHovered, isSelected]);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing]);
    const handleTouchStart = (e) => {
        if (isEditing || isResizing || e.target.classList.contains('resize-handle')) return;
        setIsDragging(true);
        onSelect();

        const touch = e.touches[0];
        dragOffset.current = {
            x: touch.clientX - annotation.x,
            y: touch.clientY - annotation.y,
        };
        if (onDragStart) onDragStart();
        e.preventDefault();
        e.stopPropagation();
    };

    // Aggiungi handleTouchMove
    const handleTouchMove = (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            const newX = touch.clientX - dragOffset.current.x;
            const newY = touch.clientY - dragOffset.current.y;
            updateAnnotation({
                ...annotation,
                x: newX,
                y: newY,
            });
        } else if (isResizing) {
            const touch = e.touches[0];
            const dx = touch.clientX - resizeStart.current.x;
            const dy = touch.clientY - resizeStart.current.y;
            updateAnnotation({
                ...annotation,
                width: Math.max(100, resizeStart.current.width + dx),
                height: Math.max(50, resizeStart.current.height + dy),
            });
        }
        e.preventDefault();
    };

    // Aggiungi handleTouchEnd
    const handleTouchEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            if (onDragEnd) onDragEnd();
        }
        if (isResizing) {
            setIsResizing(false);
        }
    };

    const annotationClass = `absolute rounded shadow-lg overflow-hidden
        ${isSelected ? 'ring-2 ring-indigo-500 z-10' : 'z-1'}
        ${isDragging ? 'opacity-80 cursor-grabbing' : isEditing ? 'cursor-text' : 'cursor-grab'}
        transition-shadow duration-200`;

    return (
        <div
            ref={annotationRef}
            style={{
                top: annotation.y,
                left: annotation.x,
                width: annotation.width,
                height: annotation.height,
                backgroundColor: isSelected ? 'rgba(67, 56, 202, 0.15)' : 'rgba(75, 85, 99, 0.15)',
                backdropFilter: 'blur(8px)',
            }}
            className={annotationClass}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
        >
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    value={editValue}
                    onChange={handleTextareaChange}
                    onBlur={handleTextareaBlur}
                    onKeyDown={handleTextareaKeyDown}
                    style={{ fontSize }}
                    className="w-full h-full p-3 bg-transparent text-white focus:outline-none resize-none"
                    placeholder="Scrivi qui la tua annotazione..."
                />
            ) : (
                <div
                    ref={contentRef}
                    className="p-3 w-full h-full text-white overflow-auto whitespace-pre-wrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
                    style={{ fontSize }}
                >
                    {annotation.text || (
                        <span className="text-white/50 italic text-sm">
                            Doppio click per aggiungere testo
                        </span>
                    )}
                </div>
            )}
            {isSelected && (
                <div
                    className="resize-handle absolute bottom-0 right-0 w-4 h-4 bg-indigo-500 cursor-nwse-resize z-20"
                    onMouseDown={handleResizeStart}
                />
            )}
        </div>
    );
};

Annotation.propTypes = {
    annotation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        text: PropTypes.string,
    }).isRequired,
    updateAnnotation: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
};

Annotation.defaultProps = {
    isSelected: false,
};

export default Annotation;
