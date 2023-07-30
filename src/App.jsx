import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import photo1 from "/1.jpg";
import photo2 from "/2.jpg";
import photo3 from "/3.jpg";
import photo4 from "/4.jpg";
import photo5 from "/5.jpg";
import photo6 from "/6.jpg";
import photo7 from "/7.jpg";
import photo8 from "/8.jpg";
import { CarouselProvider } from "./context/carousselContext";
import Carousel from "./components/Carousel";

const slides = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

function App() {
  return (
    <div>
      <h1>Carousel Demo</h1>
      <CarouselProvider totalSlides={slides.length}>
        <Carousel slides={slides} />
      </CarouselProvider>
    </div>
  );
}

export default App;
