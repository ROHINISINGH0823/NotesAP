import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('http://localhost:4001/auth/user');
      setUser(response.data);
      setBio(response.data.bio);
      setFavoriteNotes(response.data.favoriteNotes);
      setActivity(response.data.activity);
    };
    fetchUser();
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:4001/profile', { bio });
    if (profilePicture) {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      await axios.post('http://localhost:4001/profile/picture', formData);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label>Bio</label>
          <textarea value={bio} onChange={handleBioChange} />
        </div>
        <div>
          <label>Profile Picture</label>
          <input type="file" onChange={handleProfilePictureChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {user.profilePicture && <img src={user.profilePicture} alt="Profile" />}
      <h2>Favorite Notes</h2>
      <ul>
        {favoriteNotes.map((note) => (
          <li key={note._id}>{note.title}</li>
        ))}
      </ul>
      <h2>Activity</h2>
      <ul>
        {activity.map((act, index) => (
          <li key={index}>{act}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
