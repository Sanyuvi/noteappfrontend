import React, { useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "./API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddNotes = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  const handleAddNote = async (event) => {
    event.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      const response = await axios.post(`${API}/note/createNote`, note, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Note added successfully:", response.data.data);
      toast.success("Note added successfully.");

      const userId = localStorage.getItem("userId");
      // Check if this log is printed
      console.log("Navigating to getAllNotes");
      navigate(`/getAllNotes/${userId}`);
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Error adding note. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="bg-cyan-600 h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Create Notes Form */}
      <div className="container mx-auto mt-12 p-4 max-w-xl">
        <div className="bg-white p-6 rounded-md shadow-md shadow-indigo-950">
          <h2 className="text-blue-950 text-2xl text-center font-bold mb-4">
            Add Notes
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 p-2 border border-gray-500 rounded-md w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter the title of the note"
                value={note.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-900"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="4"
                className="mt-1 p-2 border border-gray-500 rounded-md w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter the content of the note"
                value={note.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-sky-950 place-items-center text-white py-2 w-full rounded-md hover:bg-sky-800 focus:outline-none focus:ring focus:border-sky-800"
                onClick={handleAddNote}
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
