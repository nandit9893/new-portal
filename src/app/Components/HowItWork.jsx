import React from "react";

const HowItWork = () => {
  const steps = [
    {
      icon: "👤", // Replace with actual SVG or icon component if needed
      title: "Create Account",
      description: "Create account & unlock opportunities!",
    },
    {
      icon: "📤",
      title: "Upload Resume",
      description: "Upload resume & get hired!",
    },
    {
      icon: "🔎",
      title: "Find Jobs",
      description: "Find jobs, apply easily, and grow your career fast!",
    },
    {
      icon: "✅",
      title: "Apply Job",
      description: "Apply for jobs and get hired!",
    },
  ];

  return (
    <section className="bg-white py-12 px-6 md:px-12 font-sans text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          How it Works
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Finding your dream job has never been easier! Follow these simple
          steps to kickstart your career with Job Portal.
        </p>

        {/* Responsive Card Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-100 border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              <div className="text-primaryGreen text-5xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;