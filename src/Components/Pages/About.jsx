import React from "react";
import { FaGlobe, FaUsersCog, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProfilerWrapper } from "./utils/Profiler";

// ✅ Card Data in Array
const aboutData = [
  {
    icon: <FaGlobe />,
    iconColor: "#22c55e",
    title: "Our Mission",
    description:
      "To empower businesses with cutting-edge technology solutions that drive innovation and growth.",
  },
  {
    icon: <FaRocket />,
    iconColor: "#ef4444",
    title: "Our Vision",
    description:
      "To be the most trusted global partner for custom software development and digital transformation.",
  },
  {
    icon: <FaUsersCog />,
    iconColor: "#8b5cf6",
    title: "Our Team",
    description:
      "A collaborative team of engineers, designers, and strategists dedicated to delivering quality results.",
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <ProfilerWrapper id="About">
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About CodeDynamo
          </h1>
          <p className="text-gray-700 text-lg max-w-xl mx-auto">
            Building intelligent, scalable, and user-focused digital solutions.
          </p>
        </div>

        {/* Cards (Mission, Vision, Team) */}
        <div className="grid gap-8 md:grid-cols-3">
          {renderCards(aboutData)}
        </div>

        {/* Company Story */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            CodeDynamo was founded with a simple goal — to bridge the gap
            between ideas and digital innovation. Since our inception, we've
            helped startups and enterprises alike achieve their business goals
            by crafting tailor-made software products. Our strength lies in a
            client-centric approach, agile development methods, and our
            relentless focus on quality.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm transition-all duration-300 hover:text-blue-600">
        Developed by <span className="font-semibold">Saqib</span>
      </footer>
    </div></ProfilerWrapper>
  );
}

// ✅ Reusable Card Renderer
function renderCards(data) {
  return data.map((item, index) => (
    <Card
      key={index}
      icon={item.icon}
      iconColor={item.iconColor}
      title={item.title}
      description={item.description}
    />
  ));
}

// ✅ Stylish Reusable Card Component
function Card({ icon, title, description, iconColor = "#2563EB" }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group hover:scale-[1] border border-gray-100">
      <div className="mb-3">
        {React.cloneElement(icon, {
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
