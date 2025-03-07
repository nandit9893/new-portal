"use client";
import { useState, useRef } from "react";
import { FaEdit, FaTrash, FaPlus, FaDownload } from "react-icons/fa";

const UserResume = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("useremail@email.com");
  const [phone, setPhone] = useState("+91 9876543200");
  const [location, setLocation] = useState("Delhi");

  const [education, setEducation] = useState([
    { degree: "B.Tech, Computer Science", institute: "Institute Name", year: "2020 - 2024" },
  ]);

  const [skills, setSkills] = useState(["JavaScript", "React.js", "Next.js", "Tailwind CSS"]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);

  const [newEntry, setNewEntry] = useState(""); // Input for adding new skills, experience, projects
  const [newEducation, setNewEducation] = useState({ degree: "", institute: "", year: "" }); // Input for adding new education

  const resumeRef = useRef();

  const handleDownload = () => {
    if (resumeRef.current) {
      html2pdf().from(resumeRef.current).save("Resume.pdf");
    }
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institute && newEducation.year) {
      setEducation([...education, newEducation]);
      setNewEducation({ degree: "", institute: "", year: "" });
    }
  };

  const addItem = (stateUpdater, value) => {
    if (value.trim()) {
      stateUpdater((prev) => [...prev, value]);
      setNewEntry("");
    }
  };

  const removeItem = (stateUpdater, index) => {
    stateUpdater((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg p-6 rounded-md" ref={resumeRef}>
        <h1 className="text-3xl font-bold text-black">Internshala Resume</h1>

        {/* Personal Info Section */}
        <div className="mt-4 border-b pb-4">
          <input
            className="text-2xl font-bold text-black border-b w-full focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-gray-700">{email} | {phone} | {location}</p>
        </div>

        {/* Education Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-black">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="flex justify-between items-center mt-2">
              <p className="text-gray-700">{edu.degree} - {edu.institute} ({edu.year})</p>
              <button onClick={() => removeItem(setEducation, index)} className="text-red-500"><FaTrash /></button>
            </div>
          ))}
          {/* Add Education Inputs */}
          <div className="mt-2">
            <input
              type="text"
              placeholder="Degree"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Institute"
              value={newEducation.institute}
              onChange={(e) => setNewEducation({ ...newEducation, institute: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Year"
              value={newEducation.year}
              onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
              className="border p-2"
            />
            <button onClick={addEducation} className="text-blue-500 ml-2"><FaPlus /></button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-black">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-200 text-black px-3 py-1 rounded flex items-center">
                {skill}
                <button onClick={() => removeItem(setSkills, index)} className="ml-2 text-red-500"><FaTrash /></button>
              </div>
            ))}
          </div>
          {/* Add Skill Input */}
          <div className="mt-2">
            <input
              type="text"
              placeholder="Add Skill"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              className="border p-2"
            />
            <button onClick={() => addItem(setSkills, newEntry)} className="text-blue-500 ml-2"><FaPlus /></button>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-black">Work Experience</h2>
          {experience.length > 0 ? experience.map((exp, index) => (
            <div key={index} className="flex justify-between items-center mt-2">
              <p className="text-gray-700">{exp}</p>
              <button onClick={() => removeItem(setExperience, index)} className="text-red-500"><FaTrash /></button>
            </div>
          )) : <p className="text-gray-500">No experience added.</p>}
          <div className="mt-2">
            <input
              type="text"
              placeholder="Add Experience"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              className="border p-2"
            />
            <button onClick={() => addItem(setExperience, newEntry)} className="text-blue-500 ml-2"><FaPlus /></button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-black">Projects</h2>
          {projects.length > 0 ? projects.map((proj, index) => (
            <div key={index} className="flex justify-between items-center mt-2">
              <p className="text-gray-700">{proj}</p>
              <button onClick={() => removeItem(setProjects, index)} className="text-red-500"><FaTrash /></button>
            </div>
          )) : <p className="text-gray-500">No projects added.</p>}
          <div className="mt-2">
            <input
              type="text"
              placeholder="Add Project"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              className="border p-2"
            />
            <button onClick={() => addItem(setProjects, newEntry)} className="text-blue-500 ml-2"><FaPlus /></button>
          </div>
        </div>

        {/* Download Button */}
        <button onClick={handleDownload} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <FaDownload className="mr-2" /> Download Resume
        </button>
      </div>
    </div>
  );
};

export default UserResume;
