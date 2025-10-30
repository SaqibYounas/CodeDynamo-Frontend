import React from 'react';
import { approaches } from '../data/Approach';

export const ApproachSection = () => {
  return (
    <section className="bg-[#F9F9FF] px-6 py-16 md:px-16">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
          Our design and
        </h2>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          development approach
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {approaches.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
            >
              {item.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
