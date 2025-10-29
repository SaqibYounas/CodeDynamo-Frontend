import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "./Services";
import { ProfilerWrapper } from "./utils/Profiler";
import { sectionBoxes } from "./data/Home";
import { Box_Two } from "./Box/Box";

export default function Home() {
  const text = "Welcome to CodeDynamo";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      } else {
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 2000);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <ProfilerWrapper id="Home">
      <div className="min-h-screen bg-gradient-to-r from-[#E0ECFF] to-[#C4DDF9]">
        {/* ✅ Hero Section */}
        <section className="bg-white py-20 shadow-md">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold transform transition-transform hover:scale-105 text-center mb-4 min-h-16"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {displayedText}
              </span>
              <span className="animate-pulse text-blue-600">|</span>
            </motion.h1>

            <p className="text-gray-700 text-lg mb-6">
              We provide powerful software solutions for your business needs.
            </p>

            <div className="space-x-4">
              <Link
                to="/auth/signup"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/home/services"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>

        <Section
          title="Why Choose Us?"
          boxes={sectionBoxes.whyChooseUs}
          cols={3}
          bg="bg-gradient-to-br from-white via-slate-100 to-gray-200"
        />

        <Services showWhyChoose={false} />

        <Section
          title="Proven Track Record"
          boxes={sectionBoxes.trackRecord}
          cols={3}
          bg="bg-gray-100"
        />

        <Section
          title="Our Working Cycle"
          boxes={sectionBoxes.workingCycle}
          cols={4}
          bg="bg-white"
        />
      </div>
    </ProfilerWrapper>
  );
}

function Section({ title, boxes, cols = 3, bg = "bg-white" }) {
  return (
    <section className={`py-16 ${bg}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {title}
        </h2>

        <div
          className={`grid gap-8 text-center ${
            cols === 4
              ? "md:grid-cols-4 sm:grid-cols-2"
              : cols === 3
              ? "md:grid-cols-3 sm:grid-cols-2"
              : "md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {boxes.map((box, index) => (
            <Box_Two
              key={index}
              icon={box.icon}
              title={box.title}
              description={box.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
