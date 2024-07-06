import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import PDFRenderer from './PDFRenderer';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailedPage = () => {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        // Fetch all topics
        const topicsResponse = await axios.get('http://localhost:4001/topics');
        setTopics(topicsResponse.data);

        // Find the selected topic by ID
        const selectedTopic = topicsResponse.data.find(topic => topic._id === id);
        
        if (selectedTopic) {
          setSelectedTopic(selectedTopic);

          // Fetch subtopics of the selected topic
          const subtopicsResponse = await axios.get(`http://localhost:4001/topics/${id}/subtopics`);
          setSubtopics(subtopicsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        toast.error('Failed to load data');
      }
    };

    fetchTopicData();
  }, [id]);

  // Function to handle clicking on a subtopic
  const handleSubtopicClick = async (topicId, subtopicId) => {
    console.log(`Fetching PDF for Topic ID: ${topicId}, Subtopic ID: ${subtopicId}`);
    try {
      // Fetch PDF URL for the selected subtopic
      const response = await axios.get(`http://localhost:4001/files/${topicId}/${subtopicId}`);
      console.log('PDF URL Response:', response.data);
      setPdfUrl(response.data.pdfUrl); // Assuming your API returns { pdfUrl: 'http://path/to/pdf' }
    } catch (error) {
      console.error('Error fetching PDF:', error);
      toast.error('Failed to load PDF');
    }
  };

  // Function to handle clicking on a topic
  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    if (topic) {
      try {
        // Fetch subtopics of the selected topic
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
    <div className="flex flex-col md:flex-row w-full max-w-6xl mt-6">
      {loading ? (
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      ) : (
        <Sidebar
          topics={topics}
          subtopics={subtopics}
          selectedTopic={selectedTopic}
          onTopicClick={handleTopicClick}
          onSubtopicClick={handleSubtopicClick}
          setActivePdf={setPdfUrl}
        />
      )}
      <div className="pdf-container flex-grow overflow-y-auto mt-6 md:mt-0 md:ml-6">
        {pdfUrl && <PDFRenderer pdfUrl={pdfUrl} />} {/* Render PDF if pdfUrl is set */}
      </div>
    </div>
  );
};

export default DetailedPage;
