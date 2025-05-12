import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddAlbum from './pages/AddAlbum';
import Confirmation from './pages/Confirmation';
import MyCollection from './pages/MyCollection';
import EditAlbum from './pages/EditAlbum';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link> |
      <Link to="/signup"> Signup</Link> |
      <Link to="/home"> Home</Link> | 
      <Link to="/about"> About</Link> |
      <Link to="/addalbum"> AddAlbum</Link> |
      <Link to="/confirmation"> Confirmation</Link> |
      <Link to="/mycollection"> MyCollection</Link>
      <Link to="/editalbum"> EditAlbum</Link>
    </nav>
  );
}

function App() {

  const [albums, setAlbums] = useState([]);
  const [mycollection, setmycollection] = useState([]);
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Login />}/>
        {/* <Route path="/" element={<Login />}/> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home albums={albums} setAlbums={setAlbums} setmycollection={setmycollection} />}/>
        {/* <Route path="/home" element={<Home />}/> */}
        <Route path="/addalbum" element={<AddAlbum albums={albums} setAlbums={setAlbums} />} />
        <Route path="/editalbum/:id" element={<EditAlbum />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/mycollection" element={<MyCollection mycollection={mycollection} setmycollection={mycollection} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;