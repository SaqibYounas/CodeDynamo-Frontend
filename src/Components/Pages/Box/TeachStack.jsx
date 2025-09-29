import React, { useState } from "react";
import { techStackData } from "../data/teachStackData";

export function TechStack() {
  const [activeTab, setActiveTab] = useState("Backend");

  return (
    <div className="px-4 py-10 text-center bg-[#f9fafe]">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8">
        Our <br />
        <b>Tech Stack</b>
      </h2>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {Object.keys(techStackData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 md:px-8 lg:px-12 py-2 border-b-4 text-sm sm:text-base ${
              activeTab === tab
                ? "border-purple-700 text-purple-700 font-bold"
                : "border-transparent text-gray-700 font-normal"
            } focus:outline-none cursor-pointer`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tech Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-[1000px] mx-auto">
        {techStackData[activeTab].map((tech) => (
          <div key={tech.name} className="flex justify-center items-center">
            <img
              src={tech.url}
              alt={tech.name}
              title={tech.name}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
