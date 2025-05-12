import { authorData } from '../assets/authorData';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100">
      <div className="h-40 w-450 flex flex-row justify-center items-center rounded-b-xl bg-gradient-to-b from-blue-700 to-teal-300">
        <Link to="/home">
          <h1 className="text-white text-xl font-bold mx-30 hover:text-gray-400 p-2 rounded">Home</h1>
        </Link>
        <Link to="/mycollection">
          <h1 className="text-white text-xl font-bold mx-30 hover:text-gray-400 p-2 rounded">My Collection</h1>
        </Link>
        <Link to="/">
          <h1 className="text-white text-xl font-bold mx-30 hover:text-gray-400 p-2 rounded">Sign Out</h1>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-10 p-8 bg-white rounded-xl h-full m-8">
        {authorData.map((member, index) => (
          <div key={index} className="bg-cyan-500 h-200 w-150 flex flex-col items-center justify-center rounded-xl p-4">
            <img src={member.pic} alt={member.name} className="w-100 h-120 object-cover mb-4 rounded-lg" />
            <h2 className="text-white text-[25px] font-bold">{member.name}</h2>
            <p className="text-white text-lg">{member.title}</p>
            <p className="text-white">{member.email}</p>
            <p className="text-white mt-10">{member.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <h1 className="text-stone-950">Thanks for visiting!</h1>
      </div>
    </div>
  );
}

export default About;
