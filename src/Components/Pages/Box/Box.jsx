export function Box({ image, title, description}) {
  return (
    <div
      className="group 
                 p-6 rounded-[35px]  shadow-md border bg-[#FAFAFA] 
                 text-center flex flex-col items-center 
                 transition-all duration-300 hover:shadow-xl hover:scale-[1]"
      style={{
        borderImage: "linear-gradient(to right, #F76680, #57007B) 1",
      }}
    >
      {/* Image - Centered */}
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 transition-transform duration-300 group-hover:-translate-y-1 border-purple-400 ">
          <img src={image} alt={title} className="object-contain w-12 h-12" />
        </div>
      </div>

      {/* Title */}
      <h2
        style={{
          background: "linear-gradient(to right, #F76680, #57007B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-xl font-bold mb-2 "
      >
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-4">{description}</p>

     
      </div>
  );
}
