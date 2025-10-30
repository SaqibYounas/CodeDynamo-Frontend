export function Box({ icon, image, title, description }) {
  return (
    <div
      className="group flex flex-col items-center rounded-[35px] border bg-[#FAFAFA] p-6 text-center shadow-md transition-all duration-300 hover:scale-[1] hover:shadow-xl"
      style={{
        borderImage: 'linear-gradient(to top, #F76680, #57007B) 1',
      }}
    >
      <div className="mb-3 flex justify-center">
        {image ? (
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-purple-400 transition-transform duration-300 group-hover:-translate-y-1">
            <img src={image} alt={title} className="h-12 w-12 object-contain" />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-400 text-2xl transition-transform duration-300 group-hover:-translate-y-1">
            {icon}
          </div>
        )}
      </div>

      <h2
        style={{
          background: 'linear-gradient(to right, #F76680, #57007B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className="mb-2 text-xl font-bold"
      >
        {title}
      </h2>

      <p className="mb-4 text-gray-600">{description}</p>
    </div>
  );
}

export function Box_Two({ icon, title, description }) {
  return (
    <div
      className="group flex flex-col items-center rounded-[35px] border bg-[#FAFAFA] p-6 text-center shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      style={{
        borderImage: 'linear-gradient(to top, #F76680, #57007B) 1',
        borderImageSlice: 1,
      }}
    >
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-purple-400 text-4xl text-[#57007B] transition-transform duration-300 group-hover:-translate-y-1">
        {icon}
      </div>

      <h2
        style={{
          background: 'linear-gradient(to right, #F76680, #57007B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className="mb-2 text-xl font-bold"
      >
        {title}
      </h2>

      <p className="text-sm text-gray-600 sm:text-base">{description}</p>
    </div>
  );
}
