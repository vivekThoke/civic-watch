import React, { useState } from 'react'
import api from '../api/axios';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            window.location.href="/";
        }catch (err){
            setError("Invalid creaditinal " + err);
        }

        
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                {/* Email */}
                <input type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mb-3 p-2 border rounded"/>

                {/* Password */}
                <input type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full mb-3 p-2 border rounded"/>

                <button type='submit'
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>

            </form>
            {/* <p>New User ? {<Navigate to="/register"/>}</p> */}
        </div>
    )
}

export default Login