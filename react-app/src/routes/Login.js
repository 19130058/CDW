import React, { useState } from 'react';
import '../components/Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    console.log(username, password);
  }

  return (
    <div>
    <div>
        <button>
            <a href='/' >Back</a>
        </button>
    </div>
    <div class="form-box">
      <form class="form">
          <span class="title">Log in</span>
          <div class="form-container">
            <input type="email" class="input" placeholder="Email"/>
            <input type="password" class="input" placeholder="Password"/>
          </div>
          <button>Sign up</button>
          <div class="form-section">
          <p>Don't have an account? <a href="/SignUp">Log in</a> </p>
          </div>
      </form>
      </div>
    </div>
  );
}
export default Login;

