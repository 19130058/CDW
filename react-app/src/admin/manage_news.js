import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import '../components/manage_news.css'


const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const token = localStorage.getItem('token');

  
  const [selectedNews, setSelectedNews] = useState({
    articleId:'',
    articleTitle: '',
    category: '',
    articleContent: '',
    author: '',
    url: '',
    listSearchKeyword: '',
  });

  useEffect(() => {
    fetchNewsList();
  }, []);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchNewsList = async () => {
    const response = await axios.get('http://localhost:4000/api/article/getAll');
    setNewsList(response.data);
  };

  const handleAddNewsModalClose = () => {
    setSelectedNews({
      articleId:'',
      articleTitle: '',
      category: '',
      articleContent: '',
      author: '',
      url: '',
      listSearchKeyword: '',
    });
    setShowAddNewsModal(false);
  };

  const handleAddNewsModalSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:4000/api/article/create', { 
      ...selectedNews, 
    });
    try {
      await axios.post('http://localhost:4000/api/article/create', { 
        ...selectedNews, 
      });
      setShowAddNewsModal(false);
      fetchNewsList();
    } catch (error) {
      alert('Error creating news!');
      console.error(error);
    }
  };  
  

  const deleteNews = async (articleId) => {
    await axios.delete(`http://localhost:4000/api/article/delete/${articleId}`);
    fetchNewsList();
};
  


return (
      <div className="manage-container">
      <div className="news-list">
      <Button variant="primary" onClick={() => setShowAddNewsModal(true)}>Add News</Button>
      <Table striped bordered hover>
        <thead className="manageform">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Category</th>
            <th>Content</th>
            <th>Author</th>
            <th>URL</th>
            <th>Keywords</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => (
            <tr key={news.articleId}>
              <td>{news.articleId}</td>
              <td>{news.articleTitle}</td>
              <td>{news.category}</td>
              <td>{news.articleContent}</td>
              <td>{news.author}</td>
              <td>{news.url}</td>
              <td>{news.listSearchKeyword && news.listSearchKeyword.join(', ')}</td>
              <td>
                <Button variant="danger" onClick={() => deleteNews(news.articleId)}>Delete</Button>
                </td>
                </tr>
                ))}
                </tbody>
                </Table>
                <Modal className="custom-modal" show={showAddNewsModal} onHide={handleAddNewsModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add News</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form className="custom-form" onSubmit={handleAddNewsModalSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={selectedNews.articleTitle} onChange={(event) => setSelectedNews({ ...selectedNews, articleTitle: event.target.value })} />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder="Enter category" value={selectedNews.category} onChange={(event) => setSelectedNews({ ...selectedNews, category: event.target.value })} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" placeholder="Enter content" value={selectedNews.articleContent} onChange={(event) => setSelectedNews({ ...selectedNews, articleContent: event.target.value })} />
          </Form.Group>  
        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control  type="text" placeholder="Enter author" value={selectedNews.author} onChange={(event) => setSelectedNews({ ...selectedNews, author: event.target.value })} />
        </Form.Group>
        <Form.Group controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="Enter URL" value={selectedNews.url} onChange={(event) => setSelectedNews({ ...selectedNews, url: event.target.value })} />
        </Form.Group>
        <Form.Group controlId="formKeywords">
          <Form.Label>Keywords</Form.Label>
          <Form.Control type="text" placeholder="Enter keywords" value={selectedNews.listSearchKeyword} onChange={(event) => setSelectedNews({ ...selectedNews, listSearchKeyword: event.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Modal.Body>
  </Modal>
  </div>
</div>
); }; export default NewsList; 