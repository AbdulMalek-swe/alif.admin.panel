import axios from 'apiService/axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';

const MadeOrder = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleContentChange = (content) => {
        setDescription(content);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('title', title);
        try {
            // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for your POST request
            const response = await axios.post('/made-appointment', formData);
            console.log('Post submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <div>
           <div>
           <form
                className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Upload Image:
                    </label>
                    <input
                    required
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                    <QuillEditor onContentChange={handleContentChange} />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
           </div>
        </div>
    );
};
export default MadeOrder;
export const QuillEditor = ({ onContentChange }) => {
    const [content, setContent] = useState('');
    const handleChange = (value) => {
        setContent(value);
        onContentChange(value); // Pass the updated content back to the parent component
    };
    return <ReactQuill value={content} onChange={handleChange} />;
};

