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
      
      <div className="welcome-container">
        <img src="/Images/TravelApp.png" alt="Travel App" className="logo" />
        <div className="welcome-text">
            <h3>Welcome to Travel App, {username}</h3>
            <p>Discover breathtaking destinations, plan hassle-free trips, and experience travel like never before. With our smart recommendations and seamless booking system, your next adventure is just a few clicks away!</p>
      </div>
    </div>

      <h2>Popular Travel Destinations</h2>

      <div className="popular-destinations-container">
        <div className='popular-destinations-card'>
          <img src="/Images/CologneCathedral.jpg" alt="Cologne" className="city-image" />
            <h3>Cologne</h3>
            <p>A historic German city famous for its stunning Cologne Cathedral, vibrant arts scene, and the annual Carnival celebration.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/Paris.jpg" alt="Paris" className="city-image" />
            <h3>Paris</h3>
            <p>The "City of Light," known for its iconic Eiffel Tower, world-class museums like the Louvre, and charming cafés along the Seine.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/London.jpg" alt="London" className="city-image" />
            <h3>London</h3>
            <p>A diverse metropolis rich in history, featuring landmarks like Big Ben, Buckingham Palace, and the River Thames.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/Rome.jpg" alt="Rome" className="city-image" />
            <h3>Rome</h3>
            <p>The Eternal City, home to ancient wonders like the Colosseum, the Vatican, and breathtaking Renaissance architecture.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/Berlin.jpg" alt="Berlin" className="city-image" />
            <h3>Berlin</h3>
            <p>A vibrant mix of history and modern creativity—think edgy street art, buzzing nightlife, and iconic landmarks that tell a story of transformation.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/Warsaw.jpg" alt="Warsaw" className="city-image" />
            <h3>Warsaw</h3>
            <p>A resilient city that blends a reconstructed historic charm with a modern, forward-thinking spirit. Explore its chic cafes, museums, and dynamic urban vibes.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/Barcelona.jpg" alt="Barcelona" className="city-image" />
            <h3>Barcelona</h3>
            <p>Bursting with Mediterranean energy, Barcelona dazzles with Gaudí’s whimsical architecture, bustling markets, tasty tapas, and a lively beach scene.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/Vienna.jpg" alt="Vienna" className="city-image" />
            <h3>Vienna</h3>
            <p>A charming blend of imperial elegance and contemporary cool, where classical music, stunning palaces, and cozy coffee houses make every day feel special.</p>
        </div>
        <div className='popular-destinations-card'>
            <img src="/Images/Prague.jpg" alt="Prague" className="city-image" />
            <h3>Prague</h3>
            <p>Often called the “City of a Hundred Spires,” Prague offers a fairytale atmosphere with its winding cobblestone streets, medieval architecture, and vibrant cultural scene.</p>
        </div>
      </div>
      
      <h2>Good to Know</h2>
      <section className="policies-container">
        <div className="policy-card">
            {/* You can add an image here later if you want, e.g., <img src="/Images/calendar.png" /> */}
            <h3>Cancellation Policy</h3>
            <p>We value flexibility. Most stays offer <strong>Free cancellation</strong> up to 24h before arrival. Non-refundable options are clearly marked.</p>
        </div>
        <div className="policy-card">
            {/* You can add an image here later if you want, e.g., <img src="/Images/clock.png" /> */}
            <h3>Check-in & Check-out</h3>
            <p>Plan your arrival smoothly:<br />
            <strong>Check-in:</strong> After 14:00<br />
            <strong>Check-out:</strong> Before 12:00</p>
        </div>
      </section>

      <h2>Why should you choose us?</h2>

      <section className="qualities">
        <div className="quality-card">
          <img src="/Images/security.png" alt="Security" className="quality-image" />
          <h3>Security</h3>
          <p>Your safety is our priority. We ensure secure transactions and safe travel experiences.</p>
        </div>
        <div className="quality-card">
          <img src="/Images/efficiency.png" alt="Efficiency" className="quality-image" />
          <h3>Efficiency</h3>
          <p>Quick booking and excellent customer service for a hassle-free experience.</p>
        </div>
        <div className="quality-card">
          <img src="/Images/fairPrice.jpg" alt="Fair Price" className="quality-image" />
          <h3>Fair Price</h3>
          <p>Enjoy amazing trips without breaking the bank. We provide transparent pricing.</p>
        </div>
      </section>

      <div className='down-container'>
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
    </div>
  );
}

export default Home;
