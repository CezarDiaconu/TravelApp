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
  const { setUsername, setEmail, setPassword, setId, setToken } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending request to check user credentials and get the token
      const response = await axios.post('http://localhost:8080/checkUser', {
        username: localUsername,
        password: localPassword,
      });

      // If the user exists and token is received in the response
      if (response.data === "User exists!") {
        
        const getToken = await axios.post('http://localhost:8080/getToken', {
          username: localUsername,
      });
        const token = getToken.data; // Extract the token from the response
        
        // Update context with the user details and token
        setUsername(localUsername);
        setPassword(localPassword);
        setToken(token); // Update the token in context

        // Store user credentials and token in sessionStorage
        sessionStorage.setItem("username", localUsername);
        sessionStorage.setItem("password", localPassword);
        sessionStorage.setItem("token", token); // Store token

        try {
          const response2 = await axios.post('http://localhost:8080/sendEmail', {
            username: localUsername,
            password: localPassword,
          });
          setEmail(response2.data);
        } catch (error) {
          console.error('Axios error:', error.message);
        }

        try {
          const response3 = await axios.post('http://localhost:8080/sendId', {
            username: localUsername,
            password: localPassword,
          });
          setId(response3.data);
        } catch (error) {
          console.error('Axios error:', error.message);
        }

        // Redirect to home page after successful sign-in
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
      <div className='signin-container'>
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
    </div>
  );
}

export default SignIn;
