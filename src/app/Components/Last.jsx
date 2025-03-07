import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const companies = [
  { name: "ABC Inc.", jobs: 8, logo: "📷" },
  { name: "Global Solutions", jobs: 18, logo: "⚡" },
  { name: "The Group", jobs: 12, logo: "🍔" },
  { name: "Elite Corp.", jobs: 25, logo: "🔍" },
  { name: "AGrowthTech Ltd.", jobs: 30, logo: "📦" },
  { name: "XYZ Ltd", jobs: 10, logo: "🎬" },
];

export default function CompanyCarousel() {
  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">Top Company</h2>
      <p className="text-center text-gray-500 mb-6">Our Top Recruiters!</p>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="w-full max-w-5xl mx-auto"
      >
        {companies.map((company, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center w-60">
              <div className="text-5xl">{company.logo}</div>
              <h3 className="text-lg sm:text-xl font-semibold mt-4 text-center">{company.name}</h3>
              <span className="mt-2 bg-green-100 text-green-700 text-xs sm:text-sm px-4 py-1 rounded-full">
                {company.jobs} open jobs
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}