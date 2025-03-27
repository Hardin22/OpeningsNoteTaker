import React from 'react';
import PropTypes from 'prop-types';

const Connection = ({ fromNode, toNode, scale = 1 }) => {
    // Diametro del nodo
    const nodeSize = 64;
    const nodeRadius = nodeSize / 2;

    // Calcola il centro dei nodi
    const fromCenterX = fromNode.x + nodeRadius;
    const fromCenterY = fromNode.y + nodeRadius;
    const toCenterX = toNode.x + nodeRadius;
    const toCenterY = toNode.y + nodeRadius;

    // Calcola gli angoli di direzione tra i nodi
    const angle = Math.atan2(toCenterY - fromCenterY, toCenterX - fromCenterX);
    const reverseAngle = Math.atan2(fromCenterY - toCenterY, fromCenterX - toCenterX);

    // Calcola i punti sui bordi dei nodi da cui partono le connessioni
    const fromX = fromCenterX + Math.cos(angle) * nodeRadius;
    const fromY = fromCenterY + Math.sin(angle) * nodeRadius;
    const toX = toCenterX + Math.cos(reverseAngle) * nodeRadius;
    const toY = toCenterY + Math.sin(reverseAngle) * nodeRadius;

    // Calcola la distanza tra i punti di connessione
    const dx = toX - fromX;
    const dy = toY - fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Determina se il figlio è quasi direttamente sotto il padre
    const isAlmostVertical = Math.abs(dx) < nodeRadius * 0.75; // Threshold per connessioni verticali

    // Spessore della linea che si adatta allo zoom
    const strokeWidth = Math.max(1.5, 3 / scale);

    // ID univoco per il gradiente per evitare conflitti
    const gradientId = `connGradient-${fromNode.id || fromNode.x}-${toNode.id || toNode.x}`;

    // Per connessioni verticali, usiamo una linea retta
    if (isAlmostVertical && toCenterY > fromCenterY) {
        // Linea retta per nodi allineati verticalmente
        const path = `M ${fromX} ${fromY} L ${toX} ${toY}`;

        return (
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#9F7AEA" />
                        <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Traccia esterna leggera per effetto glow */}
                <path
                    d={path}
                    stroke="rgba(99, 102, 241, 0.2)"
                    strokeWidth={strokeWidth + 4}
                    fill="none"
                    strokeLinecap="round"
                    opacity={0.5}
                    filter="url(#glow)"
                />

                {/* Traccia principale */}
                <path
                    d={path}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.9}
                    strokeDasharray={toNode.isNew ? '8,4' : 'none'}
                />

                {/* Piccola freccia alla fine della connessione */}
                <circle
                    cx={toX}
                    cy={toY}
                    r={strokeWidth * 1.8}
                    fill="#4F46E5"
                    filter="url(#glow)"
                />
            </svg>
        );
    }

    // Per le altre connessioni, usiamo curve Bezier
    // Determina se il nodo figlio è a sinistra o a destra del padre
    const isChildToRight = toCenterX > fromCenterX;
    const isChildBelow = toCenterY > fromCenterY;

    // Calcola distanza di controllo - più grande per connessioni più lunghe
    const controlDistance = Math.min(distance * 0.4, 120);

    // Fattore di curvatura verso l'interno - modificato per andare verso il centro
    const inwardCurveFactor = -0.2; // Valore negativo per andare verso il centro inizialmente

    // Calcola due punti di controllo per la curva Bezier cubica
    let controlPoint1, controlPoint2;

    if (isChildBelow) {
        // Se il figlio è sotto il padre
        if (isChildToRight) {
            // CASO 1: Figlio sotto e a destra - curva verso l'interno inizialmente
            controlPoint1 = {
                x: fromX - controlDistance * 0.2, // Va verso sinistra inizialmente
                y: fromY + controlDistance * 0.5,
            };
            controlPoint2 = {
                x: toX - controlDistance * 0.5,
                y: toY - controlDistance * 0.5,
            };
        } else {
            // CASO 2: Figlio sotto e a sinistra - curva verso l'interno (speculare)
            controlPoint1 = {
                x: fromX + controlDistance * 0.2, // Va verso destra inizialmente
                y: fromY + controlDistance * 0.5,
            };
            controlPoint2 = {
                x: toX + controlDistance * 0.5,
                y: toY - controlDistance * 0.5,
            };
        }
    } else {
        // Se il figlio è sopra il padre (meno comune nel tuo layout)
        if (isChildToRight) {
            // CASO 3: Figlio sopra e a destra
            controlPoint1 = {
                x: fromX - controlDistance * 0.2,
                y: fromY - controlDistance * 0.5,
            };
            controlPoint2 = {
                x: toX - controlDistance * 0.5,
                y: toY + controlDistance * 0.5,
            };
        } else {
            // CASO 4: Figlio sopra e a sinistra
            controlPoint1 = {
                x: fromX + controlDistance * 0.2,
                y: fromY - controlDistance * 0.5,
            };
            controlPoint2 = {
                x: toX + controlDistance * 0.5,
                y: toY + controlDistance * 0.5,
            };
        }
    }

    // Per una curva Bezier cubica, definiamo il percorso con due punti di controllo
    const path = `M ${fromX} ${fromY} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${toX} ${toY}`;

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform={`rotate(${(angle * 180) / Math.PI})`}
                >
                    <stop offset="0%" stopColor="#9F7AEA" />
                    <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Traccia esterna leggera per effetto glow */}
            <path
                d={path}
                stroke="rgba(99, 102, 241, 0.2)"
                strokeWidth={strokeWidth + 4}
                fill="none"
                strokeLinecap="round"
                opacity={0.5}
                filter="url(#glow)"
            />

            {/* Traccia principale */}
            <path
                d={path}
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.9}
                strokeDasharray={toNode.isNew ? '8,4' : 'none'}
            />

            {/* Piccola freccia alla fine della connessione */}
            <circle cx={toX} cy={toY} r={strokeWidth * 1.8} fill="#4F46E5" filter="url(#glow)" />
        </svg>
    );
};

Connection.propTypes = {
    fromNode: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    toNode: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        isNew: PropTypes.bool,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    scale: PropTypes.number,
};

export default Connection;
