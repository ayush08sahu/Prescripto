import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MacSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <span className="text-lg font-medium text-white drop-shadow">Saving...</span>
    </div>
  </div>
);

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      if (image) formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    userData && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 py-10 px-2 relative">
        {loading && <MacSpinner />}
        <div className={`w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-4 border border-gray-100 transition-all duration-300 ${loading ? 'blur-sm pointer-events-none select-none' : ''}`}>
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-2">
            {isEdit ? (
              <>
                <label htmlFor="image">
                  <div className="relative cursor-pointer group">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center overflow-hidden shadow-lg border-4 border-indigo-100">
                      <img
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition duration-200"
                        src={image ? URL.createObjectURL(image) : (userData.image || assets.default_profile)}
                        alt=""
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
                        <img className="w-10" src={assets.upload_icon} alt="" />
                      </div>
                    </div>
                  </div>
                  <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                <button
                  className="mt-3 text-xs px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={!userData.image}
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const { data } = await axios.post(
                        backendUrl + "/api/user/delete-profile-picture",
                        {},
                        { headers: { token } }
                      );
                      if (data.success) {
                        toast.success(data.message);
                        await loadUserProfileData();
                        setImage(false);
                      } else {
                        toast.error(data.message);
                      }
                    } catch (error) {
                      toast.error(error.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Delete Profile Picture
                </button>
              </>
            ) : (
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center overflow-hidden shadow-lg border-4 border-indigo-100">
                <img className="w-full h-full object-cover" src={userData.image || assets.default_profile} alt="" />
              </div>
            )}
            {isEdit ? (
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-3xl font-semibold max-w-60 mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-center"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <p className="font-semibold text-3xl text-neutral-800 mt-4 text-center">
                {userData.name}
              </p>
            )}
          </div>

          <hr className="bg-zinc-300 h-[1.5px] border-none my-4" />

          {/* Contact Information */}
          <div>
            <p className="text-neutral-500 font-semibold tracking-wide mb-2 underline underline-offset-4">CONTACT INFORMATION</p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-3 gap-x-2 mt-2 text-neutral-700">
              <p className="font-medium">Email id:</p>
              <p className="text-blue-500 break-all">{userData.email}</p>
              <p className="font-medium flex items-center gap-2">
                Phone:
                {isEdit ? (
                  <input
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 max-w-52 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                ) : (
                  <span className="text-blue-500">{userData.phone}</span>
                )}
              </p>
              <div className="col-span-2"></div>
              <p className="font-medium">Address:</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                    value={userData.address.line1}
                    type="text"
                    placeholder="Address Line 1"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                    value={userData.address.line2}
                    type="text"
                    placeholder="Address Line 2"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <p className="text-neutral-500 font-semibold tracking-wide mb-2 underline underline-offset-4 mt-4">BASIC INFORMATION</p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-3 gap-x-2 mt-2 text-neutral-700">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 cursor-pointer"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-400">{userData.gender}</p>
              )}
              <p className="font-medium">Date of Birth:</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 cursor-pointer"
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob}
                />
              ) : (
                <p className="text-gray-400">{userData.dob || "Not specified"}</p>
              )}
            </div>
          </div>

          {/* Edit/Save Button */}
          <div className="mt-10 flex justify-center">
            {isEdit ? (
              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-10 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 border-none outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={updateUserProfile}
                disabled={loading}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-10 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 border-none outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
