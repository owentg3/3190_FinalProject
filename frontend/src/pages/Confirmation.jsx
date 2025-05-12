import { useNavigate, useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const album = location.state?.album;
  const inCollection = location.state?.inCollection ?? false;

  if (!album) {
    return <div className="p-6">No album data found. Please go back and try again.</div>;
  }

  const handleConfirm = async () => {
    try {
      if (!inCollection) {
        const response = await fetch('http://localhost:8080/addAlbum', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(album),
        });

        if (response.ok) {
          console.log("Album added to collection.");
        } else {
          console.error("Failed to add album.");
        }
      } else {
        // You can handle removal here, if needed
        console.log("Album removed from collection.");
      }
      navigate('/home');
    } catch (err) {
      console.error("Error processing album:", err);
    }
  };

  const handleCancel = () => {
    navigate(inCollection ? '/home' : '/home');
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100 pt-6">
      <div className="bg-gradient-to-b from-blue-700 to-teal-300 h-40 w-250 text-center m-12 flex flex-col justify-center rounded-xl">
        <h1 className="text-white text-xl font-bold">
          {inCollection ? "Remove Album?" : "Add Album?"}
        </h1>
      </div>

      <div className="bg-cyan-500 w-200 flex flex-col items-center justify-start rounded-xl p-6">
        <div className="bg-red-100 w-full p-4 mb-6 rounded-md">
          <p className="text-black text-lg font-semibold">Album: {album.name}</p>
          <p className="text-black text-md">Artist: {album.artist}</p>
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md font-bold text-black w-1/2 mr-2 ${inCollection ? 'bg-red-700 hover:bg-red-800' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {inCollection ? "Remove" : "Add"}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 w-1/2 ml-2 bg-gray-700 text-black rounded-md font-bold hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;