import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios';

const IssueDetail = () => {
    const { id } = useParams();
    const [issue, setIssue] = useState(null);

    useEffect(() => {
        api.get(`/issues/${id}`)
        .then(res => setIssue(res.data))
        .catch(err => console.log(err));
    }, [id]);

    if(!issue) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded shadow">
        <h1 className='text-2xl font-bold'>{issue.title}</h1>

        <div className="text-sm text-gray-500 mt-1">
           📍 {issue.locality} • {new Date(issue.createdAt).toLocaleDateString()}
        </div>

        <p className="mt-4 text-gray-800">{issue.description}</p>

        {/* status */}
        <div className='mt-4'>
            <span className={`px-3 py-1 rounded text-white ${
                issue.status == "REPORTED" ? "bg-yellow-500" :
                issue.status == "IN_PROGRESS" ? "bg-orange-500" :
                "bg-green-500"
            }`}>
                {issue.status}
            </span>

            {/* images */}
            {issue.images.length > 0 && (
                <div className='mt-6 grid grid-cols-2 gap-4'>
                    {issue.images.map(img => (
                        <img key={img.id}
                            src={img.url}
                            alt='issue'
                            className='rounded border'/>
                    ))}
                </div>
            )}

            {/* Status timeline */}
            <div className='mt-8'>
                <h3 className='font-semibold mb-2'>Status History</h3>
                <ul className='border-l-2 border-gray-300 pl-4'>
                    {issue.statusHistory.map((h, idx) => (
                        <li key={idx} className='mb-4'>
                            <div className="font-medium">{h.status}</div>
                            <div className='text-sm text-gray-500'>
                                {new Date(h.updatedAt).toLocaleTimeString()}
                            </div>
                            <div className='text-sm'>{h.remark}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default IssueDetail