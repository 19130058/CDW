import React, {useState,useEffect} from 'react';
import HotNews from "../components/HotNews"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import axios from 'axios';
import { Link } from 'react-router-dom';

function World() {
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:4000/api/article/category/world')
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
                <li key={n.id}>
                  <Link to={`/news/${n.id}`}>
                    <img src={n.url} alt={n.title} />
                  </Link>
                  <h>{n.title}</h>
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

export default World;
