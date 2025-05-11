import { useNavigate } from 'react-router-dom';

function ConfirmationPage({ albumTitle = "Unknown Album", artist = "Unknown Artist", inCollection = false }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (inCollection) {
      console.log("Album removed from collection.");
    } else {
      console.log("Album added to collection.");
    }
    navigate('/my-collection');
  };

  const handleCancel = () => {
    navigate(inCollection ? '/my-collection' : '/album-archive');
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
          <p className="text-black text-lg font-semibold">Album: {albumTitle}</p>
          <p className="text-black text-md">Artist: {artist}</p>
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md font-bold text-white w-1/2 mr-2 ${inCollection ? 'bg-red-700 hover:bg-red-800' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {inCollection ? "Remove" : "Add"}
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

export default ConfirmationPage;