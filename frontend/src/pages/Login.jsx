import React, { useState } from 'react'
import api from '../api/axios';

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
                        required/>

                {/* Password */}
                <input type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>

                <button type='submit'>Login</button>

            </form>
        </div>
    )
}

export default Login