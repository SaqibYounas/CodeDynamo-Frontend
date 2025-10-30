import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Services from './Services';
import { ProfilerWrapper } from './utils/Profiler';
import { sectionBoxes } from './data/Home';
import { TechStack } from './Box/TeachStack';
import { Section } from './Box/Section';
import { ProjectsSection } from './common/ProjectSection';
import { ApproachSection } from './common/ourDevelopment';

export default function Home() {
  const text = 'Welcome to CodeDynamo';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      } else {
        setTimeout(() => {
          setDisplayedText('');
          setIndex(0);
        }, 2000);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <ProfilerWrapper id="Home">
      <div className="min-h-screen bg-[#F9F9FF]">
        <section
          className="bg-white py-20 shadow-md"
          data-testid="hero-section"
        >
          <div className="container mx-auto flex flex-col items-center justify-between px-6 md:flex-row md:px-10">
            <div
              className="text-center md:w-1/2 md:text-left"
              data-testid="hero-text"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl"
                data-testid="hero-heading"
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {displayedText}
                </span>
                <span className="animate-pulse text-blue-600">|</span>
              </motion.h1>

              <p
                className="mb-6 text-lg text-gray-700"
                data-testid="hero-description"
              >
                We create cutting edge software solutions designed to accelerate
                your business growth.
              </p>

              <div
                className="mt-10 space-x-4 text-center"
                data-testid="hero-buttons"
              >
                <Link
                  to="/auth/signup"
                  data-testid="get-started-link"
                  className="rounded bg-[#474BCA] px-10 py-3 text-white transition hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div
              className="mt-10 flex justify-center md:mt-0 md:w-1/2"
              data-testid="hero-image-container"
            >
              <img
                src="/Pages/Home.png"
                alt="Welcome Banner"
                className="h-auto w-[250px] sm:w-[400px] md:w-[500px] lg:w-[627px]"
              />
            </div>
          </div>
        </section>

        <Section
          title="Why Choose Us?"
          boxes={sectionBoxes.whyChooseUs}
          cols={3}
          bg="bg-[#F9F9FF]"
          data-testid="section-Why Choose Us?"
        />
        <div data-testid="services-wrapper">
          <Services showTechStack={false} />
        </div>

        <Section
          title="Proven Track Record"
          boxes={sectionBoxes.trackRecord}
          cols={3}
          bg="bg-gray-100"
          data-testid="section-proven-track-record"
        />

        <Section
          title="Our Working Cycle"
          boxes={sectionBoxes.workingCycle}
          cols={4}
          bg="bg-white"
          data-testid="section-working-cycle"
        />
      </div>
      <ProjectsSection data-testid="projects-section" />
      <ApproachSection data-testid="approach-section" />
      <TechStack data-testid="techstack-section" />
    </ProfilerWrapper>
  );
}
