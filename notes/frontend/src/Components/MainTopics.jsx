import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const MainTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4001/topic')
      .then(response => {
        setTopics(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ClipLoader size={50} color={"#123abc"} loading={loading} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Main Topics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map(topic => (
          <Link key={topic._id} to={`/topic/${topic._id}`} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-bold">{topic.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainTopics;