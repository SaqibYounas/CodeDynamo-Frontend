import React from 'react';
import { projects } from '../data/About';

export const ProjectsSection = () => {
  return (
    <section className="bg-[#F9F9FF] px-6 py-16 md:px-16">
      <div className="mb-8 text-center">
        <div className="mx-auto h-1 w-24 rounded bg-purple-500"></div>
        <h2 className="mb-2 p-2 text-3xl font-bold">Our Work in Action</h2>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`${project.bg} flex flex-col items-center justify-between rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl md:flex-row`}
          >
            <div className="mb-6 flex justify-center md:mb-0 md:w-1/2">
              <img
                src={project.image}
                alt={project.title}
                className="h-auto w-[380px] rounded-2xl object-cover shadow-md md:w-[450px]"
              />
            </div>

            <div className="space-y-4 text-center md:w-1/2 md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800">
                {project.title}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
