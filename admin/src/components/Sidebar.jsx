import React from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block min-h-screen bg-white border-r shadow-lg">
        {aToken && (
          <ul className="text-[#515151] mt-5">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-r-4 border-indigo-500 text-indigo-600"
                    : "hover:text-indigo-600"
                }`
              }
              to={"/admin-dashboard"}
            >
              <img src={assets.home_icon} alt="" className="w-5 h-5" />
              <p className="font-medium">Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-r-4 border-indigo-500 text-indigo-600"
                    : "hover:text-indigo-600"
                }`
              }
              to={"/all-appointments"}
            >
              <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
              <p className="font-medium">Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-r-4 border-indigo-500 text-indigo-600"
                    : "hover:text-indigo-600"
                }`
              }
              to={"/add-doctor"}
            >
              <img src={assets.add_icon} alt="" className="w-5 h-5" />
              <p className="font-medium">Add Doctor</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-r-4 border-indigo-500 text-indigo-600"
                    : "hover:text-indigo-600"
                }`
              }
              to={"/doctor-list"}
            >
              <img src={assets.people_icon} alt="" className="w-5 h-5" />
              <p className="font-medium">Doctors List</p>
            </NavLink>
          </ul>
        )}
      </div>

      {/* Mobile Bottom Navigation - Visible only on mobile */}
      {aToken && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          {/* Liquid Glass Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/90 to-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl">
            {/* Animated liquid bubbles */}
            <div className="absolute top-0 left-1/4 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-1/3 w-6 h-6 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-bounce"></div>
            <div className="absolute bottom-2 left-1/3 w-4 h-4 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full animate-ping"></div>
          </div>

          {/* Navigation Content */}
          <div className="relative z-10 px-4 py-2">
            <ul className="flex justify-around items-center">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-t from-indigo-500/20 to-blue-500/20 text-indigo-600 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
                to={"/admin-dashboard"}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${({
                    isActive,
                  }) =>
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"}`}
                >
                  <img src={assets.home_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium">Dashboard</p>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-t from-indigo-500/20 to-blue-500/20 text-indigo-600 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
                to={"/all-appointments"}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${({
                    isActive,
                  }) =>
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"}`}
                >
                  <img
                    src={assets.appointment_icon}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-xs font-medium">Appointments</p>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-t from-indigo-500/20 to-blue-500/20 text-indigo-600 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
                to={"/add-doctor"}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${({
                    isActive,
                  }) =>
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"}`}
                >
                  <img src={assets.add_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium">Add Doctor</p>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-t from-indigo-500/20 to-blue-500/20 text-indigo-600 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
                to={"/doctor-list"}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${({
                    isActive,
                  }) =>
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"}`}
                >
                  <img src={assets.people_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium">Doctors</p>
              </NavLink>
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block min-h-screen bg-white border-r shadow-lg">
        {dToken && (
          <ul className="text-[#515151] mt-5">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-r-4 border-indigo-500 text-indigo-600"
                    : "hover:text-indigo-600"
                }`
              }
              to={"/doctor-dashboard"}
            >
              <img src={assets.home_icon} alt="" className="w-5 h-5" />
              <p className="font-medium">Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-r-4 border-indigo-500 text-indigo-600"
                    : "hover:text-indigo-600"
                }`
              }
              to={"/doctor-appointments"}
            >
              <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
              <p className="font-medium">Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-r-4 border-indigo-500 text-indigo-600"
                    : "hover:text-indigo-600"
                }`
              }
              to={"/doctor-profile"}
            >
              <img src={assets.people_icon} alt="" className="w-5 h-5" />
              <p className="font-medium">Profile</p>
            </NavLink>
          </ul>
        )}
      </div>

      {/* Mobile Bottom Navigation - Visible only on mobile */}
      {dToken && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          {/* Liquid Glass Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/90 to-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl">
            {/* Animated liquid bubbles */}
            <div className="absolute top-0 left-1/4 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-1/3 w-6 h-6 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-bounce"></div>
            <div className="absolute bottom-2 left-1/3 w-4 h-4 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full animate-ping"></div>
          </div>

          {/* Navigation Content */}
          <div className="relative z-10 px-4 py-2">
            <ul className="flex justify-around items-center">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-t from-indigo-500/20 to-blue-500/20 text-indigo-600 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
                to={"/doctor-dashboard"}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${({
                    isActive,
                  }) =>
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"}`}
                >
                  <img src={assets.home_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium">Dashboard</p>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-t from-indigo-500/20 to-blue-500/20 text-indigo-600 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
                to={"/doctor-appointments"}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${({
                    isActive,
                  }) =>
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"}`}
                >
                  <img
                    src={assets.appointment_icon}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-xs font-medium">Appointments</p>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-t from-indigo-500/20 to-blue-500/20 text-indigo-600 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
                to={"/doctor-profile"}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${({
                    isActive,
                  }) =>
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"}`}
                >
                  <img src={assets.people_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium">Profile</p>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
