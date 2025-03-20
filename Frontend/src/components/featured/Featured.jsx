import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Featured = () => {
  return (
    <div className="h-[600px] flex justify-center bg-green-900 text-white">
      <div className="max-w-[1400px] flex items-center w-full px-6">
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">
            Find the perfect <span className="italic font-light">freelance</span> services for your business
          </h1>

          {/* Search Box */}
          <div className="bg-white rounded-lg flex items-center justify-between overflow-hidden shadow-lg">
            <div className="flex items-center gap-3 px-4 py-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                className="border-none outline-none text-black placeholder-gray-500"
              />
            </div>
            <button className="w-32 h-12 bg-green-500 text-white font-semibold hover:bg-green-600 transition">
              Search
            </button>
          </div>

          {/* Popular Services */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-medium">Popular:</span>
            {["Web Design", "WordPress", "Logo Design", "AI Services"].map((item) => (
              <button
                key={item}
                className="border border-white px-4 py-2 rounded-full bg-transparent text-sm hover:bg-white hover:text-green-900 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="hidden lg:block h-full">
          <img src="./img/man.png" alt="Man" className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
