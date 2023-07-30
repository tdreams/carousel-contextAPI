import React from "react";

const LightBox = ({ image, onClose }) => {
  return (
    <div className="relative top-0 w-full h-full justify-center items-center bg-black bg-opacity-50 ">
      <div className="  max-w-3xl p-4 justify-center mx-auto h-7-middle">
        <img src={image} alt="preview" className="w-full rounded " />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LightBox;
