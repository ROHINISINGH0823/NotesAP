import React from 'react';
import axios from 'axios';

const Note = ({ note }) => {
  const handleFavorite = async () => {
    await axios.post(`http://localhost:4001/favorite/${note._id}`);
    // Optionally reload the user data or update the state
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <button onClick={handleFavorite}>Add to Favorites</button>
    </div>
  );
};

export default Note;
