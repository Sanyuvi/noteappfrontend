import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Searchbar } from "./Searchbar";
import { CardSection } from "./CardSection";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { API } from "./API";
import axios from "axios";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);

  const handleSearchResults = (results) => {
    if (results.error) {
      setSearchError(results.error);
    } else {
      setSearchError(null);
      setSearchResults(results);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          toast.error("User is not authenticated.");
          setLoading(false);
          return;
        }

        const response = searchResults.length
          ? { data: { data: searchResults } }
          : await axios.get(`${API}/note/getAllNotes/${userId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            });

        setNotes(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching notes:", error);
        setLoading(false);
        setSearchError("Error fetching notes. Please try again.");
      }
    };

    fetchNotes();
  }, [userId, searchResults]);
  const handleDelete = async (noteId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      const response = await axios.delete(`${API}/note/deleteNote/${noteId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        toast.success("Note deleted successfully.");
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      } else {
        toast.error("Failed to delete note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note. Please try again.");
    }
  };

  const handleEdit = (noteId) => {
    navigate(`/editNote/${noteId}`);
  };

  const handleRefresh = () => {
    // Manually refresh the component by setting loading to true
    setLoading(true);
    setSearchResults([]);
    setSearchError(null);
  };

  return (
    <div className="bg-cyan-600 min-h-screen flex flex-col">
      <Navbar />
      <Searchbar userId={userId} onSearchResults={handleSearchResults} />
      {loading ? (
        <div className="d-flex justify-content-center">
          <Oval
            height={30}
            width={30}
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#86b7fe"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="note-container flex flex-wrap ">
          {searchError ? (
            // Display an error message
            <div className="error-message">
              <p>{searchError}</p>
              <button onClick={handleRefresh}>Refresh</button>
            </div>
          ) : searchResults.length > 0 ? (
            // Display search results if available
            <div className=" w-full flex justify-center items-center mt-4">
              {searchResults.map((note) => (
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4">
                  <CardSection
                    key={note._id}
                    note={note}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          ) : notes.length > 0 ? (
            // Display all notes if no search results

            notes.map((note) => (
              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4">
                <CardSection
                  key={note._id}
                  note={note}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            ))
          ) : (
            <div className="no-notes">
              <h2>No notes available. </h2>
              <img
                src="../Assets/nonotes.png"
                alt="No Notes"
                width="250"
                height="250"
              />
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
