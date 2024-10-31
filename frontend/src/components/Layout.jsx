import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Layout.css'; // Import your CSS file
import { useAuth } from './AuthContext';

const Layout = ({ children }) => {
    const { isAuthorized } = useAuth();
    return (
        <div className="layout-container">
            <nav className="navbar">
                <div className="nav-container">
                    {isAuthorized ? <p>User is logged in</p> : <p>User is logged out</p>}
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/">Home</Link></li>
                        <li className="nav-item"><Link to="/about">About</Link></li>
                        <li className="nav-item"><Link to="/register">Register</Link></li>
                        <li className="nav-item"><Link to="/login">Login</Link></li>
                    </ul>
                    <ul className='log-list'>
                        <li className='log-item'><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <p>© {new Date().getFullYear()} Trevor Bollinger. All rights reserved.</p>
            </footer>
        </div>
    );
};


export default Layout;
