import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/SignUp.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post('http://localhost:8080/createUser', {
        username: username,
        email: email,
        password: password,
      });
    } catch (error) {
      console.log("error: " + error.message)
    }
    navigate("/signin");
  };

  return (
    <div>
      <div className='signup-container'>
      <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
            <Link to="/signin">You already have an account? Go to sign in by clicking on this text!</Link>
          </form>
      </div>
    </div>
  );
};

export default SignUp;
