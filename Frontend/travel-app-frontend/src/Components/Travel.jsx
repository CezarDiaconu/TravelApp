import React, { useState, useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Context } from '../App';
import '../Styles/Travel.css';

function Travel() {
    
    const { username } = useContext(Context);
    
    const [country, setCountry] = useState('');
    
    const [travels, setTravels] = useState([]);
    const [sortOrder, setSortOrder] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8080/findByCountry', {
              params: {
                country: country
              }
            });
      
            if (response.data != null) {
                console.log(response.data);
                setTravels(response.data);
            } else {
              console.log('something is wrong')
            }
      
            console.log('Response data:', response.data);
          } catch (error) {
            console.error('Axios error:', error.message);
          }
        };

        const handleSort = (order) => {
          setSortOrder(order);
          const sortedTravels = [...travels].sort((a, b) => {
              if (order === 'asc') return a.price - b.price;
              if (order === 'desc') return b.price - a.price;
              return 0;
          });
          setTravels(sortedTravels);
      };  
    

    return (
        <div>
            <Navbar />
            <h1>Travel</h1>
            <h2>Hello {username}</h2>
            <div className="search box">
                <form onSubmit={handleSubmit}>
                    <label>In which country do you want to travel?</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="Germany">Germany</option>
                    <option value="Poland">Poland</option>
                </select>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="sorting">
                <label>Sort by price:</label>
                <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                    <option value="select">Select</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="travel-results">
                {travels.length > 0 ? (
                    <div className="travel-grid">
                        {travels.map((travel) => (
                            <div key={travel.id} className="travel-card">
                                {/* Uncomment if you have imageUrl */}
                                {/* <img src={travel.imageUrl} alt={`${travel.city}`} className="travel-image" /> */}
                                <h3>{travel.country}</h3>
                                <p><strong>City:</strong> {travel.city}</p>
                                <p><strong>Hotel:</strong> {travel.hotel}</p>
                                <p><strong>Date:</strong> {new Date(travel.date).toLocaleDateString()}</p>
                                <p><strong>Price:</strong> {travel.price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No travels found for this country.</p>
                )}
            </div>
        </div>
    )
}

export default Travel;