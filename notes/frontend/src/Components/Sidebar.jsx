
import React from 'react';

const Sidebar = ({ topics, subtopics, selectedTopic, onTopicClick, setActivePdf }) => {
  return (
    <div className="sidebar w-full md:w-64 bg-gray-100 p-2 md:p-4 rounded-lg shadow-md md:max-h-96 md:overflow-y-auto mt-12 md:mt-16">
      {selectedTopic ? (
        <>
          <button 
            onClick={() => onTopicClick(null)} 
            className="px-4 py-2 mb-3 bg-blue-500 text-white rounded"
            style={{ backgroundColor: '#320342' }} // Adjusted color to a slightly darker shade
          >
            Back
          </button>
          <h2 className="text-xl font-bold mb-3">{selectedTopic.name}</h2>
          <ul>
            {subtopics.map(subtopic => (
              <li key={subtopic._id} className="mb-2">
                <button 
                  onClick={() => setActivePdf(`http://localhost:4001/files/${selectedTopic._id}/${subtopic._id}`)} 
                  className="hover:underline" 
                  style={{ color: '#320342' }}
                >
                  {subtopic.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {topics.map(topic => (
            <li key={topic._id} className="mb-2">
              <button 
                onClick={() => onTopicClick(topic)} 
                className="hover:underline" 
                style={{ color: '#320342' }}
              >
                {topic.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
