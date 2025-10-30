import React from 'react';
import { ourStory, aboutCards } from './data/About';
import { Box } from './Box/Box';
import { ProjectsSection } from './common/ProjectSection';
const AboutSection = ({ showProjects = true }) => {
  return (
    <>
      <div className="bg-[#F9F9FF]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">About CodeDynamo</h2>
            <p className="font-bold text-gray-600">
              Building intelligent, scalable, and user-focused digital
              solutions.
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {aboutCards.map((card, idx) => (
              <Box
                key={idx}
                icon={card.icon}
                iconColor={card.iconColor}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>

          <div
            className="group mb-12 rounded-[25px] border-2 border-transparent bg-[#FAFAFA] p-6 shadow-md transition-all duration-300 hover:scale-[1] hover:shadow-xl"
            style={{
              borderImage: 'linear-gradient(to right, #F76680, #57007B) 1',
              borderImageSlice: 1,
            }}
          >
            <h3
              className="mb-2 text-lg font-semibold"
              style={{
                background: 'linear-gradient(to right, #F76680, #57007B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Story
            </h3>

            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-[#57007B]">
              {ourStory.story}
            </p>
          </div>
        </div>
      </div>

      {showProjects && <ProjectsSection />}
    </>
  );
};

export default AboutSection;
