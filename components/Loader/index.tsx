import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full absolute w-full bg-indigo-600 bg-opacity-25">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      <p className="mt-4">Loading ...</p>
    </div>
  );
};

export default Loader;
