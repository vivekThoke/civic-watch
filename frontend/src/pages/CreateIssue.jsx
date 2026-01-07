import React, { useEffect, useState } from 'react'
import api from '../api/axios';

const CreateIssue = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [locality, setLocality] = useState("");
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get("/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "data",
            new Blob(
                [
                    JSON.stringify({
                        title,
                        description,
                        categoryId,
                        locality,
                    }),
                ],
                { type: "application/json" }
            )
        );
        images.forEach(img => formData.append("images", img));

        try {
            await api.post("/issues", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            window.location.href = "/";
        } catch (err) {
            console.log("Error while posting the issue " + err);
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Report and Civi Issue</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <input 
                    placeholder='Issue Title'
                    className='w-full border p-2 rounded'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required/>

                <textarea 
                    placeholder='Describe the issue'
                    className='w-full border p-2 rounded'
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required/>

                <select 
                    className='w-full border p-2 rounded'
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required>
                        <option value="">Select Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}

                </select>

                <input 
                    placeholder='Locality / Area'
                    className='w-full border p-2 rounded'
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                    required/>

                <input type="file"
                multiple
                accept='image/*'
                onChange={e => setImages([...e.target.value])}  />

                <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Submit Issue
                </button>

            </form>
        </div>
    )
}

export default CreateIssue