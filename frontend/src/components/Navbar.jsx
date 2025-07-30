import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".dropdown-container");
      if (dropdown && !dropdown.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownOptionClick = (action) => {
    setShowDropdown(false);
    action();
  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative dropdown-container">
            <img
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
              src={userData.image || assets.default_profile}
              alt=""
              onClick={handleDropdownClick}
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt=""
              onClick={handleDropdownClick}
            />
            <div
              className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 transition-all duration-300 ease-in-out ${
                showDropdown
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                <p
                  onClick={() =>
                    handleDropdownOptionClick(() => navigate("/my-profile"))
                  }
                  className="hover:text-black cursor-pointer transition-colors duration-200"
                >
                  My Profile
                </p>
                <p
                  onClick={() =>
                    handleDropdownOptionClick(() =>
                      navigate("/my-appointments")
                    )
                  }
                  className="hover:text-black cursor-pointer transition-colors duration-200"
                >
                  My Appointment
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer transition-colors duration-200"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-500 text-white py-3 px-8 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <div>
          <img
            onClick={() => setShowMenu(true)}
            src={assets.menu_icon}
            className="w-6 md:hidden"
            alt=""
          />
          {/* mobile menu */}
          {showMenu && (
            <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden">
              {/* Overlay with blur */}
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setShowMenu(false)}
              ></div>
              {/* Centered fullscreen menu */}
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-white/80 shadow-xl p-8 gap-10 animate-slide-in-right max-w-full">
                <div className="flex items-center justify-between w-full max-w-xs mb-8">
                  <img src={assets.logo} className="w-32" alt="" />
                  <img
                    onClick={() => setShowMenu(false)}
                    src={assets.cross_icon}
                    className="w-7 cursor-pointer"
                    alt="close"
                  />
                </div>
                <ul className="flex flex-col gap-8 text-2xl font-semibold items-center w-full max-w-xs">
                  <NavLink
                    to={"/"}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/doctors"}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    All Doctors
                  </NavLink>
                  <NavLink
                    to={"/about"}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    About
                  </NavLink>
                  <NavLink
                    to={"/contact"}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Contact
                  </NavLink>
                </ul>
                {!token && (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setShowMenu(false);
                    }}
                    className="bg-primary text-white py-3 px-8 rounded-full font-light mt-8 text-lg"
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
