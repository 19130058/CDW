
import '../components/NewsDetailsStyles.css';
import HotNews from "../components/HotNews"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from '../components/Comment';

const NewsDetail = ({ articleId }) => {
  const [news, setNews] = useState(null);
  const [comment, setComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(`http://localhost:4000/api/article/get/${articleId}`);
      setNews(response.data);
    };
    fetchNews();
  }, [articleId]);

  const handleAddFavorite = () => {
    setIsFavorite(true);
  };
  
  const handleCommentSubmit = async (e) => {
      e.preventDefault();
      const response = await axios.post(`/api/news/${articleId}/comments`, { content: comment });
      setNews({ ...news, comments: [...news.comments, response.data] });
      setComment('');
    };
  
    if (!news) {
      return <div>404</div>;
    }
  
    return (
      <>
      <div>
        <h1>{news.articleTitle}</h1>
        <p>{news.articleContent}</p>
        <p>Author: {news.author}</p>
        <ul>
          {news.searchkeywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit}>
          <label>
            Comment:
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button
            className="favorite-btn"
            onClick={handleAddFavorite}
            disabled={isFavorite}
          >
            {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
          </button>
        {news.comments.map((comment) => (
          <Comment key={comment.id} author={comment.author} content={comment.content} />
        ))}
      </div>
      <Navbar/>
      <Footer/>
      <HotNews/>
      </>
    );
  };
  
  export default NewsDetail;