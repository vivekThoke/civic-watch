import React, { useEffect, useState } from 'react'
import api from '../api/axios'

const CreateIssue = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [locality, setLocality] = useState("")
    const [images, setImages] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        api.get("/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error(err))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append(
            "data",
            new Blob(
                [JSON.stringify({ title, description, categoryId, locality })],
                { type: "application/json" }
            )
        )

        images.forEach(img => formData.append("images", img))

        try {
            await api.post("/issues", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            window.location.href = "/"
        } catch (err) {
            console.error("Error posting issue", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
            <div className="
                max-w-2xl mx-auto
                bg-white/70 backdrop-blur-xl
                border border-gray-200/60
                rounded-3xl shadow-xl
                p-8
            ">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Report a Civic Issue
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Help improve your locality by reporting an issue.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Issue title
                        </label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Eg. Broken street light near main road"
                            className="
                                w-full rounded-xl border border-gray-300
                                px-4 py-3 text-sm
                                focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                outline-none transition
                            "
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe the issue in detail..."
                            rows="4"
                            className="
                                w-full rounded-xl border border-gray-300
                                px-4 py-3 text-sm resize-none
                                focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                outline-none transition
                            "
                            required
                        />
                    </div>

                    {/* Category & Locality */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}
                                className="
                                    w-full rounded-xl border border-gray-300
                                    px-4 py-3 text-sm bg-white
                                    focus:ring-2 focus:ring-orange-400
                                "
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Locality
                            </label>
                            <input
                                value={locality}
                                onChange={e => setLocality(e.target.value)}
                                placeholder="Eg. MG Road, Sector 5"
                                className="
                                    w-full rounded-xl border border-gray-300
                                    px-4 py-3 text-sm
                                    focus:ring-2 focus:ring-orange-400
                                "
                                required
                            />
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Attach images (optional)
                        </label>

                        <label className="
                            flex items-center justify-center
                            w-full h-32 rounded-2xl border-2 border-dashed
                            border-gray-300 cursor-pointer
                            hover:border-orange-400 hover:bg-orange-50
                            transition
                        ">
                            <span className="text-sm text-gray-500">
                                Click to upload images
                            </span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={e => setImages([...e.target.files])}
                            />
                        </label>

                        {images.length > 0 && (
                            <p className="text-xs text-gray-500 mt-2">
                                {images.length} file(s) selected
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full py-3 rounded-xl
                            bg-gradient-to-r from-orange-500 to-pink-500
                            text-white text-sm font-semibold
                            shadow-lg
                            hover:shadow-xl hover:scale-[1.01]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition
                        "
                    >
                        {loading ? "Submitting..." : "Submit Issue"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateIssue
