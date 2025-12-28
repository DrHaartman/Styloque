import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../userContext";

function Header() {

    const {setUserInfo, userInfo} = useContext(userContext);

    useEffect(() => {
        fetch('http://localhost:5000/profile', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => {
            if (!response.ok) return null;
            return response.json();
            })
        .then(userInfo => {
           setUserInfo(userInfo);
        })
        }, []);
        console.log("Current user info:", userInfo);

    function logout() {
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header className="flex justify-between mx-2">
            <Link to="/" className="text-black text-lg font-bold">My Blog</Link>
            <nav className="flex justify between gap-4 text-grey-100 text-sm font-medium">
                {username && (
                    <>
                        <Link to="/create">Create New Post</Link>
                        <a onClick={logout()}>Logout</a>
                    </>
                )}
                {!username && (
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