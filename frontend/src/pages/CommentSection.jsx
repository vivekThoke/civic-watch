import React, { useEffect, useState } from 'react'
import api from '../api/axios';

const CommentSection = ({ issueId }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        let isMounted = true;

        const fetchComments = async () => {
            try {
                setLoading(true);
                const res = api.get(`/issues/${issueId}/comments`);
                if (isMounted) {
                    setComments((await res).data);
                }
            } catch (err) {
                console.log("Failed to fetch comments" + err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        if (issueId) {
            fetchComments();
        }

        return () => {
            isMounted = false
        };
    }, [issueId]);

    const submitComment = async () => {
        if (!content.trim()) return;

        try {
            const res = await api.post(`/issues/${issueId}/comments`, { content });
            setComments([res.data, ...comments]);
            setContent("");
        } catch {
            alert("Login required to comment");
        }

    }

    return (
        <div className="mt-8 bg-white rounded-lg shadow-sm border ">
            {/* Add Comment */}
            <div className="p-4 border-b">
                {token ? (
                    <>
                        <textarea
                            className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="3"
                            placeholder="What are your thoughts?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={submitComment}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md"
                            >
                                Comment
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-gray-500">
                        Login required to comment
                    </p>
                )}
            </div>

            {/* Comment List */}
            <div className="p-4 space-y-6">
                {loading && (
                    <p className="text-sm text-gray-500">Loading comments...</p>
                )}

                {!loading && comments.length === 0 && (
                    <p className="text-gray-500 text-sm">
                        No comments yet. Be the first.
                    </p>
                )}

                {comments.map((c) => (
                    <div
                        key={c.id}
                        className="flex gap-3 group"
                    >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                            {c.author?.charAt(0).toUpperCase()}
                        </div>

                        {/* Comment Body */}
                        <div className="flex-1 border-l-2 border-gray-200 pl-4">
                            <div className="text-xs text-gray-500 mb-1">
                                <span className="font-medium text-gray-700">
                                    {c.author}
                                </span>{" "}
                                · {new Date(c.createdAt).toLocaleString()}
                            </div>

                            <p className="text-sm text-gray-800 leading-relaxed">
                                {c.content}
                            </p>

                            {/* Actions (future ready) */}
                            <div className="mt-2 flex gap-4 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                                <button className="hover:text-blue-600">Reply</button>
                                <button className="hover:text-blue-600">Upvote</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection