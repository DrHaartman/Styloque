import React, { useState } from "react";
import { Navigate } from "react-router-dom";


function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [redirect, setRedirect] = useState(false);

    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(username, password, password2);

            if(username.length < 6) {
                alert("Username must be at least 6 characters long.");
                return;
            }

            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            if(password !== password2){
                alert("Passwords do not match.");
                return;
            }

            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ username, password })
            });

            if(response.status === 201){
                alert("Registration successful go to login!");
                setUsername('');
                setPassword('');
                setPassword2('');
                setRedirect(true);

            if(redirect){
                return <Navigate to={'/login'} />
            }

            } else {
                alert("Registration failed.");
            }
            };

    return(
        <form onSubmit={handleSubmit} className="max-w-md shadow mx-auto my-6 bg-slate-400 p-4 rounded-lg">
            <h1 className="text-center text-xl font-bold mb-4">Register</h1>
            <input type="text" 
                    placeholder="Enter your Full Names" 
                    className="w-full p-2 mb-2 border border-gray-300 rounded" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" 
                    placeholder="Enter Password" 
                    className="w-full p-2 mb-2 border border-gray-300 rounded" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" 
                    placeholder="Confirm your Password" 
                    className="w-full p-2 mb-2 border border-gray-300 rounded" 
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}/>
            <button type="submit" className="cursor-pointer hover:bg-gray-600 w-full bg-gray-900 text-white p-2 rounded">Register</button>
        </form>
    );
}

export default Register;