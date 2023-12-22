import React from "react";
import Notelogo from "../Assests/notes-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate(`/login`);
  };

  return (
    <nav className="bg-sky-950 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-2">
          <img src={Notelogo} alt="Logo" className="h-8 w-6 " />
          <span className="text-white font-bold text-lg">Recall</span>
        </div>

        {/* Buttons - Create Notes and Logout */}
        <div className="flex items-center space-x-6">
          <button
            className="text-white  hidden lg:flex "
            onClick={() => navigate("/createNote")}
          >
            Create Notes
          </button>
          <button
            className="text-white  hidden lg:flex "
            onClick={handleLogout}
          >
            Logout
          </button>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden">
            <FontAwesomeIcon
              icon={faEdit}
              className="text-white text-lg mr-4"
              onClick={() => navigate("/createNote")}
            />
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-white text-lg"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

// className = "text-white hidden lg:flex";
// text-white hidden lg:flex
