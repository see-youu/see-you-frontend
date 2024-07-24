const LoadingSpinner = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute w-10 h-10 border-4 border-solid rounded-full left-1/2 border-gray-50 border-t-black animate-spin top-1/2"></div>
    </div>
  );
};

export default LoadingSpinner;
