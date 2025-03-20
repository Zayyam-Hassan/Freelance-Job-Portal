import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 3,
    slidesToScroll: arrowsScroll || 1,
    arrows: true,
  };

  return (
    <div className="flex justify-center py-10 bg-gray-100">
      <div className="w-full max-w-6xl">
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

export default Slide;
