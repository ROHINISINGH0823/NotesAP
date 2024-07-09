import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import b1 from "/b1.png";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubtopicChange = (e) => {
    setSubtopic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('topic', topic);
    formData.append('subtopic', subtopic);

    axios.post('http://localhost:4001/upload', formData)
      .then(response => {
        toast.success('File uploaded successfully');
        setFile(null);
        setTopic('');
        setSubtopic('');
      })
      .catch(error => {
        console.error(error);
        toast.error('File upload failed');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="file" onChange={handleFileChange} required />
          <input type="text" placeholder="Topic" value={topic} onChange={handleTopicChange} required />
          <input type="text" placeholder="Subtopic" value={subtopic} onChange={handleSubtopicChange} required />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
        </form>
      </div>
      {/* Placeholder for the image */}
      <div className="flex-shrink-0 ml-4">
        <img src="b1.png" alt="Image" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default AdminUpload;
