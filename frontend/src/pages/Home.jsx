import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Home({ setmycollection }) {
  const [albums, setAlbums] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:8080/home');
        if (!response.ok) throw new Error('Failed to fetch albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const uniqueGenres = [...new Set(albums.map(album => album.genre))].filter(Boolean);

  const handleAddtoCollection = async (album) => {
    const url = "http://127.0.0.1:8080/mycollection";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
      });

      if (!response.ok) throw new Error("Failed to add album to collection");

      const result = await response.json();
      console.log("Album added:", result);
      alert("Album added to your collection!");

      setmycollection(prev => {
        const exists = prev.some(a => a.name === album.name && a.artist === album.artist);
        return exists ? prev : [...prev, album];
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding album to collection");
    }
  };

  const handleEdit = (album) => {
    navigate(`/editAlbum/${album._id}`, { state: { album } });
  };

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-screen bg-gradient-to-b from-red-50 to-cyan-500">
      {/* Top Nav Bar */}
      <div className="h-40 w-450 text-left flex flex-row justify-start rounded-b-xl bg-gradient-to-b from-blue-700 to-teal-300">
        <Link to="/mycollection">
          <h1 className="text-white text-xl font-bold my-10 mx-22 hover:text-gray-400">
            My Collection
          </h1>
        </Link>
        <Link to="/about">
          <h1 className="text-white text-xl font-bold my-10 mx-22 hover:text-gray-400">
            About Us
          </h1>
        </Link>
        <Link to="/addalbum">
          <h1 className="text-white text-xl font-bold my-10 mx-22 hover:text-gray-400">
            Edit Album
          </h1>
        </Link>
        <Link to="/">
          <h1
            onClick={() => {
              localStorage.clear();
            }}
            className="text-white text-xl font-bold my-10 mx-22 hover:text-gray-400"
          >
            Sign Out
          </h1>
        </Link>
      </div>

      {/* Dropdown for genres */}
      <div className="w-full flex justify-start pl-30">
        <div className="h-12 w-50 text-left rounded-b-xl bg-gradient-to-t from-blue-700 to-teal-300 flex justify-center">
          <div className="relative inline-block text-left dropdown">
            <button
              onClick={toggleDropdown}
              className="bg-teal-500 text-white px-2 py-2 rounded-b-xl focus:outline-none w-45"
            >
              Genres ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 origin-top-right bg-black border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  {uniqueGenres.map((genre, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedGenre(genre)}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      {genre}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedGenre(null)}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Album Cards */}
      <div className="grid grid-cols-5 gap-6 p-8 w-full rounded-t-xl flex-grow mt-8">
        {albums
          .filter((album) => !selectedGenre || album.genre === selectedGenre)
          .map((album, index) => (
            <React.Fragment key={index}>
              <div
                className="h-130 w-130 text-red-50 bg-white p-4 shadow rounded-full flex flex-col items-start mt-10"
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/premium-photo/simply-sleek-minimalistic-black-vinyl-record-cartoon-sticker-design_1000124-133490.jpg')",
                  backgroundSize: "150%",
                  backgroundPosition: "center",
                }}
              >
                <button
                  className="h-12 w-12 bg-white text-black font-bold rounded-full"
                  onClick={() => handleAddtoCollection(album)}
                >
                  +
                </button>
                <button
                  className="h-12 w-12 bg-white text-black font-bold rounded-full"
                  onClick={() => handleEdit(album)}
                >
                  edit
                </button>
                <img
                  src={album.image || "/OT.jpg"}
                  alt={album.artist}
                  className="border-2 mx-auto mb-4 rounded-lg"
                />
                <div className="pl-30">
                  <p className="p-2 text-[18px] text-left">
                    <strong>Album: </strong>
                    {album.name}
                  </p>
                  <p className="p-2 text-[18px] text-left">
                    <strong>Artist: </strong>
                    {album.artist}
                  </p>
                  <p className="p-2 text-[18px] text-left">
                    <strong>Rating: </strong>
                    {album.rating}
                  </p>
                  <p className="p-2 text-[18px] text-left">
                    <strong>Link: </strong>
                    <a href={album.link} className="text-blue-500 underline">
                      Preview
                    </a>
                  </p>
                </div>
              </div>
              {index % 4 === 3 && <div className="w-full h-4"></div>}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Home;