import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import IssueCard from '../components/IssueCard'
import Navbar from './Navbar'


const IssueFeed = () => {
    const [issues, setIssues] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true

        const fetchIssues = async () => {
            setLoading(true)
            try {
                const res = await api.get(`/issues/public?page=${page}&size=10`)
                if (isMounted) {
                    setIssues(res.data.content)
                }
            } catch (err) {
                console.error(err)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchIssues()

        return () => {
            isMounted = false
        }
    }, [page])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

            {/* Glass Navbar */}
            <Navbar />

            {/* Hero Header */}
            <div className="border-b bg-white/70 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Civic Issues
                    </h1>
                    <p className="text-gray-500 mt-2 max-w-xl mx-auto">
                        Track, upvote, and follow local civic issues raised by the community.
                    </p>
                </div>
            </div>

            {/* Feed */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center text-sm text-gray-400">
                            Loading issues...
                        </div>
                    ) : issues.length === 0 ? (
                        <div className="text-center text-gray-500 text-sm">
                            No issues found.
                        </div>
                    ) : (
                        issues.map(issue => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-12">
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 0))}
                        disabled={page === 0}
                        className="
                            px-5 py-2 rounded-full text-sm font-medium
                            bg-white border
                            hover:bg-gray-50
                            disabled:opacity-40 disabled:cursor-not-allowed
                            transition
                        "
                    >
                        ← Previous
                    </button>

                    <span className="text-xs text-gray-500">
                        Page {page + 1}
                    </span>

                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="
                            px-5 py-2 rounded-full text-sm font-medium
                            bg-white border
                            hover:bg-gray-50
                            transition
                        "
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IssueFeed
