import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "./API";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export const Searchbar = ({ userId, onSearchResults }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      setLoading(true);

      const response = await axios.get(
        `${API}/note/searchNotes/${userId}?query=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Pass the search results to the parent component
      onSearchResults(response.data.data);

      setLoading(false);

      // Redirect to Home page
      navigate(`/getAllNotes/${userId}`);
    } catch (error) {
      console.error("An error occurred while searching notes:", error);
      toast.error("No Such Notes found");
      setLoading(false);
    }
  };

  return (
    <div className="bg-cyan-600 flex items-center max-w-md mx-auto p-6 rounded-md ">
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        {/* Search Input */}
        <input
          type="text"
          className="flex-grow border border-gray-300 p-2 rounded-l-md focus:outline-none focus:border-sky-800"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Search Button */}
        <button
          type="submit"
          className="bg-sky-950 text-white p-2 rounded-r-md"
        >
          Search
        </button>
        {loading && (
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
        )}
      </form>
    </div>
  );
};
