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
    // Usiamo l'angolo per determinare il punto esatto sul bordo del cerchio
    const fromX = fromCenterX + Math.cos(angle) * nodeRadius;
    const fromY = fromCenterY + Math.sin(angle) * nodeRadius;
    const toX = toCenterX + Math.cos(reverseAngle) * nodeRadius;
    const toY = toCenterY + Math.sin(reverseAngle) * nodeRadius;

    // Calcola la distanza tra i punti di connessione
    const dx = toX - fromX;
    const dy = toY - fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calcola due punti di controllo per la curva Bezier cubica
    // La posizione di questi punti determina la forma della curva
    let controlPoint1, controlPoint2;

    // Calcola quadrante relativo (NE, SE, SW, NW)
    const quadrant = getQuadrant(toCenterX - fromCenterX, toCenterY - fromCenterY);

    // Calcola distanza di controllo - più grande per connessioni più lunghe
    const controlDistance = Math.min(distance * 0.5, 150);

    // Posiziona i punti di controllo in base al quadrante
    switch (quadrant) {
        case 'NE': // Nord-Est
            // Se il nodo figlio è a NE, la curva esce verso destra dal padre e entra da sinistra nel figlio
            controlPoint1 = {
                x: fromX + controlDistance,
                y: fromY,
            };
            controlPoint2 = {
                x: toX - controlDistance * 0.8,
                y: toY,
            };
            break;
        case 'SE': // Sud-Est
            // Se il nodo figlio è a SE, la curva esce verso il basso dal padre e entra da sopra nel figlio
            controlPoint1 = {
                x: fromX,
                y: fromY + controlDistance,
            };
            controlPoint2 = {
                x: toX,
                y: toY - controlDistance * 0.8,
            };
            break;
        case 'SW': // Sud-Ovest
            // Se il nodo figlio è a SW, la curva esce verso sinistra dal padre e entra da destra nel figlio
            controlPoint1 = {
                x: fromX - controlDistance,
                y: fromY,
            };
            controlPoint2 = {
                x: toX + controlDistance * 0.8,
                y: toY,
            };
            break;
        case 'NW': // Nord-Ovest
            // Se il nodo figlio è a NW, la curva esce verso l'alto dal padre e entra da sotto nel figlio
            controlPoint1 = {
                x: fromX,
                y: fromY - controlDistance,
            };
            controlPoint2 = {
                x: toX,
                y: toY + controlDistance * 0.8,
            };
            break;
        default:
            // Fallback per casi particolari
            controlPoint1 = {
                x: fromX + dx * 0.25,
                y: fromY + dy * 0.25,
            };
            controlPoint2 = {
                x: fromX + dx * 0.75,
                y: fromY + dy * 0.75,
            };
    }

    // Per una curva Bezier cubica, definiamo il percorso con due punti di controllo
    const path = `M ${fromX} ${fromY} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${toX} ${toY}`;

    // Spessore della linea che si adatta allo zoom
    const strokeWidth = Math.max(1.5, 3 / scale);

    // Funzione per determinare il quadrante in base alle coordinate relative
    function getQuadrant(dx, dy) {
        if (dx >= 0 && dy <= 0) return 'NE';
        if (dx >= 0 && dy > 0) return 'SE';
        if (dx < 0 && dy > 0) return 'SW';
        if (dx < 0 && dy <= 0) return 'NW';
        return 'NE'; // default
    }

    // ID univoco per il gradiente per evitare conflitti
    const gradientId = `connGradient-${fromNode.x}-${fromNode.y}-${toNode.x}-${toNode.y}`;

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
    }).isRequired,
    toNode: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        isNew: PropTypes.bool,
    }).isRequired,
    scale: PropTypes.number,
};

export default Connection;
