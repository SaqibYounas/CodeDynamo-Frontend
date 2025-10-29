import React from "react";
import { projects, ourStory, aboutCards } from "./data/About";
import { Box } from "./Box/Box";

const AboutSection = () => {
  return (
    <>
      {/* 🔹 Top Section (Light Violet Background) */}
      <div className="bg-[#F9F9FF]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Heading Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">About CodeDynamo</h2>
            <p className="text-gray-600 font-bold">
              Building intelligent, scalable, and user-focused digital solutions.
            </p>
          </div>

          {/* About Cards */}
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

          {/* Our Story Section */}
          <div
            className="group p-6 rounded-[25px] shadow-md mb-12 border-2 border-transparent bg-[#FAFAFA] transition-all duration-300 hover:shadow-xl hover:scale-[1]"
            style={{
              borderImage: "linear-gradient(to right, #F76680, #57007B) 1",
              borderImageSlice: 1,
            }}
          >
            <h3
              className="font-semibold mb-2 text-lg"
              style={{
                background: "linear-gradient(to right, #F76680, #57007B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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

      {/* 🔹 Bottom Work Section (Light Gray Background) */}
      <section className="bg-gray-100 py-16 px-6 md:px-16">
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
              {/* Left Image Section */}
              <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-2xl shadow-md w-[380px] md:w-[450px] h-auto object-cover"
                />
              </div>

              {/* Right Text Section */}
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
    </>
  );
};

export default AboutSection;
