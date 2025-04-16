import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userRepertoires, setUserRepertoires] = useState([]);
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);

    // Funzione per recuperare i dati dell'utente da Firestore
    const fetchUserData = async (user) => {
        if (!user) return null;

        try {
            // Recupera il documento utente
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // Estrai solo i campi richiesti
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    createdAt: userSnap.data().createdAt || new Date().toISOString(),
                };
                return userData;
            } else {
                // L'utente è nuovo, crea un documento
                const newUserData = {
                    uid: user.uid,
                    email: user.email,
                    createdAt: new Date().toISOString(),
                };

                await setDoc(userRef, newUserData);
                return newUserData;
            }
        } catch (error) {
            console.error('Errore nel recupero dei dati utente:', error);
            return null;
        }
    };

    // Funzione per recuperare i repertori dell'utente
    const fetchUserRepertoires = async (uid) => {
        if (!uid) return [];

        try {
            const repertoiresRef = collection(db, 'chessRepertoires');
            const q = query(repertoiresRef, where('uid', '==', uid));
            const querySnapshot = await getDocs(q);

            const repertoires = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                // Estrai solo i campi richiesti
                repertoires.push({
                    id: doc.id,
                    title: data.title || '',
                    canvasData: data.canvasData || '',
                    createdAt: data.createdAt || null,
                    updatedAt: data.updatedAt || null,
                    uid: data.uid,
                });
            });

            return repertoires.sort((a, b) => {
                // Ordina per data di aggiornamento (più recenti prima)
                const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(0);
                const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(0);
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Errore nel recupero dei repertori:', error);
            return [];
        }
    };

    // Observer per cambiamenti ai repertori dell'utente
    const setupRepertoireListener = (uid) => {
        // Questa funzione potrebbe implementare un listener in tempo reale
        // Per ora usiamo polling o aggiornamenti manuali
    };

    // Imposta l'effetto per l'autenticazione e il recupero dei dati
    useEffect(() => {
        // Imposta lo stato iniziale di caricamento
        setIsLoadingUserData(true);

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                try {
                    // Recupera dati utente e repertori in parallelo
                    setIsLoadingUserData(true);

                    const [userData, repertoires] = await Promise.all([
                        fetchUserData(user),
                        fetchUserRepertoires(user.uid),
                    ]);

                    setUserData(userData);
                    setUserRepertoires(repertoires);

                    // Configura listener per aggiornamenti (opzionale)
                    setupRepertoireListener(user.uid);

                    console.log('Dati utente caricati con successo:', userData ? 'sì' : 'no');
                    console.log('Repertori trovati:', repertoires.length);
                } catch (error) {
                    console.error('Errore durante il caricamento dei dati:', error);
                } finally {
                    // Finisce lo stato di caricamento
                    setIsLoadingUserData(false);
                    setLoading(false);
                }
            } else {
                // Reset degli stati se l'utente non è autenticato
                setUserData(null);
                setUserRepertoires([]);
                setIsLoadingUserData(false);
                setLoading(false);
            }
        });

        // Pulizia dell'observer
        return () => unsubscribe();
    }, []);

    // Funzione per aggiornare manualmente i repertori
    const refreshRepertoires = async () => {
        if (!currentUser) return;

        setIsLoadingUserData(true);
        try {
            const repertoires = await fetchUserRepertoires(currentUser.uid);
            setUserRepertoires(repertoires);
        } catch (error) {
            console.error("Errore nell'aggiornamento dei repertori:", error);
        } finally {
            setIsLoadingUserData(false);
        }
    };

    // Valore del contesto con tutti i dati necessari
    const value = {
        currentUser,
        userData,
        userRepertoires,
        isLoadingUserData,
        loading,
        refreshRepertoires,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
