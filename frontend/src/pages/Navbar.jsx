import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    return (
        <nav className="
            sticky top-0 z-50
            bg-white/60 backdrop-blur-xl
            border-b border-white/20
        ">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-semibold tracking-tight text-gray-900"
                >
                    civic<span className="text-gray-500">-watch</span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/create")}
                        className="
                            px-4 py-2 rounded-lg text-sm font-medium
                            bg-gray-900 text-white
                            hover:bg-gray-800 transition
                        "
                    >
                        + New Issue
                    </button>

                    {!token && (
                        <button
                            onClick={() => navigate("/login")}
                            className="
                                px-4 py-2 rounded-lg text-sm font-medium
                                border border-gray-300
                                text-gray-700
                                hover:bg-gray-100 transition
                            "
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
