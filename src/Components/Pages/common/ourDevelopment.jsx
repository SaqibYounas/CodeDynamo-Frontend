import React from "react";
import { approaches } from "../data/Approach";

export const ApproachSection = () => {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Our design and
        </h2>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          development approach
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {approaches.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl mb-5 ${item.color}`}
            >
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
