import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tutorial from './Tutorial';
const Sidebar = ({
    onAddNode,
    onAddAnnotation,
    selectedNode,
    updateNode,
    currentPGN,
    onOpenChessboard,
    onStartDrillMode,
    setCanvasData,
    onDeleteNode,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const fileInputRef = useRef(null);
    const sidebarRef = useRef(null);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);

    // Gestione dell'altezza dinamica per mobile
    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };

        // Aggiorniamo l'altezza quando la finestra cambia dimensione
        window.addEventListener('resize', handleResize);

        // Aggiorniamo l'altezza anche quando cambia l'orientamento su mobile
        window.addEventListener('orientationchange', handleResize);

        // Setup iniziale
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    const handleDescriptionChange = (e) => {
        selectedNode && updateNode({ ...selectedNode, description: e.target.value });
    };

    const handleDescriptionKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.target.blur();
        }
    };

    const handleRecursiveDelete = () => {
        if (
            selectedNode &&
            window.confirm(
                `⚠️ Eliminare "${
                    selectedNode.label || 'nodo senza nome'
                }" e tutti i figli?\nQuesta azione è irreversibile!`
            )
        ) {
            onDeleteNode(selectedNode.id, true);
        }
    };

    const copyPgnToClipboard = () => {
        if (currentPGN) {
            navigator.clipboard.writeText(currentPGN);
            alert('PGN copiato negli appunti!');
        }
    };

    const formatPGN = (pgn) => pgn?.replace(/\[\w+ ".*?"\]\n/g, '').trim() || '';

    const handleFileImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = ({ target }) => {
            try {
                const data = JSON.parse(target.result);
                setCanvasData(data);
                localStorage.setItem('canvasData', JSON.stringify(data));
                alert('Importazione completata!');
            } catch (error) {
                console.error("Errore durante l'importazione:", error);
                alert("Errore durante l'importazione. Controlla che il file sia un JSON valido.");
            }
            e.target.value = null;
        };

        reader.readAsText(file);
    };

    return (
        <>
            {/* Mobile toggle button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors ${
                    isMobileMenuOpen ? 'hidden' : 'block'
                }`}
            >
                <svg
                    className="w-6 h-6 text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </button>

            {/* Sidebar con altezza dinamica */}
            <div
                ref={sidebarRef}
                style={{ height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px` }}
                className={`${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 fixed md:relative inset-y-0 left-0 z-40 w-72 flex flex-col bg-gray-900 border-r border-gray-800 transition-transform duration-300 ease-in-out`}
            >
                {/* Area scrollabile - contenuto principale */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
                    <div className="border-b border-gray-800 pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/chessnotes.svg"
                                    alt="Chess Notes Logo"
                                    className="w-8 h-8 text-white"
                                    style={{ filter: 'brightness(0) invert(0.9) ' }}
                                />
                                <h2 className="text-xl font-bold text-gray-100">Strumenti</h2>
                            </div>
                            {/* Pulsante di chiusura visibile solo su mobile */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="md:hidden p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={onAddNode}
                                className="group p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all flex flex-col items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                <span className="text-xs font-medium text-gray-300 group-hover:text-gray-100">
                                    Nuovo Nodo
                                </span>
                            </button>

                            <button
                                onClick={onAddAnnotation}
                                className="group p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all flex flex-col items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-400 group-hover:text-blue-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                                <span className="text-xs font-medium text-gray-300 group-hover:text-gray-100">
                                    Annotazione
                                </span>
                            </button>
                        </div>
                    </div>

                    {selectedNode && (
                        <div className="space-y-4">
                            <div className="border-b border-gray-800 pb-4">
                                <h3 className="text-sm font-semibold text-gray-200 mb-3">
                                    Modifica Nodo
                                </h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1 block">
                                            Mossa
                                        </label>
                                        <input
                                            value={selectedNode.label || ''}
                                            readOnly
                                            className="w-full bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-md cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400 mb-1 block">
                                            Descrizione
                                        </label>
                                        <textarea
                                            value={selectedNode.description || ''}
                                            onChange={handleDescriptionChange}
                                            onKeyDown={handleDescriptionKeyDown}
                                            rows={3}
                                            className="w-full bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-md resize-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Scrivi note..."
                                        />
                                    </div>

                                    {selectedNode.fenPosition && (
                                        <div>
                                            <label className="text-xs text-gray-400 mb-1 block">
                                                FEN
                                            </label>
                                            <code className="block p-2 bg-gray-800 text-xs text-gray-400 rounded-md break-all">
                                                {selectedNode.fenPosition}
                                            </code>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {currentPGN && (
                                <div className="border-b border-gray-800 pb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400">PGN</span>
                                        <button
                                            onClick={copyPgnToClipboard}
                                            className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
                                        >
                                            Copia
                                        </button>
                                    </div>
                                    <pre className="p-2 bg-gray-800 text-xs text-gray-400 rounded-md overflow-x-auto">
                                        {formatPGN(currentPGN)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* SEZIONE FISSA CON PULSANTI - non scrollabile */}
                <div className="shrink-0 p-4 border-t border-gray-800 bg-gray-900 space-y-2">
                    <button
                        onClick={onOpenChessboard}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-blue-400 group-hover:text-blue-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                            />
                        </svg>
                        <span className="text-sm">Scacchiera</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={onStartDrillMode}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                            >
                                {/* Bersaglio con cerchi concentrici */}
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="3" />
                                <circle cx="12" cy="12" r="1" fill="currentColor" />

                                {/* Freccia che colpisce il bersaglio */}
                                <line x1="3" y1="3" x2="9.5" y2="9.5" strokeWidth="2" />
                                <path d="M3 3 L1 5 L3 5 L3 7 L5 5 L3 3" fill="currentColor" />
                            </svg>
                            <span className="text-sm">Drill</span>
                        </button>

                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                            <span className="text-sm">Importa</span>
                        </button>
                    </div>

                    {selectedNode && (
                        <button
                            onClick={handleRecursiveDelete}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-800/30 hover:bg-red-800/40 text-red-400 rounded-lg transition-colors border border-red-800/50"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            <span className="text-sm">Elimina Nodo</span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsTutorialOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors mt-2"
                    >
                        <svg
                            className="w-5 h-5 text-amber-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-sm">Aiuto</span>
                    </button>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileImport}
                    accept=".json"
                    className="hidden"
                />
            </div>

            <Tutorial isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
        </>
    );
};

Sidebar.propTypes = {
    onAddNode: PropTypes.func.isRequired,
    onAddAnnotation: PropTypes.func.isRequired,
    selectedNode: PropTypes.object,
    updateNode: PropTypes.func,
    currentPGN: PropTypes.string,
    onOpenChessboard: PropTypes.func,
    onStartDrillMode: PropTypes.func,
    setCanvasData: PropTypes.func.isRequired,
    onDeleteNode: PropTypes.func,
};

export default Sidebar;
