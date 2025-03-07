"use client"
import React, { useState } from "react";

export default function Payment() {
  const [amount, setAmount] = useState(1234); // Default amount
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          <span className="font-bold italic">PAYMENT DETAILS :</span>
        </h2>

        {/* Input Fields */}
        <div className="space-y-3">
          {/* Amount Field */}
          <div>
            <label className="block font-medium">Amount :</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md mt-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              readOnly
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-medium">Email :</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block font-medium">Phone :</label>
            <input
              type="tel"
              className="w-full p-2 border rounded-md mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Full Name Field */}
          <div>
            <label className="block font-medium">Full Name :</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mt-1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Payment Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600"
        >
          Pay Amount ₹{amount}
        </button>
      </div>
    </div>
  );
}