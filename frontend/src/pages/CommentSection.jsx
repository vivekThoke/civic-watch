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
                if (isMounted){
                    setComments((await res).data);
                }
            }catch (err) {
                console.log("Failed to fetch comments" + err);
            }finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        if (issueId){
            fetchComments();
        }

        return () => {
            isMounted = false
        };
    }, [issueId]);

    const submitComment = async () => {
        if(!content.trim()) return;

        try {
            const res = await api.post(`/issues/${issueId}/comments`, { content });
            setComments([res.data, ...comments]);
            setContent("");
        }catch {
            alert("Login required to comment");
        }
        
    }

  return (
    <div className='mt-6'>
        {/* add comment */}
        {token ? (
            <>
                <textarea className="w-full border rounded p-2 mb-2"
                            rows="3"
                            placeholder='What are your thoughts'
                            value={content}
                            onChange={e => setContent(e.target.value)}/>
                <button onClick={submitComment}
                        className='bg-blue-600 text-white px-4 py-1 rounded'>Comment</button>
            </>
        ) : (
            <p className="text-sm text-gray-500">
                Login required to comment
            </p>
        )}

        {/* comment List */}
        <div className="mt-4 space-y-4">
            {loading && <p>Loading comment...</p>}

            {!loading && comments.length == 0 && (
                <p className="text-gray-500 text-sm">
                    No comments yet. be the first.
                </p>
            )}

            {comments.map(c => (
                <div key={c.id}
                    className='border-l-4 border-blue-400 pl-3'>
                        <p className='text-sm'>{c.content}</p>
                        <span className='text-xs text-gray-500'>
                            {c.author} · {new Date(c.createdAt).toUTCString()}
                        </span>
                </div>
            ))
            }

            {console.log(comments)}
        </div>
    </div>
  )
}

export default CommentSection