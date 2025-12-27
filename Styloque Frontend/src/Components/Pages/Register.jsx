import React, { useState } from "react";


function Register(){
    const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ username, password })
            })
        }




    return(
        <form onSubmit={handleSubmit} className="max-w-md shadow mx-auto my-6 bg-gray-200 p-4 rounded-lg">
            <h1 className="text-center text-xl font-bold mb-4">Register</h1>
            <input type="text" 
                    placeholder="Enter Username" 
                    className="w-full p-2 mb-2 border border-gray-300 rounded" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" 
                    placeholder="Enter Password" 
                    className="w-full p-2 mb-2 border border-gray-300 rounded" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="cursor-pointer hover:bg-gray-600 w-full bg-gray-900 text-white p-2 rounded">Register</button>
        </form>
    );
}

export default Register;