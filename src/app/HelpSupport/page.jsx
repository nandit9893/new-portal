"use client"
import React, { useState } from "react";

export default function HelpSupport() {
  const [priority, setPriority] = useState(1);
  const [file, setFile] = useState(null);
  const [fileMessage, setFileMessage] = useState("");

  const increasePriority = () => {
    if (priority < 5) setPriority(priority + 1);
  };

  const decreasePriority = () => {
    if (priority > 1) setPriority(priority - 1);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFileMessage("File selected: " + e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ticket Raised Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-center mb-4">Raise a Support Ticket</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">Ticket ID:</label>
          <input type="text" className="w-full border p-2 rounded mb-2" value="TKT12345" readOnly />

          <label className="block text-sm font-medium">Email ID:</label>
          <input type="email" className="w-full border p-2 rounded mb-2" required />

          <label className="block text-sm font-medium">Date Created:</label>
          <input type="text" className="w-full border p-2 rounded mb-2" value={new Date().toLocaleDateString()} readOnly />

          <label className="block text-sm font-medium">Subject:</label>
          <input type="text" className="w-full border p-2 rounded mb-2" required />

          <label className="block text-sm font-medium">Status:</label>
          <input type="text" className="w-full border p-2 rounded mb-2" value="Open" readOnly />

          <label className="block text-sm font-medium">Priority:</label>
          <div className="flex items-center gap-2 mb-2">
            <input type="number" className="border p-2 w-16 text-center rounded" value={priority} readOnly />
            <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" onClick={increasePriority}>🔼</button>
            <button type="button" className="bg-red-500 text-white px-3 py-1 rounded" onClick={decreasePriority}>🔽</button>
          </div>

          <label className="block text-sm font-medium">Attachments:</label>
          <input type="file" className="w-full border p-2 rounded mb-2" onChange={handleFileUpload} />
          {fileMessage && <p className="text-green-500 text-sm">{fileMessage}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            Raise Your Ticket
          </button>
        </form>
      </div>
    </div>
  );
}