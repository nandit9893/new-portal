"use client";
import React from "react";
import EmailSettings from "../Components/Email";
import Side from "../Components/Emailx";
import Nav from "../Components/out";

const EmailsPage = () => {
  return (
    <div className="flex min-h-screen">
 
      <Side />

 
      <div className="flex-1 p-4">
        <Nav/>
        <EmailSettings />
      </div>
    </div>
  );
};

export default EmailsPage;


 