import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setBio, setAvatar } from "../features/ProfileSlice";
import NavBar from "../components/Navbar";
import type { RootState } from "../store/store";
import { MdModeEdit } from "react-icons/md";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { name, bio, Avatar } = useSelector(
    (state: RootState) => state.ProfileSlice
  );
  const [showDialog, setShowDialog] = useState(false);

  const handleSave = () => {
    setShowDialog(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setAvatar(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="overflow-hidden h-screen w-screen">
      <NavBar />
      <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        {/* Profile Card */}
        <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] min-w-[350px] p-8 rounded-xl bg-gray-800 text-gray-200 flex flex-col gap-6 shadow-xl">
          {/* Section 1: Avatar and Name */}
          <div className="flex items-center gap-6">
            <div className="relative group w-28 h-28">
              <img
                src={Avatar}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-transparent group-hover:border-blue-500 transition-all duration-300"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xl ">
                  <MdModeEdit />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              {name || "Guest"}
            </h2>
          </div>

          {/* Section 2: Description */}
          <div className="min-h-[60px] break-words text-gray-400 text-sm">
            {bio || "No description set."}
          </div>

          {/* Section 3: Buttons */}
          <div className="flex flex-col gap-4 items-center w-full mt-4">
            <button
              onClick={() => setShowDialog(true)}
              className="h-12 w-[80%] bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        {showDialog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={() => setShowDialog(false)} // This handler closes the dialog on backdrop click
          >
            <form
              className="bg-gray-800 text-white p-8 rounded-lg shadow-2xl min-w-[450px]"
              onClick={(e) => e.stopPropagation()} // This prevents the click from bubbling to the backdrop
            >
              <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  value={name || ""}
                  onChange={(e) => dispatch(setName(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <div className="relative">
                  <textarea
                    rows={4}
                    placeholder="Description"
                    value={bio || ""}
                    onChange={(e) => dispatch(setBio(e.target.value))}
                    maxLength={120}
                    className="w-full px-4 py-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                  <span className="absolute bottom-3 right-3 text-sm text-gray-400">
                    {bio?.length || 0}/120
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-4">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
