import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notelogo from "../Assests/notes-removebg-preview.png";

export const Home = () => {
  const navigate = useNavigate();
  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 min-h-screen flex flex-col">
      <div className="relative isolate px-6 pt-4 lg:px-8 lg:pt-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-12 lg:py-16">
          <img
            className="mx-auto h-32 sm:h-44 w-auto"
            src={Notelogo}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-gray-900 font-bold text-4xl sm:text-5xl ">
            Recall
          </h2>
          <div className="mt-3 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
              Master Your Memories
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-8 text-gray-700">
              Say goodbye to forgotten details and welcome a world where your
              memories are not just preserved but easily mastered. With
              intuitive features and a user-friendly interface, Recall ensures
              that every note becomes a vivid, accessible memory waiting to be
              recalled at your fingertips. Revolutionize your note-taking
              journey and truly 'Master Your Memories' with Recall
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-sky-950 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-800"
                onClick={handleLoginClick}
              >
                Explore More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
