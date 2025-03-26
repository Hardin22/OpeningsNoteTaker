/**
 * Verifica se una stringa è una valida notazione algebrica di scacchi
 * Supporta sia la notazione inglese che italiana
 */
export const isValidChessNotation = (notation) => {
    if (!notation || typeof notation !== 'string') return false;
    
    // Rimuovi spazi e normalize
    notation = notation.trim();
    
    // Caso speciale: arrocco
    if (/^(O-O(-O)?|0-0(-0)?)(\+|#)?$/i.test(notation)) {
        return true; // Arrocco corto (O-O) o lungo (O-O-O)
    }
    
    // Pattern generale per notazione algebrica
    // Inglese: [KQRBNP]?[a-h]?[1-8]?x?[a-h][1-8](=[QRBN])?[+#]?
    // Italiano: [RDTACP]?[a-h]?[1-8]?x?[a-h][1-8](=[DTAC])?[+#]?
    
    // Pezzi in notazione inglese e italiana
    const piecesEN = 'KQRBNP';
    const piecesIT = 'RDTACP';
    
    // Regex per la notazione algebrica completa (sia EN che IT)
    const algebraicRegex = new RegExp(
        // Pezzo opzionale (inglese o italiano)
        `^([${piecesEN}${piecesIT}])?` +
        
        // Colonna di partenza opzionale o riga di partenza opzionale
        `([a-h]|[1-8])?` +
        
        // Colonna e riga specifiche di partenza (es. e2)
        `([a-h][1-8])?` +
        
        // Cattura opzionale
        `(x)?` +
        
        // Destinazione (obbligatoria)
        `([a-h][1-8])` +
        
        // Promozione opzionale
        `(=[${piecesEN}${piecesIT}])?` +
        
        // Scacco o scacco matto opzionale
        `([+#])?$`
    );
    
    // Test base con la regex
    if (!algebraicRegex.test(notation)) {
        return false;
    }
    
    // Verifica che la notazione contiene almeno una coordinata valida
    const hasValidCoordinate = /[a-h][1-8]/.test(notation);
    if (!hasValidCoordinate) {
        return false;
    }
    
    return true;
};

/**
 * Formatta una notazione algebrica per renderla standardizzata
 */
export const formatChessNotation = (notation) => {
    if (!isValidChessNotation(notation)) return notation;
    
    // Standardizzazione da implementare se necessario...
    return notation;
};