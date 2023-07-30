import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-1 bg-white ">
      <div
        className="h-full bg-blue-500 transition-all duration-75 ease-linear"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
