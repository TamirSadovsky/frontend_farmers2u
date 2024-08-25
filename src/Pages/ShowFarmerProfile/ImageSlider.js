import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

const slideStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
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
  WebkitTextStroke: "0.2rem #000",
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
  WebkitTextStroke: "0.2rem #000",
};

const deleteImageStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  fontSize: "1.5rem",
  color: "#ff6347",
  cursor: "pointer",
  height: "20px",
  zIndex: 2,
};

const addImageButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "1.5rem",
  color: "#fff",
  cursor: "pointer",
  zIndex: 2,
  backgroundColor: "#007bff",
  padding: "8px",
  borderRadius: "50%",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

const ImageSlider = ({ initialSlides, sliderKey, farm, handleDeleteImages, handleAddImages, farmOrProducts }) => {
  const [filteredSlides, setFilteredSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(initialSlides) && initialSlides.length > 0) {
      setFilteredSlides(initialSlides.filter(slide => slide !== ''));
    } else {
      setFilteredSlides([]);
    }
  }, [initialSlides]);

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

  const handleDeleteImage = (indexToDelete) => {
    const updatedSlides = filteredSlides.filter((_, index) => index !== indexToDelete);
    setCurrentIndex(currentIndex >= updatedSlides.length ? Math.max(0, updatedSlides.length - 1) : currentIndex);
    setFilteredSlides(updatedSlides);
    handleDeleteImages(indexToDelete, farmOrProducts);
  };

  const handleAddImage = (e) => {
    const newImages = Array.from(e.target.files);
    
    if (newImages.length > 0) {
      const imageUrls = newImages.map((image) => URL.createObjectURL(image));
      const updatedSlides = [...filteredSlides];
      
      // Determine the correct index to insert the new images
      const clickIndex = currentIndex < filteredSlides.length ? currentIndex + 1 : filteredSlides.length;
      
      updatedSlides.splice(clickIndex, 0, ...imageUrls);
      setFilteredSlides(updatedSlides);
      
      // Find the index of the first new image in updatedSlides
      const addedImageIndex = updatedSlides.indexOf(imageUrls[0]);
      setCurrentIndex(addedImageIndex);
      
      // Debugging logs
      console.log('Updated Slides:', updatedSlides);
      console.log('Image URLs:', imageUrls);
      console.log('Added Image Index:', addedImageIndex);
      
      handleAddImages(newImages, sliderKey, clickIndex, farmOrProducts, updatedSlides);
    }
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${filteredSlides[currentIndex]})`,
  };

  const shouldRenderControls = filteredSlides.length > 0;

  return (
    <div key={sliderKey} style={sliderStyles}>
      {shouldRenderControls && (
        <div>
          <div className="rightArrow" onClick={goToPrevious} style={rightArrowStyles}>
            ❰
          </div>
          <div onClick={goToNext} style={leftArrowStyles}>
            ❱
          </div>
        </div>
      )}

      {shouldRenderControls && (
        <div style={slideStylesWidthBackground}>
          {farm === false && (
            <div style={deleteImageStyle} onClick={() => handleDeleteImage(currentIndex)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          )}
        </div>
      )}

      {farm === false && (
        <div style={addImageButtonStyle}>
          <label htmlFor={`fileInput-${sliderKey}`}>
            <FontAwesomeIcon icon={faPlus} />
          </label>
          <input
            type="file"
            id={`fileInput-${sliderKey}`}
            style={{ display: 'none' }}
            onChange={handleAddImage}
            multiple
          />
        </div>
      )}

      {shouldRenderControls && (
        <div style={dotsContainerStyles}>
          {filteredSlides.map((_, slideIndex) => (
            <div
              style={{ ...dotStyle, color: currentIndex === slideIndex ? 'orange' : 'black' }}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;