import { useState } from 'react';
import '../components/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleSignup(event) {
        event.preventDefault();
        const data = {
            fullName,
            email,
            phoneNumber,
            password
        };
        axios.post('http://localhost:4000/api/signup', data)
            .then(response => {
                // Lấy JWT token từ kết quả trả về
                const token = response.data.token;
                // Lưu trữ JWT token vào local storage
                localStorage.setItem('token', token);
                console.log('Signup successful');
                // Chuyển hướng đến trang chủ hoặc trang khác tùy vào thiết kế của bạn
                navigate('/Login');
            })
            .catch(error => {
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
            <div className="form-box">
                <form className="form" onSubmit={handleSignup}>
                    <span className="title">Sign up</span>
                    <span className="subtitle">Create a free account with your email.</span>
                    <div className="form-container">
                        <input name="name" type="text" className="input" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <input name="email" type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input
                                        type="tel"
                                        pattern="[0][0-9]{9}"
                                        className="input"
                                        placeholder="Phone number"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                        <input
                                    name="password"
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={8}
                                    required
                                />
                    </div>
                    <button className="button">Sign up</button>
                    <div className="form-section">
                        <p>Have an account? <a href="/LogIn">Log in</a> </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;