import React, { useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await api.post("/auth/login", { email, password })
            localStorage.setItem("token", res.data.token)
            window.location.href = "/"
        } catch (err) {
            setError("Invalid email or password" + err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">

            {/* Left Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500 text-white px-10">
                <div className="max-w-md">
                    <h1 className="text-4xl font-semibold leading-tight">
                        CivicWatch
                    </h1>
                    <p className="mt-4 text-white/90">
                        Track, report, and resolve civic issues together.
                    </p>
                </div>
            </div>

            {/* Login Card */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
                <div className="
                    w-full max-w-md
                    bg-white/70 backdrop-blur-xl
                    border border-gray-200/60
                    rounded-3xl shadow-xl
                    p-8
                ">

                    <h2 className="text-2xl font-semibold text-gray-900 text-center">
                        Welcome back
                    </h2>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Sign in to continue
                    </p>

                    {error && (
                        <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-6 space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="
                                    w-full rounded-xl border border-gray-300
                                    px-4 py-3 text-sm
                                    focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                    outline-none transition
                                "
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="
                                    w-full rounded-xl border border-gray-300
                                    px-4 py-3 text-sm
                                    focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                    outline-none transition
                                "
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full py-3 rounded-xl
                                bg-gradient-to-r from-orange-500 to-pink-500
                                text-white font-semibold text-sm
                                shadow-lg
                                hover:shadow-xl hover:scale-[1.01]
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition
                            "
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        New here?{" "}
                        <Link to="/register" className="text-orange-600 font-medium hover:underline">
                            Create an account
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
