import React from "react";

const VideoSection = () => {
  const footerItems = [
    {
      number: "1",
      title: "Success Stories & Hired Candidates",
      linkText: "Learn more",
    },
    {
      number: "2",
      title: "Career Resources & Mentorship",
      linkText: "Learn more",
    },
    {
      number: "3",
      title: "Call-to-Action - User signing up on the platform",
      linkText: "Learn more",
    },
  ];

  return (
    <section
      className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[632px] bg-cover bg-center flex items-center justify-center text-center text-white px-4"
      style={{ backgroundImage: "url('./VideoS.avif')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Center Content - Play Button + Heading Text */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Play Button */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primaryGreen text-white flex items-center justify-center rounded-full cursor-pointer text-lg sm:text-xl">
          ▶
        </div>

        {/* Main Heading - Responsive */}
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-snug">
          Good Life Begins With <br /> A Good Company
        </h2>
      </div>

      {/* Footer Section - Info Cards */}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 py-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-12">
          {footerItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              {/* Number Circle */}
              <div className="w-8 h-8 bg-primaryGreen text-white flex items-center justify-center rounded-full font-bold">
                {item.number}
              </div>
              {/* Text Section */}
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  {item.linkText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;