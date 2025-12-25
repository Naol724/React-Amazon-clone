import React from 'react';
import { Carousel as Slider } from 'react-responsive-carousel';
import { img } from './img/data';
import Classes from'./Carousel.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Carousels() {
  return (
    <div className={Classes.hero_img}>
      <Slider
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((imageItemLink, index) => (
          <img key={imageItemLink} src={imageItemLink} alt={`slide-${index}`} />
        ))}
      </Slider>
      <div className={Classes.hero_img__fadeBottom} />
    </div>
  );
}

export default Carousels;
