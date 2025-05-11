import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import axios from 'axios';

function EditAlbum() {
  const location = useLocation();
  const navigate = useNavigate();
  const albumToEdit = location.state?.album;

  const [editedAlbum, setEditedAlbum] = useState(albumToEdit || {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!albumToEdit) {
      alert('No album data provided.');
      navigate('/');
    }
  }, [albumToEdit, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSave = async () => {
  try {
    const response = await fetch(`http://localhost:8080/albums/${albumToEdit._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedAlbum),
    });

    if (!response.ok) {
      throw new Error('Failed to update album');
    }

    alert('Album updated!');
    navigate('/');
  } catch (err) {
    console.error('Error updating album:', err);
    alert('Failed to update album');
  }
};

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100 pt-6">
      <div className="bg-gradient-to-b from-blue-700 to-teal-300 h-40 w-250 text-center m-12 flex flex-col justify-center rounded-xl">
        <h1 className="text-white text-xl font-bold">Edit Album</h1>
      </div>

      <div className="bg-cyan-500 w-200 flex flex-col items-center justify-start rounded-xl p-6">
        <div className="bg-red-100 w-full p-4 mb-6 rounded-md space-y-4">
          <div>
            <label className="text-black font-semibold">Album Name:</label>
            <input
              name="name"
              value={editedAlbum.name || ''}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 rounded border"
              required
            />
          </div>
          <div>
            <label className="text-black font-semibold">Artist:</label>
            <input
              name="artist"
              value={editedAlbum.artist || ''}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 rounded border"
              required
            />
          </div>
          <div>
            <label className="text-black font-semibold">Rating:</label>
            <input
              name="rating"
              value={editedAlbum.rating || ''}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 rounded border"
              required
            />
          </div>
          <div>
            <label className="text-black font-semibold">Image URL:</label>
            <input
              name="image"
              value={editedAlbum.image || ''}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 rounded border"
            />
          </div>
          <div>
            <label className="text-black font-semibold">Preview Link:</label>
            <input
              name="link"
              value={editedAlbum.link || ''}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 rounded border"
            />
          </div>
        </div>

        <div className="flex justify-between w-full">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md font-bold text-white w-1/2 mr-2 bg-green-600 hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 w-1/2 ml-2 bg-gray-700 text-white rounded-md font-bold hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAlbum;