import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const { login, signup } = useAuth();
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'signup') {
            signup(email, fullName);
        } else {
            login(email);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div 
                            className="modal-content auth-modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-modal-btn" onClick={onClose}>
                                <X size={24} />
                            </button>

                            <div className="auth-modal-header">
                                <h2 className="serif" style={{ fontSize: '36px', marginBottom: '10px' }}>{mode === 'login' ? 'Welcome Back' : 'Join NEBU'}</h2>
                                <p style={{ marginBottom: '40px', opacity: 0.7 }}>{mode === 'login' ? 'Sign in to access your orders' : 'Create an account for exclusive roasts'}</p>
                            </div>

                            <form className="auth-form" onSubmit={handleSubmit}>
                                {mode === 'signup' && (
                                    <div className="input-with-icon">
                                        <User size={18} />
                                        <input 
                                            type="text" 
                                            placeholder="Full Name" 
                                            required 
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div className="input-with-icon">
                                    <Mail size={18} />
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input 
                                        type="password" 
                                        placeholder="Password" 
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                
                                <button type="submit" className="btn btn-primary auth-submit-btn">
                                    {mode === 'login' ? 'Log In' : 'Create Account'}
                                </button>
                            </form>

                            <div className="auth-modal-footer">
                                <p>
                                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                                    <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                                        {mode === 'login' ? 'Sign Up' : 'Log In'}
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
