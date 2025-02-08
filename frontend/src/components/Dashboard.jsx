import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Notes from './Notes'

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);

    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good Afternoon");
    } else if (hours >= 17 && hours < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  const handleAddNote = () => {
    if (newNoteTitle.trim() !== "" && newNoteDescription.trim() !== "") {
      setNotes([...notes, { title: newNoteTitle, description: newNoteDescription }]);
      setNewNoteTitle("");
      setNewNoteDescription("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold text-gray-800 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl text-center">
        {greeting}, {username}!
      </h1>

      {/* Button to open modal */}
      <div className="mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-1 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-400 transition-all"
        >
          Add Note
        </button>
      </div>

      <Notes isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />



    </div>
  );
};

export default Dashboard;

