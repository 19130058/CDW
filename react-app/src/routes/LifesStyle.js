import React, {useState,useEffect} from 'react';
import HotNews from "../components/HotNews"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import axios from 'axios';
import { Link } from 'react-router-dom';

function LifesStyle() {
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:4000/api/article/category/lifesstyle')
      .then(res => {
        setNews(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
      <Navbar />
      <HotNews />
      <div className="frame">
        <div className="container">
          <ul className="news-list">
            {news.map(n => {
              return (
                <li key={n.articleId}>
                  <Link to={`/news/${n.articleId}`}>
                    <img src={n.url} alt={n.articleTitle} />
                  </Link>
                  <h>{n.articleTitle}</h>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LifesStyle;
