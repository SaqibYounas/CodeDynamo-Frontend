export function Box({ icon, image, title, description }) {
  return (
    <div
      className="group p-6 rounded-[35px] shadow-md border bg-[#FAFAFA] text-center flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-[1]"
      style={{
        borderImage: "linear-gradient(to top, #F76680, #57007B) 1",
      }}
    >
      <div className="flex justify-center mb-3">
        {image ? (
          <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-purple-400 transition-transform duration-300 group-hover:-translate-y-1">
            <img src={image} alt={title} className="object-contain w-12 h-12" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-purple-400 transition-transform duration-300 group-hover:-translate-y-1">
            {icon}
          </div>
        )}
      </div>

      <h2
        style={{
          background: "linear-gradient(to right, #F76680, #57007B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-xl font-bold mb-2"
      >
        {title}
      </h2>

      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}

export function Box_Two({ icon, title, description }) {
  return (
    <div
      className="group p-6 rounded-[35px] shadow-md bg-[#FAFAFA] text-center flex flex-col items-center 
      transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border"
      style={{
        borderImage: "linear-gradient(to top, #F76680, #57007B) 1",
        borderImageSlice: 1,
      }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-purple-400 
      transition-transform duration-300 group-hover:-translate-y-1 mb-4 text-4xl text-[#57007B]"
      >
        {icon}
      </div>

      <h2
        style={{
          background: "linear-gradient(to right, #F76680, #57007B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-xl font-bold mb-2"
      >
        {title}
      </h2>

      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  );
}
