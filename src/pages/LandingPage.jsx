import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo.svg';
// Import Auth instead of Signup
import Auth from '../components/Auth';

// Fallback logo component
const LogoFallback = () => (
    <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-md text-white font-bold">
        CN
    </div>
);

// Logo component with fallback
const Logo = () => {
    try {
        return <img src={logo} alt="ChessNotes Logo" className="h-10 w-auto" />;
    } catch (e) {
        return <LogoFallback />;
    }
};

// SEO-friendly components
const SEO = () => (
    <Helmet>
        <title>Never Forget Your Openings Again - ChessNotes</title>
        <meta
            name="description"
            content="ChessNotes is a free platform that allows you to organize, analyze, and train your chess openings with a modern design and impactful animations."
        />
        <meta
            name="keywords"
            content="chess, openings, chess strategy, chess training, free, mind mapping, position analysis"
        />
        <meta property="og:title" content="Never Forget Your Openings Again - ChessNotes" />
        <meta
            property="og:description"
            content="Organize your chess openings and improve your game with ChessNotes. Currently free, the platform adapts to players of all levels."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image-new.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://chessnotes.app" />
    </Helmet>
);

const LandingPage = () => {
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        // Imposta il titolo
        document.title = 'Never Forget Your Openings Again - ChessNotes';

        // Rimuovi la classe app-page per assicurarti che lo scrolling funzioni
        document.documentElement.classList.remove('app-page');
    }, []);

    // Function for analytics tracking or additional logic
    const handleGetStarted = () => {
        console.log('Starting application - user entry');
        // Open auth modal when "Start Now" is clicked
        toggleSignup();
    };

    // Toggle signup modal
    const toggleSignup = () => {
        setShowSignup(!showSignup);
    };

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showSignup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showSignup]);

    return (
        <div className="bg-gray-900 text-white overflow-visible relative landing">
            {/* SEO */}
            <SEO />

            {/* Custom animation styles */}
            <style>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                /* Ensure elements are initially invisible */
                .hidden-initial {
                    opacity: 0;
                }
                
                .fadeInUp {
                    animation: fadeInUp 1s ease-out forwards;
                    will-change: opacity, transform;
                }
                
                /* Glow effect only for the "Never" word */
                @keyframes subtleGlow {
                    0%, 100% { text-shadow: 0 0 10px rgba(79, 129, 251, 0.4); }
                    50% { text-shadow: 0 0 20px rgba(79, 129, 251, 0.7); }
                }
                .subtle-glow {
                    animation: subtleGlow 3s infinite alternate;
                }
                
                /* Floating animation for elements */
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .float {
                    animation: float 6s ease-in-out infinite;
                    will-change: transform;
                }
                
                /* Breathing effect for background shapes */
                @keyframes breathe {
                    0%, 100% { transform: scale(1); opacity: 0.25; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                }
                .breathe {
                    animation: breathe 8s ease-in-out infinite;
                    will-change: transform, opacity;
                }
                
                /* Glowing button effect */
                .btn-glow {
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                    transition: all 0.3s ease;
                }
                
                .btn-glow:before {
                    content: '';
                    position: absolute;
                    top: -2px; left: -2px; right: -2px; bottom: -2px;
                    border-radius: 0.5rem;
                    background: linear-gradient(45deg, #4f81fb, #9d61ff);
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .btn-glow:hover:before {
                    opacity: 0.8;
                }
                
                .blur-shape {
                    filter: blur(120px);
                }

                /* Modal animation */
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                .modal-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                .modal-scale-in {
                    animation: scaleIn 0.4s ease-out forwards;
                }
            `}</style>

            {/* Blurred background shapes with reduced opacity */}
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600 opacity-15 blur-shape breathe"></div>
                <div
                    className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600 opacity-10 blur-shape breathe"
                    style={{ animationDelay: '2s' }}
                ></div>
                <div
                    className="absolute top-[30%] left-[10%] w-[25%] h-[25%] rounded-full bg-indigo-500 opacity-8 blur-shape breathe"
                    style={{ animationDelay: '4s' }}
                ></div>
                <div
                    className="absolute bottom-[20%] right-[5%] w-[30%] h-[30%] rounded-full bg-blue-400 opacity-8 blur-shape breathe"
                    style={{ animationDelay: '6s' }}
                ></div>
            </div>

            {/* Header - Navigation text color changed to white */}
            <header className="fixed top-0 left-0 w-full z-50 bg-opacity-70 backdrop-blur-md shadow-md border-b border-gray-800">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="flex items-center space-x-3">
                        <Logo />
                        <h1 className="font-light tracking-wide text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            ChessNotes
                        </h1>
                    </div>
                    <nav>
                        <ul className="flex items-center space-x-8">
                            <li>
                                <a
                                    href="#features"
                                    className="font-light tracking-wide text-white hover:text-blue-400 transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#demo"
                                    className="font-light tracking-wide text-white hover:text-blue-400 transition-colors"
                                >
                                    Demo
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={toggleSignup}
                                    className="font-light tracking-wide btn-glow px-5 py-2 border border-blue-500 text-white hover:border-blue-400 rounded-lg transition-colors"
                                >
                                    Sign In
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section - Centered with improved animations */}
            <section className="pt-32 pb-16 flex flex-col items-center justify-center container mx-auto px-6 min-h-screen relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2
                        className="hidden-initial text-5xl md:text-7xl font-light tracking-wide leading-tight fadeInUp"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-medium subtle-glow">
                            Never
                        </span>{' '}
                        Forget Your Openings Again
                    </h2>
                    <p
                        className="hidden-initial text-xl md:text-2xl text-gray-300 font-light tracking-wide fadeInUp max-w-2xl mx-auto"
                        style={{ animationDelay: '0.4s' }}
                    >
                        The free platform to manage and perfect your chess strategies with
                        cutting-edge design.
                    </p>
                    <div
                        className="hidden-initial flex justify-center space-x-6 fadeInUp"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <button
                            onClick={handleGetStarted}
                            className="btn-glow inline-flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg font-light text-lg tracking-wide shadow-xl transition-all"
                        >
                            Start Now – It's Free
                        </button>
                        <a
                            href="#demo"
                            className="inline-flex items-center justify-center px-8 py-4 border border-gray-700 hover:border-blue-400 rounded-lg font-light text-lg tracking-wide transition-colors"
                        >
                            Watch Demo
                        </a>
                    </div>
                </div>

                <div
                    className="hidden-initial mt-16 w-full max-w-5xl mx-auto relative fadeInUp float"
                    style={{ animationDelay: '0.8s' }}
                >
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                        {/* App preview */}
                        <div className="absolute inset-0 bg-[url('/chess-preview.jpg')] bg-cover bg-center opacity-80"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="px-6 py-3 bg-black bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg text-lg font-light tracking-wider">
                                APP PREVIEW
                            </span>
                        </div>
                        {/* Decorative glow elements */}
                        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl" />
                        <div className="absolute -top-10 -left-10 w-56 h-56 bg-purple-500 opacity-20 rounded-full blur-3xl" />
                    </div>
                </div>
            </section>

            {/* Feature Section */}
            <section
                id="features"
                className="py-24 bg-gray-800 bg-opacity-50 backdrop-blur-sm relative z-10"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-light tracking-wide mb-6">
                            Cutting-Edge Features
                        </h3>
                        <p className="text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
                            Organize, analyze, and perfect your chess openings with interactive mind
                            maps, specific training modules, and advanced analysis tools.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Feature Cards */}
                        {[
                            {
                                icon: (
                                    <i className="fas fa-project-diagram text-5xl text-blue-400"></i>
                                ),
                                title: 'Interactive Mind Maps',
                                description:
                                    'Visualize connections between moves in an intuitive and dynamic interface.',
                            },
                            {
                                icon: (
                                    <i className="fas fa-chess-board text-5xl text-purple-400"></i>
                                ),
                                title: 'Real-Time Analysis',
                                description:
                                    'Deepen your strategies with instant analysis and personalized suggestions.',
                            },
                            {
                                icon: <i className="fas fa-lightbulb text-5xl text-yellow-400"></i>,
                                title: 'Daily Inspiration',
                                description:
                                    'Never miss an important move: receive insights and inspiration for every game.',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="bg-gray-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700 transition-all fadeInUp hover:border-gray-500"
                                style={{ animationDelay: `${0.3 * (i + 1)}s` }}
                            >
                                <div className="mb-6">{feature.icon}</div>
                                <h4 className="text-2xl font-light tracking-wide mb-4">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-300 font-light">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo / Video Section */}
            <section id="demo" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-light tracking-wide">Watch the Demo</h3>
                        <p className="text-gray-300 max-w-xl mx-auto mt-4 font-light tracking-wide">
                            Discover how ChessNotes transforms the way you study the game of chess
                            with an interactive demo.
                        </p>
                    </div>
                    <div className="relative mx-auto max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl">
                        {/* Demo simulation with video/screenshot */}
                        <div className="absolute inset-0 bg-[url('/chess-demo.jpg')] bg-cover bg-center opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                onClick={toggleSignup}
                                className="btn-glow bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-10 py-4 rounded-lg text-xl font-light tracking-wider shadow-xl transition-all"
                            >
                                Try Now – It's Free!
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black bg-opacity-70 backdrop-blur-md border-t border-gray-800 py-16 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-3 mb-6 md:mb-0">
                            <Logo />
                            <span className="font-light tracking-wide text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                ChessNotes
                            </span>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <i className="fab fa-github text-xl"></i>
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <i className="fab fa-discord text-xl"></i>
                            </a>
                        </div>
                    </div>
                    <div className="text-center mt-10 text-gray-500 text-sm border-t border-gray-800 pt-6 font-light">
                        © {new Date().getFullYear()} ChessNotes. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Auth Modal */}
            {showSignup && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 modal-fade-in">
                    {/* Modal backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm"
                        onClick={toggleSignup}
                    ></div>

                    {/* Modal content */}
                    <div className="relative z-10 w-full max-w-md modal-scale-in">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                            {/* Close button */}
                            <button
                                onClick={toggleSignup}
                                className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 rounded-full p-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors z-10"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            {/* Decorative blurred backgrounds */}
                            <div className="absolute top-[-50%] right-[-20%] w-[70%] h-[70%] rounded-full bg-blue-600 opacity-10 blur-shape"></div>
                            <div className="absolute bottom-[-30%] left-[-20%] w-[60%] h-[60%] rounded-full bg-purple-600 opacity-10 blur-shape"></div>

                            {/* Auth component instead of Signup */}
                            <div className="bg-gray-900 p-8">
                                <Auth onClose={toggleSignup} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
