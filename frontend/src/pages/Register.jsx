import React, { useState } from 'react'
import api from '../api/axios';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post("/auth/register", { email, password });
            window.location.href = "/login";
        } catch (err) {
            setError("Registration failed. Try again." + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
            <div className="w-full max-w-md bg-white border border-neutral-200 rounded-xl p-8">
                
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold text-neutral-900">
                        Create your account
                    </h1>
                    <p className="text-sm text-neutral-500 mt-2">
                        Get started in less than a minute
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm 
                                       focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className=" w-full py-3 rounded-xl
                                bg-gradient-to-r from-orange-500 to-pink-500
                                text-white font-semibold text-sm
                                shadow-lg
                                hover:shadow-xl hover:scale-[1.01]
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-neutral-500 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-orange-600 font-medium hover:underline">
                        Log in.
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
