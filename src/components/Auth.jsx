// src/components/Auth.jsx
import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';

const Auth = ({ onClose }) => {
    const [isSignup, setIsSignup] = useState(true);

    const toggleAuth = () => {
        setIsSignup((prev) => !prev);
    };

    return (
        <div>
            {isSignup ? (
                <Signup onClose={onClose} toggle={toggleAuth} />
            ) : (
                <Login onClose={onClose} toggle={toggleAuth} />
            )}
        </div>
    );
};

export default Auth;
