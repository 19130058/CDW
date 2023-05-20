import './HotnewsStyles.css';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const HotNews = () => {
  return (
    
    <Slider {...settings}>
      <div>
        <a href='/' alt="Slide 1"> <img src="https://placeimg.com/640/480/animals" alt="Slide 1"/></a> 
        <h2>Title 1</h2>
      </div>
      <div>
        <a href='/' alt="Slide 2"> <img src="https://placeimg.com/640/480/nature" alt="Slide 2"/></a> 
        <h2>Title 2</h2>
      </div>
      <div>
        <a href='/' alt="Slide 3"> <img src="https://placeimg.com/640/480/architecture" alt="Slide 3"/></a> 
        <h2>Title 3</h2>
      </div>
    </Slider>
    
  );
};

export default HotNews
