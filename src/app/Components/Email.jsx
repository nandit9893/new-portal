import React from "react";

const EmailSettings = () => {
  return (
    <div className="min-h-screen  text-white flex flex-col items-center p-4">
      {/* Email Header */}
      <div className="w-full bg-gray-300 text-black text-center py-4 mt-4 rounded-lg text-xl font-bold">
        Email
      </div>

      {/* Email Settings Section */}
      <div className="bg-white text-black w-full max-w-4xl mt-6 p-6 rounded-lg shadow-lg">
        <h2 className="text-center font-semibold text-lg mb-4">
          Email Settings
        </h2>

        <div className="space-y-4">
          {[
            "Host Name*",
            "Sender Email*",
            "Sender Display Name*",
            "Authentication Email",
            "Authentication Password",
          ].map((label, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-medium">{label}:</label>
              <input className="bg-gray-300 h-10 rounded-md" type="text" />
            </div>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col items-center mt-6 gap-4">
          <button className="bg-blue-300 text-black px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
            Validate Email
          </button>
          <div className="flex flex-wrap justify-center gap-4">
            {["Start", "Restart", "Delete"].map((btn, index) => (
              <button
                key={index}
                className="bg-blue-300 text-black px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
