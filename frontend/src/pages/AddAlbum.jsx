import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddAlbum({ albums, setAlbums }) {
  const navigate = useNavigate();
  const [newAlbum, setNewAlbum] = useState({
    name: '',
    artist: '',
    rating: '',
    image: '',
    link: '',
    genre: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAlbum = async () => {
    try {
      const response = await fetch('http://localhost:8080/addAlbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlbum),
      });
  
      if (response.ok) {
        console.log('Album added successfully');
        setAlbums((prev) => [...prev, newAlbum]); // Update local state if successful
        navigate('/home'); // Navigate to the home page after adding the album
      } else {
        console.error('Failed to add album:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const handleCancel = () => {
    navigate('/home'); // Or wherever you want to cancel to
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100 pt-6">
      <div className="bg-gradient-to-b from-blue-700 to-teal-300 h-40 w-250 text-center m-12 flex flex-col justify-center rounded-xl">
        <h1 className="text-white text-xl font-bold">Add a New Album</h1>
      </div>

      <div className="bg-cyan-500 w-200 flex flex-col items-center justify-start rounded-xl p-6">
        <div className="bg-red-100 w-full p-4 mb-6 rounded-md space-y-4">
          <div>
            <label className="text-black font-semibold">Album Name:</label>
            <input
              name="name"
              value={newAlbum.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
              placeholder="e.g. Abbey Road"
              required
            />
          </div>
          <div>
            <label className="text-black font-semibold">Artist:</label>
            <input
              name="artist"
              value={newAlbum.artist}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
              placeholder="e.g. The Beatles"
              required
            />
          </div>
          <div>
            <label className="text-black font-semibold">Rating:</label>
            <input
              name="rating"
              value={newAlbum.rating}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
              placeholder="e.g. 9/10"
              required
            />
          </div>
          <div>
            <label className="text-black font-semibold">Image URL (optional):</label>
            <input
              name="image"
              value={newAlbum.image}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="text-black font-semibold">Preview Link (optional):</label>
            <input
              name="link"
              value={newAlbum.link}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
              placeholder="https://example.com/preview"
            />
          </div>
          <div>
            <label className="text-black font-semibold">Genre:</label>
            <input
              name="genre"
              value={newAlbum.genre}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
              placeholder="e.g. Rock"
              required
            />
          </div>
        </div>

        <div className="flex justify-between w-full">
          <button
            onClick={handleAddAlbum}
            className="px-4 py-2 rounded-md font-bold text-white w-1/2 mr-2 bg-green-600 hover:bg-green-700"
          >
            Add Album
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 w-1/2 ml-2 bg-gray-700 text-white rounded-md font-bold hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAlbum;