import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import b1 from "/b1.png"; 

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubtopicChange = (e) => {
    setSubtopic(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('topic', topic);
    formData.append('subtopic', subtopic);
    formData.append('tags', tags);

    axios.post('http://localhost:4001/upload', formData)
      .then(response => {
        toast.success('File uploaded successfully');
        setFile(null);
        setTopic('');
        setSubtopic('');
        setTags('');
      })
      .catch(error => {
        console.error(error);
        toast.error('File upload failed');
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 mt-8 flex flex-col md:flex-row items-center">
          {/* Input container */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full md:w-1/2 items-center">
            <input type="file" onChange={handleFileChange} required />
            <input type="text" placeholder="Topic" value={topic} onChange={handleTopicChange} required />
            <input type="text" placeholder="Subtopic" value={subtopic} onChange={handleSubtopicChange} required />
            <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={handleTagsChange} required />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
          </form>
          {/* Image container */}
          <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-4">
            <img src={b1} alt="Image" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUpload;
