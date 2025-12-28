import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Header() {

    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/profile', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
                setUsername(data.username);
        }) // Handle user data
        .catch(err => {
            console.error('Error fetching profile:', err);
        });
        }, []);
        console.log("Current username:", username);

    return (
        <header className="flex justify-between mx-2">
            <Link to="/" className="text-black text-lg font-bold">My Blog</Link>
            <nav className="flex justify between gap-4 text-grey-100 text-sm font-medium">
                {username ? (
                    <>
                        <Link to="/create">Create New Post</Link>
                        <a>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;