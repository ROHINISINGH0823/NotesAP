import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import PDFRenderer from './PDFRenderer';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const DetailedPage = () => {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicData = async () => {
      setLoading(true);
      try {
        // Fetch user information to get audience
        const userResponse = await axios.get('http://localhost:4001/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const { audience } = userResponse.data;

        // Fetch topics based on audience
        const topicsResponse = await axios.get('http://localhost:4001/topics', {
          params: { audience }
        });

        setTopics(topicsResponse.data);

        // Find the selected topic by ID
        const selectedTopic = topicsResponse.data.find(topic => topic._id === id);

        if (selectedTopic) {
          setSelectedTopic(selectedTopic);

          // Fetch subtopics of the selected topic
          const subtopicsResponse = await axios.get(`http://localhost:4001/topics/${id}/subtopics`);
          setSubtopics(subtopicsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [id]);

  const handleSubtopicClick = async (topicId, subtopicId) => {
    try {
      const response = await axios.get(`http://localhost:4001/files/${topicId}/${subtopicId}`);
      setPdfUrl(response.data.pdfUrl);
    } catch (error) {
      console.error('Error fetching PDF:', error);
      toast.error('Failed to load PDF');
    }
  };

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    if (topic) {
      try {
        const response = await axios.get(`http://localhost:4001/topics/${topic._id}/subtopics`);
        setSubtopics(response.data);
      } catch (error) {
        console.error('Error fetching subtopics:', error);
        toast.error('Failed to load subtopics');
      }
    } else {
      setSubtopics([]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen mt-16 md:mt-0">
        <Sidebar
          topics={topics}
          subtopics={subtopics}
          selectedTopic={selectedTopic}
          onTopicClick={handleTopicClick}
          onSubtopicClick={handleSubtopicClick}
          setActivePdf={setPdfUrl}
          className="mt-8 md:mt-0"
        />
        <div className="pdf-container flex-grow p-1 overflow-y-auto ml-0 md:ml-20 mt-9 md:mt-0 md:h-full">
          {loading ? (
            <div className="flex justify-center items-center h-full w-full">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : (
            pdfUrl ? (
              <PDFRenderer pdfUrl={pdfUrl} />
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-14">Select a topic to view the PDF</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;
