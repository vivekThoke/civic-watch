import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import IssueCard from '../components/IssueCard'

const IssueFeed = () => {
    const [issues, setIssues] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        api.get(`/issues/public?page=${page}&size=10`)
            .then(res => setIssues(res.data.content))
            .catch(err => console.log(err))
    }, [page])

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Civic Issues
                </h1>

                <div className="space-y-4">
                    {issues.map(issue => (
                        <IssueCard key={issue.id} issue={issue} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 0))}
                        className="px-4 py-2 rounded bg-white border hover:bg-gray-50 shadow-sm"
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 rounded bg-white border hover:bg-gray-50 shadow-sm"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IssueFeed
