const Loader = () => (
  <>
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="w-16 h-16 border-4 border-t-4 border-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full animate-spin"></div>
      <h2 className="mt-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse">
        Loading...
      </h2>
    </div>
  </>
);

export default Loader;
