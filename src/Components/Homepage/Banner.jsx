import React from 'react';
import './Homepage.css';
import banner1 from '../Assets/banner1.png';


const Banner = () => {
  return (
    <section className="banner">
      <img
  src={banner1} // ✅ This uses the imported file
  alt="Banner for promotion"
  className="banner-img"
/>

    </section>
  );
};

export default Banner;
