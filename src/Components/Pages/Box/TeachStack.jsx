import React, { useState } from 'react';
import { techStackData } from '../data/teachStackData.jsx';

export function TechStack() {
  const [activeTab, setActiveTab] = useState('Backend');

  return (
    <div className="px-4 py-10 text-center bg-[#f9fafe]">
      <h2 className="text-xl sm:text-2xl md:text-3xl  mb-8">
        Our <br />
        <b>Tech Stack</b>
      </h2>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {Object.keys(techStackData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 md:px-8 lg:px-12 py-2 text-sm sm:text-base border-b-4 cursor-pointer transition-all duration-300
              ${
                activeTab === tab
                  ? 'border-transparent bg-gradient-to-r from-[#F76680] to-[#57007B] text-white font-bold'
                  : 'border-transparent text-gray-700 font-normal hover:text-[#F76680] hover:border-[#F76680]'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-[1000px] mx-auto">
        {techStackData[activeTab].map((tech) => (
          <div key={tech.name} className="flex justify-center items-center">
            <img
              src={tech.url}
              alt={tech.name}
              title={tech.name}
              className="w-30 h-12 sm:w-14 sm:h-14 md:w-30 md:h-16 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
