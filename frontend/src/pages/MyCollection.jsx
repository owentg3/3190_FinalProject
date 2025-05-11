import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyCollection() {
  const [myCollection, setMyCollection] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchMyCollection = async () => {
      try {
        const response = await fetch('http://localhost:8080/mycollection'); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMyCollection(data); // Save the data in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMyCollection();
  }, []); // Empty array ensures this runs only once when the component mounts

const handleRemove = async (albumId) => {
  try {
    const response = await fetch(`http://localhost:8080/mycollection/${albumId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete album');
    }

    // Refresh collection after deletion
    setMyCollection((prev) => prev.filter((album) => album._id !== albumId));
  } catch (error) {
    console.error('Error deleting album:', error);
  }
};

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100 pt-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-700 to-teal-300 h-40 w-full text-center mb-8 flex flex-col justify-center rounded-xl">
        <h1 className="text-white text-2xl font-bold">My Collection</h1>
      </div>

      {/* Collection List */}
      <div className="w-full max-w-full p-6 bg-cyan-500 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Link to="/home">
            <p className="text-white text-lg hover:text-gray-200">The Archive</p>
          </Link>
          <Link to="/about-us">
            <p className="text-white text-lg hover:text-gray-200">About Us</p>
          </Link>
        </div>

        {myCollection.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {myCollection.map((album) => (
              <div
                key={album._id} // Ensure you're using a unique identifier
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-between relative"
              >
                {/* "-" Button in Top Right */}
                <button
                  onClick={() => handleRemoveClick(album._id)} // You'll need to handle removing with _id
                  className="absolute top-2 right-2 text-red-50 hover:text-cyan-500 text-2xl py-2 px-4 rounded-full"
                >
                  -
                </button>

                <img
                  src={album.imageUrl}
                  alt={album.name}
                  className="w-24 h-24 mb-4 rounded-lg"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold">{album.name}</p>
                  <p className="text-sm text-gray-600">Artist: {album.artist}</p>
                  <p className="text-sm text-gray-600">Genre: {album.genre}</p>
                  <p className="text-sm text-gray-600">Year: {album.year}</p>
                </div>
                <button
                  onClick={() => handleRemove(album._id)} // Handle removal with _id
                  className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-semibold text-white">
            Your collection is empty.
          </p>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <Link to="/home">
            <button className="bg-gray-200 text-red-50 py-3 px-8 rounded hover:bg-gray-300">
              Back to Album Archive
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyCollection;