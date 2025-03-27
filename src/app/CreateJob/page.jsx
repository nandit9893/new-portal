"use client";
import { useState } from "react";
import axios from "axios";

const categories = ["commerce", "telecommunication", "hotels & tourism", "education", "financial services"];
const jobTypes = ["full time", "part time", "freelance", "seasonal", "fixed-price"];
const experienceLevels = ["no-experience", "fresher", "intermediate", "expert"];
const tags = ["operations", "consulting", "marketing", "management", "it", "international business"];
const cities = ["New York", "Los Angeles", "Chicago"];

const CreateJob = () => {
  const initialFormState = {
    jobTitle: "", 
    company: "", 
    category: "", 
    location: "", 
    jobType: "", 
    experience: "", 
    jobDescription: "",
    skills: [], 
    keyResponsibilities: [], 
    jobPackage: 5000, 
    companyLogo: null, 
    selectedTags: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "companyLogo") {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, companyLogo: file }));
        setPreview(URL.createObjectURL(file));
      } else {
        setError("Please upload a valid image file");
      }
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleTagSelection = (tag) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, e.target.value.trim()]
      }));
      e.target.value = "";
    }
  };

  const handleAddResponsibility = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        keyResponsibilities: [...prev.keyResponsibilities, e.target.value.trim()]
      }));
      e.target.value = "";
    }
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      // Basic validation
      if (!formData.jobTitle || !formData.company || !formData.category || 
          !formData.location || !formData.jobType || !formData.experience || 
          !formData.jobDescription) {
        throw new Error("Please fill in all required fields");
      }
  
      const form = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === 'companyLogo') {
          if (formData[key]) {
            form.append(key, formData[key]);
          }
        } else if (Array.isArray(formData[key])) {
          form.append(key, JSON.stringify(formData[key]));
        } else {
          form.append(key, formData[key]);
        }
      });
  
      const response = await axios.post("/api/jobs", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data) {
        alert("Job Created Successfully!");
        setFormData(initialFormState);
        setPreview(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error creating job");
      console.error("Error details:", err);
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Job</h2>
      {error && <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="jobTitle" 
          placeholder="Job Title" 
          value={formData.jobTitle} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded-md"
        />

        <input 
          type="text" 
          name="company" 
          placeholder="Company Name" 
          value={formData.company} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded-md"
        />
        
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded-md"
        >
          <option value="">Choose City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select 
          name="jobType" 
          value={formData.jobType} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Job Type</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select 
          name="experience" 
          value={formData.experience} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Experience Level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <textarea 
          name="jobDescription" 
          placeholder="Job Description" 
          value={formData.jobDescription} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded-md min-h-[100px]"
        ></textarea>
        
        <div>
          <h2 className="font-semibold text-lg mb-3">Skills (Required)</h2>
          <input 
            type="text" 
            placeholder="Type skill and press Enter" 
            onKeyDown={handleAddSkill} 
            className="w-full p-2 border rounded-md"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-3">Key Responsibilities (Required)</h2>
          <input 
            type="text" 
            placeholder="Type responsibility and press Enter" 
            onKeyDown={handleAddResponsibility} 
            className="w-full p-2 border rounded-md"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.keyResponsibilities.map((resp, index) => (
              <span key={index} className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                {resp}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-3">Job Package (USD)</h2>
          <input 
            type="number" 
            name="jobPackage" 
            value={formData.jobPackage} 
            onChange={handleChange} 
            min="0" 
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-3">Company Logo</h2>
          <input 
            type="file" 
            name="companyLogo" 
            accept="image/*" 
            onChange={handleChange} 
            className="w-full p-2 border rounded-md"
          />
          {preview && (
            <img src={preview} alt="Logo Preview" className="w-24 h-24 mt-3 rounded-md object-contain" />
          )}
        </div>

        <div>
          <h2 className="font-semibold text-lg mt-4 mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.selectedTags.includes(tag)
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTagSelection(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-teal-300"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;