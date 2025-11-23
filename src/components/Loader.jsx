const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-50 transition-all duration-300">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-emerald-400/50 rounded-full animate-spin-reverse"></div>
      </div>
      <p className="text-white text-lg font-medium mt-4 tracking-wider animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
