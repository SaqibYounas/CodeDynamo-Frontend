import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProfilerWrapper } from "./utils/Profiler";
import { staticServices } from "./data/staticServices";
import { Box } from "./Box/Box";
import { TechStack } from "./Box/TeachStack";
function Services({ showWhyChoose = true }) {
  return (
    <ProfilerWrapper id="Services">
      <>
        {/* Services Section */}
        <section className=" py-16 bg-gradient-to-br bg-[#F9F9FF]">
          <div className=" container mx-auto px-4 ">
            <div className=" text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 inline-flex items-center justify-center gap-2 ">
                <FaTools className="text-blue-600 text-3xl" />
                Our Services
              </h2>
            </div>

            <div
              className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6"
      
            >
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
      </>{" "}
      <TechStack />
    </ProfilerWrapper>
  );
}

export default Services;
