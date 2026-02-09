import React, { useState } from 'react';
import { Carousel as Slider } from 'react-responsive-carousel';
import { img } from './img/data';
import Classes from './Carousel.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Carousels() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={Classes.hero_img}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Slider
        autoPlay={!isHovered}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        interval={1000}
        transitionTime={300}
        swipeable={true}
        emulateTouch={true}
        stopOnHover={true}
        dynamicHeight={false}
        useKeyboardArrows={true}
        renderItem={(item) => (
          <div className={Classes.slideContainer}>
            {item}
            <div className={Classes.slideOverlay} />
          </div>
        )}
      >
        {img.map((imageItemLink, index) => (
          <div key={imageItemLink} className={Classes.slideWrapper}>
            <img 
              src={imageItemLink} 
              alt={`slide-${index}`}
              className={Classes.slideImage}
            />
            <div className={Classes.slideContent}>
              <h2 className={Classes.slideTitle}>Amazing Deal {index + 1}</h2>
              <p className={Classes.slideDescription}>Discover incredible savings today</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className={Classes.hero_img__fadeBottom} />
    </div>
  );
}

export default Carousels;
