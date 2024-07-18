import React, { useState, useEffect } from 'react';

const Sidebar = ({ topics, subtopics, selectedTopic, onTopicClick, onSubtopicClick, setActivePdf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topSpacing, setTopSpacing] = useState('64px'); // Initial top spacing with navbar height

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const navbarHeight = 64; // Fixed height of the navbar in pixels
      if (window.innerWidth > 767) {
        const screenHeight = window.innerHeight;
        const topMargin = screenHeight * 0.001 + navbarHeight; // Reduced to 0.1% of the screen height + navbar height
        setTopSpacing(`${topMargin}px`);
      } else {
        setTopSpacing('0px'); // No top spacing for narrower screens
      }
    };

    handleResize(); // Set the initial top spacing
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative" style={{ top: topSpacing }}>
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden p-2 bg-blue-500 text-white fixed top-2 left-2 z-50 rounded"
        style={{ backgroundColor: '#320342' }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        )}
      </button>

      {/* Sidebar container */}
      <div 
        className={`sidebar fixed left-0 h-720 bg-gray-100 p-4 shadow-md transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0 md:w-64 md:overflow-y-auto rounded-lg z-40`}
        style={{ height: '710px' }}
      >
        {/* Sidebar content */}
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
                  <button onClick={() => setActivePdf(`http://localhost:4001/files/${selectedTopic._id}/${subtopic._id}`)} className="text-blue-500 hover:underline">{subtopic.name}</button>
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
