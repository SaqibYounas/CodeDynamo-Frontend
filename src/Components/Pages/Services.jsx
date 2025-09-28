import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProfilerWrapper } from "./utils/Profiler";
import { staticServices } from "./data/staticServices";
import { Box } from "./Box/Box";
function Services({ showWhyChoose = true }) {
  return (
    <ProfilerWrapper id="Services">
      <>
        {/* Services Section */}
        <section className=" py-16 bg-gradient-to-br">
          <div className=" container mx-auto px-4">
            <div className=" text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 inline-flex items-center justify-center gap-2">
                <FaTools className="text-blue-600 text-3xl" />
                Our Services
              </h2>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
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
                  </span>
                  ?
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  At <strong>CodeDynamo</strong>, we don't just build
                  software—we engineer success. Our expert developers turn your
                  vision into functional, scalable, and impactful digital
                  products.
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
      </>
    </ProfilerWrapper>
  );
}

export default Services;
