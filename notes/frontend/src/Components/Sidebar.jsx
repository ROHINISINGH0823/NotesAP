import React, { useState, useEffect } from 'react';

const Sidebar = ({ topics, subtopics, selectedTopic, onTopicClick, setActivePdf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topSpacing, setTopSpacing] = useState('64px'); // Initial top spacing for wider screens

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Function to set top spacing based on viewport width
    const handleResize = () => {
      if (window.innerWidth > 767) {
        // Calculate 20% of the viewport height for top spacing
        const screenHeight = window.innerHeight;
        const topMargin = screenHeight * 0.2;
        setTopSpacing(`${topMargin}px`); // Set top spacing to 20% of viewport height
      } else {
        setTopSpacing('64px'); // Default top spacing for smaller screens
      }
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative">
      {/* Toggle button for small screens */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden p-2 bg-blue-500 text-white fixed top-2 left-2 z-50 rounded"
        style={{ backgroundColor: '#320342' }}
      >
        {isOpen ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div 
        className={`sidebar fixed top-${topSpacing} left-0 h-full bg-gray-100 p-4 shadow-md transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0 md:w-64 md:mt-0 md:max-h-96 md:overflow-y-auto rounded-lg z-40`}
      >
        {selectedTopic ? (
          <>
            <button 
              onClick={() => onTopicClick(null)} 
              className="px-4 py-2 mb-3 bg-blue-500 text-white rounded"
              style={{ backgroundColor: '#320342' }}
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
    </div>
  );
};

export default Sidebar;
