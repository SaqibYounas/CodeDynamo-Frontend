import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaCogs,
  FaShieldAlt,
  FaTools,
  FaSearch,
  FaLaptopCode,
  FaRocket,
  FaClock,
  FaCheckCircle,
  FaSmileBeam,
} from "react-icons/fa";
import Services from "./Services";
import { ProfilerWrapper } from "./utils/Profiler";

const sectionBoxes = {
  whyChooseUs: [
    {
      icon: <FaUsers />,
      iconColor: "#1E90FF",
      title: "Expert Developers",
      description:
        "Our team consists of skilled engineers ready to build your product.",
    },
    {
      icon: <FaCogs />,
      iconColor: "#FF8C00",
      title: "Fast Delivery",
      description: "We ensure timely delivery without compromising quality.",
    },
    {
      icon: <FaShieldAlt />,
      iconColor: "#2E8B57",
      title: "Support & Maintenance",
      description:
        "We provide ongoing support and updates for long-term success.",
    },
  ],
  trackRecord: [
    {
      icon: <FaSmileBeam />,
      iconColor: "#FF69B4",
      title: "100%",
      description: "Customer Satisfaction",
    },
    {
      icon: <FaCheckCircle />,
      iconColor: "#228B22",
      title: "100",
      description: "Projects Successfully Completed",
    },
    {
      icon: <FaClock />,
      iconColor: "#8A2BE2",
      title: "60 Mins",
      description: "Average Response Time",
    },
  ],
  workingCycle: [
    {
      icon: <FaSearch />,
      iconColor: "#20B2AA",
      title: "01 - Discovery",
      description:
        "Understanding your idea, market, and goals for tailored solutions.",
    },
    {
      icon: <FaLaptopCode />,
      iconColor: "#1E90FF",
      title: "02 - Development",
      description: "Agile development of high-quality, scalable software.",
    },
    {
      icon: <FaRocket />,
      iconColor: "#DC143C",
      title: "03 - Deployment",
      description: "Secure and optimized deployment with full testing.",
    },
    {
      icon: <FaTools />,
      iconColor: "#FF8C00",
      title: "04 - Maintenance",
      description: "Ongoing updates, monitoring, and customer support.",
    },
  ],
};

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

      {/* Hero Section */}
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

      {/* Why Choose Us */}
      <Section
        title="Why Choose Us?"
        boxes={sectionBoxes.whyChooseUs}
        cols={3}
        bg="bg-gradient-to-br from-white via-slate-100 to-gray-200"
      />

      {/* Services Section */}
      <Services showWhyChoose={false} />

      {/* Track Record */}
      <Section
        title="Proven Track Record"
        boxes={sectionBoxes.trackRecord}
        cols={3}
        bg="bg-gray-100"
      />

      {/* Working Cycle */}
      <Section
        title="Our Working Cycle"
        boxes={sectionBoxes.workingCycle}
        cols={4}
        bg="bg-white"
      />
    </div></ProfilerWrapper>
  );
}

// ✅ Single Reusable Section Component
function Section({ title, boxes, cols = 3, bg = "bg-white" }) {
  return (
    <section className={`py-16 ${bg}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {title}
        </h2>
        <div className={`grid gap-8 md:grid-cols-${cols} text-center`}>
          {renderBoxes(boxes)}
        </div>
      </div>
    </section>
  );
}

// ✅ Reusable Box Renderer
function renderBoxes(data) {
  return data.map((item, index) => (
    <Box
      key={index}
      icon={item.icon}
      iconColor={item.iconColor}
      title={item.title}
      description={item.description}
    />
  ));
}

// ✅ Single Stylish Box Component
function Box({ icon, title, description, iconColor = "#2563EB" }) {
  return (
    <div className="bg-gradient-to-r from-[#E0ECFF] to-[#C4DDF9] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group hover:scale-[1] border border-gray-100">
      <div className="mb-3">
        {icon &&
          React.cloneElement(icon, {
            className:
              "text-5xl transition-transform duration-300 group-hover:-translate-y-1",
            style: { color: iconColor },
          })}
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
