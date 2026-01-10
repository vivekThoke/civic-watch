import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import isAuthenticated from '../utils/Auth'
import api from '../api/axios'

const IssueCard = ({ issue }) => {
    const navigate = useNavigate()
    const [upvotes, setUpvotes] = useState(0)
    const [upvoted, setUpvoted] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggleUpVote = async (e) => {
        e.stopPropagation()

        if (!isAuthenticated()) {
            navigate("/login")
            return
        }

        if (loading) return
        setLoading(true)

        try {
            const res = upvoted
                ? await api.delete(`/issues/${issue.id}/upvote`)
                : await api.post(`/issues/${issue.id}/upvote`)

            setUpvotes(res.data.upvotes)
            setUpvoted(res.data.upVotedByMe)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            onClick={() => navigate(`/issues/${issue.id}`)}
            className="
                group relative cursor-pointer
                bg-white/70 backdrop-blur-xl
                border border-gray-200/60
                rounded-2xl shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
                flex overflow-hidden
            "
        >

            {/* Gradient Accent */}
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-400 via-pink-500 to-purple-500" />

            {/* Upvote */}
            <div className="w-20 flex flex-col items-center justify-center gap-1 px-4">
                <button
                    onClick={toggleUpVote}
                    disabled={loading}
                    className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        transition-all duration-200
                        ${upvoted
                            ? "bg-orange-500 text-white scale-110 shadow-md"
                            : "bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-500"}
                    `}
                >
                    ▲
                </button>

                <span className="text-sm font-semibold text-gray-700">
                    {upvotes}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-orange-600 transition">
                        {issue.title}
                    </h2>

                    <span
                        className={`
                            px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                            ${issue.status === "REPORTED" && "bg-yellow-100 text-yellow-700"}
                            ${issue.status === "IN_PROGRESS" && "bg-blue-100 text-blue-700"}
                            ${issue.status === "RESOLVED" && "bg-green-100 text-green-700"}
                        `}
                    >
                        {issue.status.replace("_", " ")}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {issue.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-5 text-xs text-gray-500 mt-5">
                    <span className="flex items-center gap-1">
                        📍 {issue.locality}
                    </span>

                    <span className="flex items-center gap-1">
                        🕒 {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default IssueCard
