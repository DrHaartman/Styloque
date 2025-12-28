import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response =await fetch('http://localhost:5000/login', { // Backend login endpoint
            method: 'POST',  // Use POST method for login
            headers: {'content-type': 'application/json'}, // Set content type to JSON
            body: JSON.stringify({ username, password }), // Send username and password in the request body
            credentials: 'include' // Include cookies in the request
        })
        if(response.status === 200){
            alert("Login successful!");
            setRedirect(true);
        } else {
            alert("Login failed or invalid credentials.");
        }
    };

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md shadow mx-auto my-6 bg-gray-200 p-4 rounded-lg">
            <h1 className="text-center text-xl font-bold mb-4">Log In</h1>
            <input  type="text" 
                    placeholder="Enter Username" 
                    className="w-full p-2 mb-2 border border-gray-300 rounded" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" 
                    placeholder="Enter Password" 
                    className="w-full p-2 mb-2 border border-gray-300 rounded" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="cursor-pointer hover:bg-gray-600 w-full bg-gray-900 text-white p-2 rounded">Log In</button>
        </form>
    );
}

export default Login;