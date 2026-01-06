import React from 'react'

const IssueCard = ({ issue }) => {
    return (
        <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 flex">

            {/* Upvote Section */}
            <div className="w-14 bg-gray-50 border-r rounded-l-lg flex flex-col items-center py-4">
                <button className="text-gray-400 hover:text-orange-500 text-xl">
                    ▲
                </button>
                <span className="font-semibold text-sm text-gray-700 mt-1">
                    {issue.upvotes}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
                <h2 className="font-semibold text-lg text-gray-900 hover:underline cursor-pointer">
                    {issue.title}
                </h2>

                <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                    {issue.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-4">
                    <span className="flex items-center gap-1">
                        📍 {issue.locality}
                    </span>

                    <span className="flex items-center gap-1">
                        🕒 {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                    
                    <span
                        className={`px-2 py-0.5 rounded-full text-white text-xs font-medium
                        ${issue.status === "REPORTED" ? "bg-yellow-500" :
                          issue.status === "IN_PROGRESS" ? "bg-blue-500" :
                          "bg-green-600"}`}
                    >
                        {issue.status}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default IssueCard
