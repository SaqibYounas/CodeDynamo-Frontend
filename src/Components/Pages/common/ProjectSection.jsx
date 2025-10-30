import React from 'react';
import { projects } from '../data/About';

export const ProjectsSection = () => {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6 md:px-16">
      <div className="text-center mb-8">
        <div className="h-1 w-24 bg-purple-500 mx-auto rounded"></div>
        <h2 className="text-3xl font-bold mb-2 p-2">Our Work in Action</h2>
      </div>

      <div className="flex flex-col gap-12 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`${project.bg} flex flex-col md:flex-row items-center justify-between p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl`}
          >
            <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
              <img
                src={project.image}
                alt={project.title}
                className="rounded-2xl shadow-md w-[380px] md:w-[450px] h-auto object-cover"
              />
            </div>

            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                {project.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
