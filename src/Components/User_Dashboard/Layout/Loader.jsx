const Loader = () => (
  <>
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <div className="border-gradient-to-r h-16 w-16 animate-spin rounded-full border-4 border-t-4 from-pink-500 via-purple-500 to-blue-500"></div>
      <h2 className="mt-4 animate-pulse bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-lg font-semibold text-transparent">
        Loading...
      </h2>
    </div>
  </>
);

export default Loader;
