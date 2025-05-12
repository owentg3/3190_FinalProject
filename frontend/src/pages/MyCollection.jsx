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
      <div className="w-full max-w-full p-6 bg-cyan-500 rounded-xl shadow-lg bg-gradient-to-b from-red-50 to-cyan-500">
        <div className="flex justify-between items-center mb-6">
          <Link to="/home">
            <p className="text-cyan text-lg hover:text-gray-200">
              The Archive
            </p>
          </Link>
          <Link to="/about-us">
            <p className="text-cyan text-lg hover:text-gray-200">About Us</p>
          </Link>
        </div>

        {myCollection.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
            {myCollection.map((album) => (
              <div
                key={album._id}
                className="min-h-[400px] bg-gradient-to-b from-blue-400 to-cyan-600 p-4 rounded-2xl shadow-lg flex flex-col items-center relative hover:shadow-xl transition-shadow duration-300"
              >
                {/* Album Cover */}
                <img
                  src={album.image}
                  alt={album.name}
                  className="w-90 object-cover border-2 border-gray-200 rounded-lg mb-4 transition-transform duration-300 hover:scale-115"
                />
                <br></br>

                {/* Album Info */}
                <div className="text-center space-y-1 mb-4">
                  <p className="text-4xl font-bold text-gray-800">
                    {album.name}
                  </p>
                  <p className="text-2xl text-gray-600">
                    Artist: {album.artist}
                  </p>
                  <p className="text-xl text-gray-600">Genre: {album.genre}</p>
                  <p className="text-xl text-gray-600">Rating: {album.rating}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(album._id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-1.5 px-5 rounded-full hover:from-red-600 hover:to-red-700 transition-colors"
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
            <button className="bg-gray-200 text-black py-3 px-8 rounded hover:bg-gray-300">
              Back to Album Archive
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyCollection;