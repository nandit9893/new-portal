"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      // Mock API call or email sending logic
      console.log("Form Data:", formData);

      // Simulate successful submission
      setStatus("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      setStatus("Error sending message. Try again!");
    }
  };

  return (
    <>
    <Navbar />
    <div className="bg-gray-100 py-16 px-4 sm:px-8 lg:px-32">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            You Will Grow, You Will Succeed. We Promise That
          </h2>
          <p className="text-gray-600 mt-4">
            Contact us today for career opportunities, guidance, and expert support.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-green-600 text-lg">📞</span>
              <div>
                <h3 className="font-semibold text-gray-900">Call for inquiry</h3>
                <p className="text-gray-600">+257 388-6895</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-600 text-lg">✉️</span>
              <div>
                <h3 className="font-semibold text-gray-900">Send us email</h3>
                <p className="text-gray-600">kramulous@sbcglobal.net</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-600 text-lg">⏰</span>
              <div>
                <h3 className="font-semibold text-gray-900">Opening hours</h3>
                <p className="text-gray-600">Mon - Fri: 10AM - 10PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-600 text-lg">📍</span>
              <div>
                <h3 className="font-semibold text-gray-900">Office</h3>
                <p className="text-gray-600">19, HSR Layout, Bangalore</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">Contact Info</h3>
          <p className="text-gray-600 text-sm">Reach us for career support!</p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="Your name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your E-mail address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded h-28"
            ></textarea>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
              Send Message
            </button>
          </form>
          {status && <p className="mt-2 text-center text-sm text-gray-700">{status}</p>}
        </div>
      </div>

      {/* Embedded Map of Bangalore */}
      <div className="mt-12">
        <iframe
          className="w-full h-80 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.373258909125!2d77.6094780871582!3d12.925933684741412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15fd9cde7361%3A0x6e3a0a758f4a4a23!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1675502613956!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
    </>
  );
};

export default Contact;