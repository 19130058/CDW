import React, { useState } from 'react';
import '../components/NewsDetailsStyles.css';
import HotNews from "../components/HotNews"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const NewsDetails = (pros) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddFavorite = () => {
      setIsFavorite(true);
    };
  return (
    <>
    <Navbar/>
    <HotNews/>
    <div className="frame">
      <div className="container">
        <h1 className="title">{pros.title}</h1>
        <img className="image" src={pros.img} alt="News Image" />
        <div className="content">
          <p>{pros.p}</p>
          </div>
          <button
            className="favorite-btn"
            onClick={handleAddFavorite}
            disabled={isFavorite}
          >
            {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
          </button>
          </div>
          <div className="author">Author: John Doe</div>
          </div>
          <Footer/>
      </>
  ) }
  export default NewsDetails