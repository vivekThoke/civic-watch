import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import CommentSection from './CommentSection'

const IssueDetail = () => {
    const { id } = useParams()
    const [issue, setIssue] = useState(null)

    useEffect(() => {
        api.get(`/issues/public/${id}`)
            .then(res => setIssue(res.data))
            .catch(err => console.error(err))
    }, [id])

    if (!issue) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-pulse text-gray-400 text-sm">
                    Loading issue details...
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">

            {/* Header */}
            <div className="
                bg-white/70 backdrop-blur-xl
                border border-gray-200/60
                rounded-3xl shadow-xl
                p-8
            ">
                <div className="flex flex-col gap-4">

                    {/* Title + Status */}
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                            {issue.title}
                        </h1>

                        <span className={`
                            px-4 py-1.5 rounded-full text-xs font-semibold
                            bg-gradient-to-r
                            ${issue.status === "REPORTED" && "from-yellow-400 to-orange-400 text-white"}
                            ${issue.status === "IN_PROGRESS" && "from-blue-400 to-indigo-500 text-white"}
                            ${issue.status === "RESOLVED" && "from-green-400 to-emerald-500 text-white"}
                        `}>
                            {issue.status.replace("_", " ")}
                        </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            📍 {issue.locality}
                        </span>
                        <span className="flex items-center gap-1">
                            🕒 {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mt-2">
                        {issue.description}
                    </p>
                </div>
            </div>

            {/* Image Gallery */}
            {issue.images?.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-sm font-semibold text-gray-500 mb-4">
                        Attachments
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {issue.images.map(img => (
                            <div
                                key={img.id}
                                className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm"
                            >
                                <img
                                    src={img.url}
                                    alt="issue"
                                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Status Timeline */}
            {/* <div className="mt-12 bg-white/70 backdrop-blur-xl border border-gray-200/60 rounded-3xl shadow-lg p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Status Timeline
                </h3>

                <div className="relative border-l border-gray-300 pl-6 space-y-8">
                    {issue.statusHistory.map((h, idx) => (
                        <div key={idx} className="relative">

                           
                            <div className="
                                absolute -left-[10px] top-1
                                w-4 h-4 rounded-full
                                bg-gradient-to-r from-orange-400 to-pink-500
                                shadow
                            " />

                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold text-gray-900">
                                    {h.status.replace("_", " ")}
                                </span>

                                <span className="text-xs text-gray-500">
                                    {new Date(h.updatedAt).toLocaleString()}
                                </span>

                                {h.remark && (
                                    <p className="text-sm text-gray-700 mt-1">
                                        {h.remark}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>// */}

            <div>
                <CommentSection issueId={id}/>
            </div>

        </div>
    )
}

export default IssueDetail
