// src/components/Signup.jsx
import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebaseConfig';

const Signup = ({ onClose, toggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('Le password non coincidono');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            setMessage(
                'Registrazione completata! Controlla la tua email per confermare il tuo account.'
            );
            if (onClose) {
                setTimeout(() => onClose(), 3000);
            }
        } catch (err) {
            console.error('Errore nella registrazione:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Utente loggato con Google:', result.user);
            setMessage('Accedi effettuato con Google!');
            if (onClose) {
                setTimeout(() => onClose(), 2000);
            }
        } catch (err) {
            console.error("Errore nell'accesso con Google:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white">
            <h2 className="text-2xl font-light mb-6 text-center tracking-wide">
                Unisciti a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-medium">
                    ChessNotes
                </span>
            </h2>

            {error && <div className="mb-4 text-center text-red-400">{error}</div>}
            {message && <div className="mb-4 text-center text-green-400">{message}</div>}

            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 text-sm mb-2 font-light">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-300 text-sm mb-2 font-light"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Inserisci la password"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-gray-300 text-sm mb-2 font-light"
                    >
                        Conferma Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ripeti la password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-glow w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50 font-light"
                    disabled={loading}
                >
                    {loading ? 'Caricamento...' : 'Registrati'}
                </button>
            </form>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="mx-4 text-gray-400 font-light text-sm">Oppure</span>
                <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <button
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 border border-gray-700 font-light"
                disabled={loading}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 48 48"
                >
                    <path
                        fill="#FFC107"
                        d="M43.6 20.4H42V20H24v8h11.3C34.4 32.4 29.8 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.4 0 6.5 1.3 8.9 3.4l6.1-6.1C34.6 5.8 29.2 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.8-.4-4.2z"
                    />
                    <path
                        fill="#FF3D00"
                        d="M6.3 14.7l6.6 4.8C14.2 15.5 18.6 13 24 13c3.4 0 6.5 1.3 8.9 3.4l6.1-6.1C34.6 5.8 29.2 3 24 3 16.3 3 9.4 7.6 6.3 14.7z"
                    />
                    <path
                        fill="#4CAF50"
                        d="M24 45c5.8 0 10.7-2 14.3-5.5l-6.6-5.5C29.4 36 26 37 24 37c-5.5 0-10.2-3.7-11.9-8.6l-6.6 5.1C9.6 41.4 16.2 45 24 45z"
                    />
                    <path
                        fill="#1976D2"
                        d="M43.6 20.4H42V20H24v8h11.3c-1 2.7-2.6 5-4.6 6.6l6.6 5.5C38.5 36.6 42 30.9 42 24c0-1.4-.1-2.8-.4-4.2z"
                    />
                </svg>
                {loading ? 'Caricamento...' : 'Accedi con Google'}
            </button>

            <div className="text-center mt-5">
                <p className="text-sm text-gray-400">
                    Hai già un account?{' '}
                    <button 
                        className="text-blue-400 hover:underline font-light"
                        onClick={toggle}
                    >
                        Accedi
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
