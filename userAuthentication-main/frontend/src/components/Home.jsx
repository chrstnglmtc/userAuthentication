import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Auth.css';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // You can use useEffect to check the user's login status on component mount
    useEffect(() => {
        // Your authentication logic here to determine if the user is logged in
        // For example, you might check if a token exists in localStorage
        const userToken = localStorage.getItem('userToken');
        setIsLoggedIn(!!userToken);
    }, []);

    const handleLogout = () => {
        // Your logout logic here, for example, remove the token from localStorage
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
    };

    return (
        <div className="home-container">
            <div className="home-header">
                <div className="left-container">
                    <div className="logo-container">
                        <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">
                                    <h3>Catalog</h3>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <h3>Activities</h3>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="right-container">
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                    {isLoggedIn ? (
                        <>
                            {/* Display user-related actions when logged in */}
                            <Link to="/dashboard">
                                <button>Dashboard</button>
                            </Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            {/* Display login and register buttons when logged out */}
                            <Link to="/register">
                                <button>Register</button>
                            </Link>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        <div className="home-content">
            <div className="japanese-message">
                <h1>知識を得る。自分のやり方で学ぼう。ベストを尽くす。</h1>
            </div>
            <div className="english-message">
                <h1>Gain knowledge. Learn your way. Be the best.</h1>
            </div>
            <div className="courses">
                <div className="square">
                    <h3>Programming</h3>
                </div>
                <div className="square">
                    <h3>Artificial Intelligence</h3>
                </div>
                <div className="square">
                    <h3>Business</h3>
                </div>
                <div className="square">
                    <h3>Security</h3>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;