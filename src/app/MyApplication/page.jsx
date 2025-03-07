import React from "react";
import Header from "../Components/Headerfile";
import JobApplications from "../Components/ListItem";
import Footer from "../Components/Footer";

const MyApplicationPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-8 max-w-6xl mx-auto w-full">
        <JobApplications />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyApplicationPage;
