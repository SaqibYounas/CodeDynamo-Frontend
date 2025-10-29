import {
  FaUserTie,
  FaShippingFast,
  FaTools,
  FaSmile,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaCode,
  FaRocket,
  FaWrench,
} from "react-icons/fa";

export const sectionBoxes = {
  // 🟣 Why Choose Us Section
  whyChooseUs: [
    {
      icon: <FaUserTie className="text-4xl text-[#57007B]" />,
      title: "Expert Developers",
      description:
        "Our team consists of skilled engineers ready to build your product.",
    },
    {
      icon: <FaShippingFast className="text-4xl text-[#57007B]" />,
      title: "Fast Delivery",
      description: "We ensure timely delivery without compromising quality.",
    },
    {
      icon: <FaTools className="text-4xl text-[#57007B]" />,
      title: "Support & Maintenance",
      description:
        "We provide ongoing support and updates for long-term success.",
    },
  ],

  // 🟢 Track Record Section
  trackRecord: [
    {
      icon: <FaSmile className="text-4xl text-[#57007B]" />,
      title: "100%",
      description: "Customer Satisfaction",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-[#57007B]" />,
      title: "100",
      description: "Projects Successfully Completed",
    },
    {
      icon: <FaClock className="text-4xl text-[#57007B]" />,
      title: "60 Mins",
      description: "Average Response Time",
    },
  ],

  // 🔵 Working Cycle Section
  workingCycle: [
    {
      icon: <FaSearch className="text-4xl text-[#57007B]" />,
      title: "01 - Discovery",
      description:
        "Understanding your idea, market, and goals for tailored solutions.",
    },
    {
      icon: <FaCode className="text-4xl text-[#57007B]" />,
      title: "02 - Development",
      description: "Agile development of high-quality, scalable software.",
    },
    {
      icon: <FaRocket className="text-4xl text-[#57007B]" />,
      title: "03 - Deployment",
      description: "Secure and optimized deployment with full testing.",
    },
    {
      icon: <FaWrench className="text-4xl text-[#57007B]" />,
      title: "04 - Maintenance",
      description: "Ongoing updates, monitoring, and customer support.",
    },
  ],
};
