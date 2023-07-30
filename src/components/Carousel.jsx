import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../context/carousselContext";
import LightBox from "./LightBox";
import ProgressBar from "./ProgressBar";

const Carousel = ({ slides }) => {
  const timer = 10000;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { state, next, prev, setCurrentIndex } = useGlobalContext();
  const [progressArray, setProgressArray] = useState(
    slides.map(() => ({ progress: 0 }))
  );
  const { currentIndex } = state;
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Function to reset the progress of the current slide to 100
  const resetProgress = () => {
    setProgressArray((prevArray) => {
      const updatedArray = [...prevArray];
      updatedArray[currentIndex].progress = 0;
      /* updatedArray[currentIndex].progress = 100; */
      return updatedArray;
    });
  };

  useEffect(() => {
    const startAutoplay = () => {
      requestRef.current = requestAnimationFrame(animate);
    };

    const stopAutoplay = () => {
      cancelAnimationFrame(requestRef.current);
    };

    if (!isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [next, isHovered, currentIndex]);

  // Progress Bar Animation
  /* const animate = (timestamp) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;
      const updatedProgress =
        progressArray[currentIndex].progress - (deltaTime / timer) * 100;
      if (updatedProgress >= 0) {
        setProgressArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[currentIndex].progress = updatedProgress;
          return updatedArray;
        });
      } else {
        // If the progress is negative, move to the next slide
        next();
        resetProgress();
      }
    }

    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  }; */

  const animate = (timestamp) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;
      const updatedProgress =
        progressArray[currentIndex].progress + (deltaTime / timer) * 100;
      if (updatedProgress <= 100) {
        setProgressArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[currentIndex].progress = updatedProgress;
          return updatedArray;
        });
      } else {
        // If the progress exceeds 100, move to the next slide
        next();
        resetProgress();
      }
    }

    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  };

  // Handler for thumbnail click
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(false);
    // Reset the progress for the current thumbnail when it's clicked
    resetProgress();
  };

  return (
    <div className="bg-gray-200 p-4">
      <div className="max-w-md mx-auto">
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`cursor-pointer absolute top-40 left-0 w-full h-full opacity-0 transition-opacity duration-300 ${
                index === currentIndex ? "opacity-100" : "pointer-events-none"
              }`}
            >
              <img src={slide} alt="image" onClick={openLightbox} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => {
              prev();
              setIsLightboxOpen(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <button
            onClick={() => {
              next();
              setIsLightboxOpen(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-20 h-20 ml-2 cursor-pointer border ${
              index === currentIndex ? "border-blue-500" : "border-none"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            {index === currentIndex && (
              <div className="w-full ">
                <ProgressBar progress={progressArray[currentIndex].progress} />
              </div>
            )}
            <img
              src={slide}
              alt={`thumbnail-${index}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <LightBox image={slides[currentIndex]} onClose={closeLightbox} />
      )}
    </div>
  );
};

export default Carousel;
