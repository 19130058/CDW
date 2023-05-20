import React, { useState } from 'react';
import '../components/Login.css'

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    function handleSignup() {
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
                    <span class="title">Sign up</span>
                    <span class="subtitle">Create a free account with your email.</span>
                    <div class="form-container">
                    <input type="text" class="input" placeholder="Full Name"/>
                    <input type="email" class="input" placeholder="Email"/>
                    <input type="password" class="input" placeholder="Password"/>
                    </div>
                    <button>Sign up</button>
                    <div class="form-section">
                <p>Have an account? <a href="/LogIn">Log in</a> </p>
                </div>
                </form>
            </div>
        </div>
    );
  } export default Signup