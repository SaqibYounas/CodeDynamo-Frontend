import { Box_Two } from "./Box";

export function Section({ title, boxes, cols = 3, bg = "bg-white" }) {
  return (
    <section className={`py-16 bg-[#FAFAFA]`}>
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
