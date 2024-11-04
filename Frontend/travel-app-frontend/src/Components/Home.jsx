// src/components/Home.js
import React, { useContext } from 'react';
import Navbar from './Navbar';
import { Context } from '../App';
import '../Styles/Home.css';

function Home() {
  const { username } = useContext(Context);

  return (
    <div className="home-container">
      <Navbar />
      <h1>Home</h1>
      <h2>Hello {username}</h2>
      
      <section className="description">
        <p>Welcome to our Travel App! Here, we provide personalized travel experiences with a focus on security, efficiency, and fair pricing. Explore the world with us and find your next adventure!</p>
      </section>

      <section className="qualities">
        <div className="quality-card">
          <img src="" alt="Security" className="quality-image" />
          <h3>Security</h3>
          <p>Your safety is our priority. We ensure secure transactions and safe travel experiences.</p>
        </div>
        <div className="quality-card">
          <img src="" alt="Efficiency" className="quality-image" />
          <h3>Efficiency</h3>
          <p>Quick booking and excellent customer service for a hassle-free experience.</p>
        </div>
        <div className="quality-card">
          <img src="" alt="Fair Price" className="quality-image" />
          <h3>Fair Price</h3>
          <p>Enjoy amazing trips without breaking the bank. We provide transparent pricing.</p>
        </div>
      </section>

      <section className="social-media">
        <div className="social-card">
          <a href="https://www.linkedin.com/in/cezar-diaconu-b3582b225/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="social-card">
          <a href="https://github.com/CezarDiaconu/TravelApp" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="social-card">
          <a href="https://www.instagram.com/cezar_diaconu/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
