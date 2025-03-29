import React from 'react';

// Importa le immagini dei pezzi
import wk from '../assets/Pieces/wk.png';
import wq from '../assets/Pieces/wq.png';
import wr from '../assets/Pieces/wr.png';
import wb from '../assets/Pieces/wb.png';
import wn from '../assets/Pieces/wn.png';
import wp from '../assets/Pieces/wp.png';
import bk from '../assets/Pieces/bk.png';
import bq from '../assets/Pieces/bq.png';
import br from '../assets/Pieces/br.png';
import bb from '../assets/Pieces/bb.png';
import bn from '../assets/Pieces/bn.png';
import bp from '../assets/Pieces/bp.png';

// Approccio più semplice e affidabile
const createPieceComponent = (imgSrc) => {
    return function PieceComponent({ squareWidth }) {
        return (
            <div
                style={{
                    width: squareWidth,
                    height: squareWidth,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={imgSrc}
                    alt="chess piece"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        // Disabilitiamo solo la selezione del testo e il drag nativo
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        // Importante: NON disabilitiamo i pointer events
                    }}
                    // Preveniamo solo il drag nativo dell'immagine
                    draggable={false}
                    onDragStart={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                />
            </div>
        );
    };
};

// Mappa i pezzi secondo il formato richiesto da react-chessboard
const customPieces = {
    wK: createPieceComponent(wk),
    wQ: createPieceComponent(wq),
    wR: createPieceComponent(wr),
    wB: createPieceComponent(wb),
    wN: createPieceComponent(wn),
    wP: createPieceComponent(wp),
    bK: createPieceComponent(bk),
    bQ: createPieceComponent(bq),
    bR: createPieceComponent(br),
    bB: createPieceComponent(bb),
    bN: createPieceComponent(bn),
    bP: createPieceComponent(bp),
};

export default customPieces;
