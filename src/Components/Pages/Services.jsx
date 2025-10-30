import { ProfilerWrapper } from './utils/Profiler';
import { staticServices } from './data/Services';
import { Box } from './Box/Box';
import { TechStack } from './Box/TeachStack';

function Services({ showTechStack = true }) {
  return (
    <ProfilerWrapper id="Services" data-testid="profiler">
      <>
        <section className="bg-[#F9F9FF] bg-gradient-to-br py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="inline-flex items-center justify-center gap-2 text-3xl font-bold text-gray-800">
                Our Services
              </h2>
            </div>

            <div className="mx-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        {showTechStack && <TechStack />}
      </>
    </ProfilerWrapper>
  );
}

export default Services;
