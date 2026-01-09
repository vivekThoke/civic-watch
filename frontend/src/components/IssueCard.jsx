import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import isAuthenticated from '../utils/Auth';
import api from '../api/axios';

const IssueCard = ({ issue }) => {
    const navigate = useNavigate();
    const [upvotes, setUpvotes] = useState(0);
    const [upvoted, setUpvoted] = useState(null);

    const toggleUpVote = async (e) => {
        e.stopPropagation();

        if(!isAuthenticated){
            navigate("/login");
            return;
        }

        try {
            if(upvoted){
                await api.delete(`/issues/${issue.id}/upvote`)
                .then(res => setUpvotes(res.data.upvotes - 1))
                .then(res => setUpvoted(!res.data.upVotedByMe));
            }else {
                
                setUpvoted(true);
                await api.post(`/issues/${issue.id}/upvote`)
                .then(res => setUpvotes(res.data.upvotes + 1))
                .then(res => setUpvoted(res.data.upVotedByMe));
            }
        } catch (err){
            setUpvotes(issue.upvote);
            setUpvoted(issue.upVotedByMe);
            console.log(err);
        }
    }


    return (
        <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 flex"
              onClick={() => navigate(`/issues/${issue.id}`)}>

            {/* Upvote Section */}
            <div className="w-14 bg-gray-50 border-r rounded-l-lg flex flex-col items-center py-4"
                  >
                <button onClick={toggleUpVote} 
                    className={`text-xl ${upvoted ? "text-orange-500" : "text-gray-600"}`}>
                    ▲
                </button>
                <span className="font-semibold text-sm text-gray-700 mt-1">
                    {upvotes}
                </span>
            </div>
            {console.log(issue)}

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
