import React, { useEffect, useState } from 'react'
import api from '../api/axios';

const IssueFeed = () => {
    const [issues, setIssues] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        api.get(`/issues/public?page=${page}&size=10`)
        .then(res => setIssues(res.data.content))
        .catch(err => console.log(err));
    }, [page]);

  return (
    <div className="max-w-3xl mx-auto mt-6">
        <h1 className='text-2xl font-bold mb-4'>Civic Issues</h1>
        {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue}/>
        ))}

        <div className="flex justify-between mt-6">
            <button onClick={() => setPage(p => Math.max(p - 1, 0))}>
                Prev
            </button>
            <button onClick={() => setPage(p => p + 1)}>
                Next
            </button>
        </div>
    </div>
  )
}

export default IssueFeed;