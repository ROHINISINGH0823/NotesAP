import React, {useState} from 'react';

const Sidebar = ({ topics, subtopics, selectedTopic, onTopicClick, onSubtopicClick,setActivePdf }) => {
 
  return (
    <div className="sidebar w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
      {selectedTopic ? (
        <>
          <button onClick={() => onTopicClick(null)} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded">Back</button>
          <h2 className="text-xl font-bold mb-4">{selectedTopic.name}</h2>
          <ul>
            {subtopics.map(subtopic => (
              <li key={subtopic._id} className="mb-2">
                <button onClick={()=> setActivePdf(`http://localhost:4001/files/${selectedTopic._id}/${subtopic._id}`)} className="text-blue-500 hover:underline">{subtopic.name}</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {topics.map(topic => (
            <li key={topic._id} className="mb-2">
              <button onClick={() => onTopicClick(topic)} className="text-blue-500 hover:underline">{topic.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;