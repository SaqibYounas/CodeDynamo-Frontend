import * as FaIcons from "react-icons/fa";
import {
  FaTools,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaAws,
  FaDocker,
  FaAndroid,
  FaApple,
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaBug,
  FaCloud,
  FaRobot,
} from "react-icons/fa";

import {
  SiAdobexd,
  SiNextdotjs,
  SiMongodb,
  SiKubernetes,
  SiFlutter,
  SiSketch,
  SiFigma,
} from "react-icons/si";

import { Link } from "react-router-dom";
import { ProfilerWrapper } from "./utils/Profiler";

function Services({ showWhyChoose = true }) {
  const staticServices = [
    {
      icon: FaLaptopCode,
      iconColor: "#3C873A",
      title: "Web Development",
      description: "Modern, responsive, and scalable websites built to your needs.",
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
      icon: FaMobileAlt,
      iconColor: "#02569B",
      title: "Mobile Apps",
      description: "High-performance apps for Android and iOS platforms.",
      stack: [
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "React Native", icon: FaReact, color: "#61DBFB" },
        { name: "Kotlin", icon: FaAndroid, color: "#3DDC84" },
        { name: "Swift", icon: FaApple, color: "#000000" },
      ],
    },
    {
      icon: FaPaintBrush,
      iconColor: "#F24E1E",
      title: "UI/UX Design",
      description: "Visually appealing and intuitive user interfaces.",
      stack: [
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Sketch", icon: SiSketch, color: "#F7B500" },
        { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
      ],
    },
    {
      icon: FaBug,
      iconColor: "#FF6C37",
      title: "QA & Testing",
      description: "Thorough testing to ensure product stability and performance.",
      stack: [
        { name: "Postman", icon: FaBug, color: "#FF6C37" },
        { name: "Selenium", icon: FaBug, color: "#43B02A" },
        { name: "Jest", icon: FaBug, color: "#C21325" },
      ],
    },
    {
      icon: FaCloud,
      iconColor: "#FF9900",
      title: "Cloud Services",
      description: "Scalable cloud deployment with 24/7 uptime monitoring.",
      stack: [
        { name: "AWS", icon: FaAws, color: "#FF9900" },
        { name: "Docker", icon: FaDocker, color: "#0db7ed" },
        { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      ],
    },
    {
      icon: FaRobot,
      iconColor: "#10A37F",
      title: "AI Integration",
      description: "Leverage the power of AI to automate and optimize your business.",
      stack: [
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "TensorFlow", icon: FaRobot, color: "#FF6F00" },
        { name: "OpenAI", icon: FaRobot, color: "#10A37F" },
      ],
    },
  ];

  return (
    <ProfilerWrapper id="Services">
    <>
      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-white via-slate-100 to-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 inline-flex items-center justify-center gap-2">
              <FaTools className="text-blue-600 text-3xl" />
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
            {staticServices.map((item, index) => (
              <Box
                key={index}
                icon={item.icon}
                iconColor={item.iconColor}
                title={item.title}
                description={item.description}
                stack={item.stack}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      {showWhyChoose && (
        <section className="py-16 bg-gradient-to-br from-gray-100 via-white to-slate-100">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                Why choose services from{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CodeDynamo
                </span>?
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At <strong>CodeDynamo</strong>, we don't just build software—we
                engineer success. Our expert developers turn your vision into
                functional, scalable, and impactful digital products.
              </p>
              <div className="flex justify-end mt-6">
                <Link to="/auth/login">
                  <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-md transition duration-300 transform hover:bg-blue-600 hover:text-white hover:scale-105 cursor-pointer">
                    GET IN TOUCH
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/coding.jpg"
                alt="Why Choose CodeDynamo"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      )}
    </></ProfilerWrapper>
  );
}
function Box({ image, title, description, stack = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group hover:scale-[1] border border-gray-200">
      {/* Image */}
      <div className="mb-3 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-purple-400">
        <img src={image} alt={title} className="object-contain w-12 h-12" />
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {stack.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300"
            style={{ borderColor: tech.color, color: tech.color }}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}


export default Services;
