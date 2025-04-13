import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import LandingPage from './pages/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/app" element={<App />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </HelmetProvider>
    </React.StrictMode>
);
