/* 
How to use:
Firstly import this:
import ImageSlider from 'relative_path_to_current_directory';

Secondly, you need to define a const of images:
  const slides = [
    { url: image1_url },
    { url: image2_url },
    { url: image3_url },
    { url: image4_url },
    { url: image5_url },
  ];
  imagex_url is either a path string to the url or:
  import imagex_url from './path/to/image.jpg';

  Thirdly, wherever you want the slider to be, write:
    <div style={{
        width: 'width_countpx',
        height: 'height_countpx',
        marginRight: "Right_Distancepx",
        marginLeft: "Left_Distancepx"
        marginTop: "Top_Distancepx"
        marginBottom: "Bottom_Distancepx"


    }}>
        <ImageSlider slides={slides} parentWidth={some_number} />
    </div>
    While parentWidth is essentially the width of the image
    and should be equal to width_count.

    There are images to use as dummy data inside DummyData/ProfilePageImages.
    Ask Gilad for any relevant questions of how to use this slider.
*/


import { useState } from "react";


const slideStyles = {
  width: "100%",
  height: "100%",
  objectit: 'cover',
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "4rem",
  fontWeight: 600,
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  WebkitTextStroke: '0.2rem #000',
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "4rem",
  fontWeight: 600,
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  WebkitTextStroke: '0.2rem #000',
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const ImageSlider = ({ slides, farm }) => {
  const filteredSlides = slides.filter(slide => slide !== '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? filteredSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === filteredSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${filteredSlides[currentIndex]})`,
  };

  return (
    <div style={sliderStyles}>
      {filteredSlides.length >> 1 ? 
      <div>
        <div className="rightArrow" onClick={goToPrevious} style={rightArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={leftArrowStyles}>
          ❱
        </div>
      </div>
      : null}
      <div style={slideStylesWidthBackground}></div>
      <div style={dotsContainerStyles}>
        {filteredSlides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;