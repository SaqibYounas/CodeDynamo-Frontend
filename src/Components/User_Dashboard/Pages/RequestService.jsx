import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaPython,
  FaApple,
  FaAndroid,
  FaLaptopCode,
  FaPaintBrush,
  FaCloud,
  FaBug,
  FaRobot,
  FaMobileAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiMongodb,
  SiFigma,
  SiAdobexd,
  SiKubernetes,
  SiFlutter,
  SiSketch,
} from "react-icons/si";

import ReqestForm from "./RequestForm";
import { ProfilerWrapper } from "../utils/Profiler";

const stackData = [
  {
    title: "Web Development",
    icon: FaLaptopCode,
    color: "#3C873A",
    stack: [
      { name: "HTML", icon: FaHtml5, color: "#e34c26" },
      { name: "CSS", icon: FaCss3Alt, color: "#264de4" },
      { name: "JavaScript", icon: FaJs, color: "#f0db4f" },
      { name: "React", icon: FaReact, color: "#61DBFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Node.js", icon: FaNodeJs, color: "#3C873A" },
      { name: "MongoDB", icon: SiMongodb, color: "#4DB33D" },
    ],
  },
  {
    title: "Mobile App Development",
    icon: FaMobileAlt,
    color: "#02569B",
    stack: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "React Native", icon: FaReact, color: "#61DBFB" },
      { name: "Kotlin", icon: FaAndroid, color: "#3DDC84" },
      { name: "Swift", icon: FaApple, color: "#000000" },
    ],
  },
  {
    title: "UI/UX Design",
    icon: FaPaintBrush,
    color: "#F24E1E",
    stack: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Sketch", icon: SiSketch, color: "#F7B500" },
      { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
    ],
  },
  {
    title: "QA & Testing",
    icon: FaBug,
    color: "#FF6C37",
    stack: [
      { name: "Postman", icon: FaBug, color: "#FF6C37" },
      { name: "Selenium", icon: FaBug, color: "#43B02A" },
      { name: "Jest", icon: FaBug, color: "#C21325" },
    ],
  },
  {
    title: "Cloud Services",
    icon: FaCloud,
    color: "#FF9900",
    stack: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Docker", icon: FaDocker, color: "#0db7ed" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    ],
  },
  {
    title: "AI Integration",
    icon: FaRobot,
    color: "#10A37F",
    stack: [
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "TensorFlow", icon: FaRobot, color: "#FF6F00" },
      { name: "OpenAI", icon: FaRobot, color: "#10A37F" },
    ],
  },
];

export default function StackOverview() {
  return (
    <ProfilerWrapper id="requestService">
      <div className="px-4 sm:px-6 md:pl-80 lg:pl-64 lg:pr-12 py-6 flex flex-col gap-6">
        {/* Left Side: Stack Cards */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Technology Stack Overview
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stackData.map((category, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <category.icon
                    className="text-3xl"
                    style={{ color: category.color }}
                  />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {category.title}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {category.stack.map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-sm border transition-all duration-300 cursor-default"
                      style={{
                        borderColor: tech.color,
                        color: tech.color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = tech.color;
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = tech.color;
                      }}
                    >
                      <tech.icon className="text-base" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ReqestForm />
      </div>
    </ProfilerWrapper>
  );
}
