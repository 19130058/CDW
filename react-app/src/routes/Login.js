import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let isLogin = false;
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    axios
      .post('http://localhost:4000/api/login', data)
      .then((response) => {
        const token = response.data.token;
        // Lưu trữ JWT token vào local storage
        localStorage.setItem('token', token);
        console.log(response.data); 
        isLogin =  true;
        navigate('/');
       
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div>
        <button>
          <a href='/'>Back</a>
        </button>
      </div>
      <div className='form-box'>
        <form className='form' onSubmit={handleLogin}>
          <span className='title'>Log in</span>
          <div className='form-container'>
            <input
              name='email'
              type='email'
              className='input'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              name='password'
              type='password'
              className='input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <button type='submit'>Log in</button>
          <div className='form-section'>
            <p>
              Don't have an account? <a href='/SignUp'>Sign Up</a>{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}; export default Login;