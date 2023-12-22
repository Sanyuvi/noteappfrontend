import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API } from "./API";

export const CardSection = ({ note, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    onDelete(note._id); // Assuming note._id is the unique identifier for notes
  };

  const handleEdit = () => {
    onEdit(note._id);
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <div className="bg-neutral-200 relative bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
        <p className="text-gray-600">{note.content}</p>
        {/* Edit and Delete Icons */}
        <div className=" absolute top-0 right-0 mt-2 mr-2 flex items-center">
          <button className="text-gray-700" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="text-red-700 ml-2" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
//
