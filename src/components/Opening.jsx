import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Opening = ({ repertoire, onSelect, onDelete, onRename, isActive, isLoading }) => {
    const [showActions, setShowActions] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newTitle, setNewTitle] = useState(repertoire.title || 'Apertura senza titolo');

    const handleClick = () => {
        if (!isRenaming && !isLoading) {
            onSelect(repertoire);
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (
            window.confirm(
                `Sei sicuro di voler eliminare "${repertoire.title || 'questa apertura'}"?`
            )
        ) {
            onDelete(repertoire.id);
        }
    };

    const handleRename = (e) => {
        e.stopPropagation();
        setIsRenaming(true);
    };

    const handleRenameSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (newTitle.trim()) {
            onRename(repertoire.id, newTitle.trim());
        }
        setIsRenaming(false);
    };

    const formatDate = (dateField) => {
        if (!dateField) return 'Data non disponibile';

        // Handle Firebase timestamp objects (which have toDate method)
        let date;
        if (dateField.toDate && typeof dateField.toDate === 'function') {
            date = dateField.toDate();
        } else if (typeof dateField === 'string') {
            date = new Date(dateField);
        } else {
            return 'Data non disponibile';
        }

        return date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Get the appropriate date to display (updatedAt or createdAt)
    const displayDate = repertoire.updatedAt || repertoire.createdAt;

    // Aggiungi una classe speciale se questo è il repertorio attivo
    const activeClass = isActive ? 'border-blue-500 bg-gray-750' : 'border-gray-700 bg-gray-800';

    // Cursor class per indicare se il click è disabilitato durante il caricamento
    const cursorClass = isLoading ? 'cursor-wait' : 'cursor-pointer';

    return (
        <div
            className={`mb-2 rounded-lg border ${activeClass} hover:bg-gray-750 transition-colors ${cursorClass} overflow-hidden relative ${
                isLoading === repertoire.id ? 'opacity-70' : ''
            }`}
            onClick={handleClick}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="p-3">
                {isRenaming ? (
                    <form onSubmit={handleRenameSubmit} onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full bg-gray-700 text-white px-2 py-1 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                            onBlur={handleRenameSubmit}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="text-xs text-gray-400 hover:text-gray-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRenaming(false);
                                    setNewTitle(repertoire.title || 'Apertura senza titolo');
                                }}
                            >
                                Annulla
                            </button>
                            <button
                                type="submit"
                                className="text-xs text-blue-400 hover:text-blue-300"
                            >
                                Salva
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <h3 className="text-white font-medium truncate pr-16">
                                {repertoire.title || 'Apertura senza titolo'}
                                {isLoading === repertoire.id && (
                                    <svg
                                        className="inline-block animate-spin ml-2 h-4 w-4 text-blue-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                            </h3>
                            {isActive && (
                                <span className="ml-2 text-xs bg-blue-500/20 border border-blue-500/40 text-blue-300 px-1.5 rounded-full">
                                    Attivo
                                </span>
                            )}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                            Aggiornato: {formatDate(displayDate)}
                        </p>
                    </div>
                )}
            </div>

            {showActions && !isRenaming && !isLoading && (
                <div className="absolute top-2 right-2 flex gap-1">
                    <button
                        onClick={handleRename}
                        className="p-1.5 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                        title="Rinomina"
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 rounded bg-red-900/50 hover:bg-red-800/80 text-red-300 hover:text-red-100 transition-colors"
                        title="Elimina"
                    >
                        <svg
                            className="w-3.5 h-3.5"
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
                    </button>
                </div>
            )}
        </div>
    );
};

Opening.propTypes = {
    repertoire: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        canvasData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        uid: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRename: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    isLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

Opening.defaultProps = {
    isActive: false,
    isLoading: false,
};

export default Opening;
