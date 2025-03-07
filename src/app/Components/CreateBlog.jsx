"use client";

import { useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [blogs, setBlogs] = useState([
    { id: 1, title: "Sample Blog 1", category: "Resume Tip" },
    { id: 2, title: "Sample Blog 2", category: "Interview Preparation" },
  ]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setCategory(blog.category);
    setContent(""); // You can load content if you have it in the data.
  };

  const handleCreateBlog = () => {
    if (!title || !category) {
      alert("Title and Category are required");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      category,
    };

    setBlogs([...blogs, newBlog]);

    // Reset form
    setTitle("");
    setCategory("");
    setContent("");
    setImage(null);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 rounded-lg">
      <h2 className="text-center text-lg font-semibold text-teal-700 mb-4">
        Manage Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Create/Edit Blog Form */}
        <div className="space-y-4 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700">Create / Edit Blog</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Resume Tip">Resume Tip</option>
              <option value="Interview Preparation">
                Interview Preparation
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              className="mt-1 block w-full h-48 rounded-md border border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-600"
              onChange={handleImageUpload}
            />
          </div>

          <button
            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
            onClick={handleCreateBlog}>
            Save Blog
          </button>
        </div>

        {/* Right Side: Existing Blogs List */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-4">Existing Blogs</h3>

          <div className="space-y-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{blog.title}</p>
                  <p className="text-sm text-gray-500">{blog.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    onClick={() => handleEdit(blog)}>
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-sm"
                    onClick={() => handleDelete(blog.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateBlog;
