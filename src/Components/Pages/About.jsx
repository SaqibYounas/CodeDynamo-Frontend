import React from 'react';
import { ourStory, aboutCards } from './data/About';
import { Box } from './Box/Box';
import { ProjectsSection } from './common/ProjectSection';
const AboutSection = ({ showProjects = true }) => {
  return (
    <>
      <div className="bg-[#F9F9FF]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">About CodeDynamo</h2>
            <p className="text-gray-600 font-bold">
              Building intelligent, scalable, and user-focused digital
              solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
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
            className="group p-6 rounded-[25px] shadow-md mb-12 border-2 border-transparent bg-[#FAFAFA] transition-all duration-300 hover:shadow-xl hover:scale-[1]"
            style={{
              borderImage: 'linear-gradient(to right, #F76680, #57007B) 1',
              borderImageSlice: 1,
            }}
          >
            <h3
              className="font-semibold mb-2 text-lg"
              style={{
                background: 'linear-gradient(to right, #F76680, #57007B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Story
            </h3>

            <p className="text-gray-600 text-sm transition-all duration-300 group-hover:text-[#57007B]">
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
