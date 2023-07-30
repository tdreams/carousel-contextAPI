import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  currentIndex: 0,
};

const CarouselContext = createContext();

const carouselReducer = (state, action) => {
  if (action.type === "NEXT_SLIDE") {
    return {
      ...state,
      currentIndex: (state.currentIndex + 1) % action.totalSlides,
    };
  } else if (action.type === "PREV_SLIDE") {
    return {
      ...state,
      currentIndex:
        (state.currentIndex - 1 + action.totalSlides) % action.totalSlides,
    };
  } else if (action.type === "SET_CURRENT_INDEX") {
    return { ...state, currentIndex: action.payload };
  } else {
    return state;
  }
};

const CarouselProvider = ({ children, totalSlides }) => {
  const [state, dispatch] = useReducer(carouselReducer, initialState);

  const next = () => {
    dispatch({ type: "NEXT_SLIDE", totalSlides });
  };

  const prev = () => {
    dispatch({ type: "PREV_SLIDE", totalSlides });
  };

  const setCurrentIndex = (index) => {
    dispatch({ type: "SET_CURRENT_INDEX", payload: index });
  };

  return (
    <CarouselContext.Provider value={{ state, next, prev, setCurrentIndex }}>
      {children}
    </CarouselContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(CarouselContext);
};

export { CarouselContext, CarouselProvider };
