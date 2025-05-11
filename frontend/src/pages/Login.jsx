import { Link } from 'react-router-dom';
import React, { useState } from 'react'; 

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:8080/credentials";
    const userInfo = {
      username,
      password,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong");
      } else {
        setError('');
        alert("Login successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        window.location.href = "/home";
      }

    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100 pt-6">
      <div className="bg-red-500 h-40 w-250 text-center m-12 flex flex-col justify-center rounded-xl bg-gradient-to-b from-blue-700 to-teal-300">
        <h1 className="text-white text-xl font-bold">The Album Archive</h1>
      </div>
      <div className="bg-cyan-500 h-120 w-200 flex flex-col items-center justify-start rounded-xl">
        <h1 className="text-white text-xl font-bold pt-6">Login</h1>

        <div className="flex flex-col items-center items-center w-full h-full pt-6">
          <input
            className="text-black h-17 w-150 p-3 mt-4 rounded-md border border-gray-300 bg-red-50 my-6"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="text-black h-17 w-150 p-3 mt-4 rounded-md border border-gray-300 bg-red-50 mt-6"
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full justify-end pr-26">
            <p>Don't have an account? <Link to="/signup"><u>Signup</u></Link></p>
          </div>
          <button className="mt-7 h-12 w-50" onClick={handleLogin}>Login</button>
          {error && (
            <div className="text-red-500 mt-4 text-center">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
