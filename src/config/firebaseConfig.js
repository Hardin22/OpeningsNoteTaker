// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBDdAvwL6tHB3BKYbY9rb2GsTH8yIQZtvg',
    authDomain: 'chessnotes-a9726.firebaseapp.com' ,
    projectId: 'chessnotes-a9726',
    storageBucket: 'chessnotes-a9726.firebasestorage.app',
    messagingSenderId: '881905560245',
    appId: '1:881905560245:web:c89505509f701637522cfc',
    measurementId: 'G-HK33PNXNPR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inizializza l'autenticazione e il provider Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Esporta auth e il provider, così da poterli importare in altri componenti
export { auth, googleProvider };