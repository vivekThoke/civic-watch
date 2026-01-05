import React, { useState } from 'react'
import api from '../api/axios';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async(e) => {
        e.preventDefault();
        await api.post("/auth/register", { email, password });
        window.location.href="/login";
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            {/* Email */}
            <input type="email"
                    placeholder='Email'
                    className="w-full mb-3 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

            {/* Password */}
            <input type="password"
                    placeholder='Password'
                    className="w-full mb-3 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />

            <button className="w-full bg-green-600 text-white p-2 rounded">
                Register
            </button>

        </form>
    </div>
  )
}

export default Register;