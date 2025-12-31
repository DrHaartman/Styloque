import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "./Pages/userContext";

function Header() {

    const {setUserInfo, userInfo} = useContext(userContext);

    useEffect( ()=> {
        fetch('http://localhost:5000/api/users/profile', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => {
            if (!response.ok) throw new Error('Not logged in');
            return response.json();
            })
        .then(data => {
            console.log("Fetched user info:", data);
           setUserInfo(data);
        })
        }, []);
        console.log("Current user info:", userInfo);

    function logout() {
        fetch('http://localhost:5000/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header className="flex justify-between w-full bg-slate-600 px-4 py-6 border-gray-300">
            <Link to="/" className="text-black text-3xl align-middle font-bold">My Blog</Link>
            <nav className="flex justify between gap-4 text-grey-100 text-sm font-medium">
                {username && (
                    <>
                        <button className="border border-black bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700" ><Link to="/create" >Create New Post</Link></button>
                        <button className="border border-red bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700" ><a onClick={logout}>Logout</a></button>
                    </>
                )}
                {!username && (
                    <>
                        <button className="border border-black px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800" ><Link to="/login">Login</Link></button>
                        <button className="border border-black px-4 py-2 rounded-md bg-blue-400 text-white hover:bg-blue-500" ><Link to="/register">Register</Link></button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;