// src/components/SignIn.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../Styles/SignIn.css';
import { Context } from '../App';

function SignIn() {
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const navigate = useNavigate();
  const { setUsername, setEmail, setPassword, setId } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/checkUser', {
        username: localUsername,
        password: localPassword,
      });

      if (response.data === "User exists!") {
        setUsername(localUsername);
        setPassword(localPassword);

         sessionStorage.setItem("username", localUsername);
         sessionStorage.setItem("password", localPassword);

        try {
          const response2 = await axios.post('http://localhost:8080/sendEmail', {
            username: localUsername,
            password: localPassword,
          });
          setEmail(response2.data);
        }catch (error) {
          console.error('Axios error:', error.message);
        }

        try{
          const response3 = await axios.post('http://localhost:8080/sendId', {
            username: localUsername,
            password: localPassword,
          })
          setId(response3.data);
        }catch (error) {
          console.error('Axios error:', error.message);
        }

        navigate("/home");
      } else {
        toast.error("User does not exist or incorrect credentials!");
      }

      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Axios error:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={localPassword}
            onChange={(e) => setLocalPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
