import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./API";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const EditNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoteToEdit = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          setError("User is not authenticated.");
          return;
        }

        setLoading(true);

        const response = await axios.get(`${API}/note/getNote/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log("Response from getNote:", response);

        const noteData = response.data.note;

        if (!noteData) {
          setError("Note not found.");
          setLoading(false);
          return;
        }

        setNote({
          title: noteData.title || "", // Handle potential undefined values
          content: noteData.content || "", // Handle potential undefined values
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        setError("Error fetching note. Please try again.");
        setLoading(false);
      }
    };

    fetchNoteToEdit();
  }, [id]);

  const handleEditNote = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      setLoading(true);

      const response = await axios.put(`${API}/note/editNote/${id}`, note, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Note edited successfully:", response.data.data);
      toast.success("Note edited successfully.");
      const userId = localStorage.getItem("userId");
      navigate(`/getAllNotes/${userId}`);
    } catch (error) {
      console.error("Error editing note:", error);
      toast.error("Error editing note. Please try again.");
    } finally {
      setLoading(false);
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
      <div className="container mx-auto mt-12 p-4 max-w-xl ">
        <div className="bg-white p-6 rounded-md shadow-md shadow-indigo-950">
          <h2 className="text-blue-950 text-2xl text-center font-bold mb-4">
            Edit Notes
          </h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
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
                  onClick={handleEditNote}
                >
                  Edit Note
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
