// src/data/servicesData.js
import { 
  FaLaptopCode,
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
  FaMobileAlt,
  FaPaintBrush,
  FaBug,
} from "react-icons/fa";

import { 
  SiNextdotjs,
  SiMongodb,
  SiFlutter,
  SiFigma,
  SiSketch,
  SiAdobexd
} from "react-icons/si";

export const staticServices = [
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
      { name: "Jest", icon: FaBug, color: "#99424F" },
    ],
  },
];
