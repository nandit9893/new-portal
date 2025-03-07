"use client";
import { useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

import React from "react";

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(1); // Default open FAQ item (first one)

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "Can I upload a CV?",
      answer:
        "Yes! You can upload your CV to showcase your skills and experience, making it easier for recruiters to find you.",
    },
    {
      id: 2,
      question: "How long will the recruitment process take?",
      answer:
        "The recruitment process duration varies depending on the job role, company, and the number of applications received.",
    },
    {
      id: 3,
      question: "Do you recruit for Graduates, Apprentices and Students?",
      answer:
        "Yes, we provide opportunities for graduates, apprentices, and students to find suitable roles.",
    },
    {
      id: 4,
      question: "What does the recruitment and selection process involve?",
      answer:
        "Our recruitment process typically includes application screening, assessments, interviews, and final selection.",
    },
    {
      id: 5,
      question:
        "Can I receive notifications for any future jobs that may interest me?",
      answer:
        "Yes, you can set up job alerts to receive notifications for jobs that match your preferences.",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
          Find answers to common job portal queries below
        </p>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 
                ${openFaq === faq.id ? "bg-primaryGreen bg-opacity-10" : ""}`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-lg text-gray-800">0{faq.id}</span>
                  <span
                    className={`font-semibold transition-colors duration-300 ${
                      openFaq === faq.id ? "text-primaryGreen" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>
                {openFaq === faq.id ? (
                  <MinusCircleIcon className="w-6 h-6 text-primaryGreen transition-transform transform rotate-180" />
                ) : (
                  <PlusCircleIcon className="w-6 h-6 text-primaryGreen transition-transform transform rotate-0" />
                )}
              </button>

              {/* Answer Section */}
              {openFaq === faq.id && faq.answer && (
                <div className="px-4 pb-4 text-gray-700 text-sm sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;