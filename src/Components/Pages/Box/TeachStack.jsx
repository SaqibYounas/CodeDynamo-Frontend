import React, { useState } from 'react';
import { techStackData } from '../data/teachStackData.jsx';

export function TechStack() {
  const [activeTab, setActiveTab] = useState('Backend');

  return (
    <div className="bg-[#f9fafe] px-4 py-10 text-center">
      <h2 className="mb-8 text-xl sm:text-2xl md:text-3xl">
        Our <br />
        <b>Tech Stack</b>
      </h2>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {Object.keys(techStackData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer border-b-4 px-4 py-2 text-sm transition-all duration-300 sm:px-6 sm:text-base md:px-8 lg:px-12 ${
              activeTab === tab
                ? 'border-transparent bg-gradient-to-r from-[#F76680] to-[#57007B] font-bold text-white'
                : 'border-transparent font-normal text-gray-700 hover:border-[#F76680] hover:text-[#F76680]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {techStackData[activeTab].map((tech) => (
          <div key={tech.name} className="flex items-center justify-center">
            <img
              src={tech.url}
              alt={tech.name}
              title={tech.name}
              className="h-12 w-30 object-contain sm:h-14 sm:w-14 md:h-16 md:w-30"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
