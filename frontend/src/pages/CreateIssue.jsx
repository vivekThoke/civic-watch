import React, { use, useEffect, useState } from 'react'
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
    });

  return (
    <div>

    </div>
  )
}

export default CreateIssue