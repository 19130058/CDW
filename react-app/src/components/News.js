import React from 'react';
import {NewsItems} from"./NewsItems"
import "./NewsStyles.css"

const News = () => {
  return (
    <div>
      <div className="frame">
      <div className="container">
                 <ul className="news-list">
                        {NewsItems.map((item) => {
                        return (
                        <li > 
                            <a  href="/">
                              <img src={item.url} alt={item.title}/>
                            </a>
                            <h>{item.title}</h>
                        </li>    
                        )})}
                    </ul>
        </div>
        </div>
        </div>
  );
};

export default News;