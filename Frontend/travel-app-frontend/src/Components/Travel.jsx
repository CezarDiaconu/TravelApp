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


    // Filters Code
    
    const [cityFilter, setCityFilter] = useState([]);

    const handleCityChange = (event) => {
        const { value, checked } = event.target;
        setCityFilter((prev) =>
            checked ? [...prev, value] : prev.filter((city) => city !== value)
        );
    };

    const [priceRange1, setPriceRange1] = useState();
    const [priceRange2, setPriceRange2] = useState();

    const handlePriceRange = (event) => {
        const value = event.target;

        if ( value == "Price Range 1"){
            setPriceRange1(200);
            setPriceRange2(300);
        }
    }

    // Filters Code 

    const fetchTravels = async () => {
        if (country) {
            try {
                const response = await axios.get('http://localhost:8080/findByCountry', {
                  params: { country }
                });

                if (response.data) {
                    setTravels(response.data);
                } else {
                    console.log('Something went wrong while fetching data');
                }

            } catch (error) {
                console.error('Axios error during re-fetch:', error.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetchTravels();

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
    
      const handleBook = async (travelId) => {
        try {
            const id = sessionStorage.getItem("id"); 
            console.log("travelId : " + travelId + " userId : " + id);
            if (!id) {
                alert("User not logged in!");
                return;
            }  
            const response = await axios.post(`http://localhost:8080/addTravel/${id}/${travelId}`);
            console.log(response.data); 

            const response1 = await axios.post(`http://localhost:8080/bookTravel/${travelId}`);
            console.log(response1.data);

            fetchTravels();

        } catch (error) {
            console.error("Error booking travel:", error);
            alert("Failed to book travel.");
        }
    };

    return (
        <div>
            <Navbar />
                <div className="filters-container">
                    <label>Select which city would you like to visit</label>
                    <label>
                        <input
                            type="checkbox"
                            value="Berlin"
                            onChange={handleCityChange}
                            checked={cityFilter.includes("Berlin")}
                        />
                        Berlin
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Munich"
                            onChange={handleCityChange}
                            checked={cityFilter.includes("Munich")}
                        />
                        Munich
                    </label>

                    <label>Select which price range you wish</label>
                    <label>
                        <input 
                        type="checkbox"
                        value="Price Range 1"
                        onChange={handlePriceRange}
                        checked="Price Range 1"
                        />
                        200-300$
                    </label>
                    <label>
                        <input 
                        type="checkbox"
                        value="Berlin"
                        onChange={handleCityChange}
                        checked={cityFilter.includes("Berlin")}
                        />
                        300-400$
                    </label>
                    <label>
                        <input 
                        type="checkbox"
                        value="Berlin"
                        onChange={handleCityChange}
                        checked={cityFilter.includes("Berlin")}
                        />
                        400-500$
                    </label>
                    <label>
                        <input 
                        type="checkbox"
                        value="Berlin"
                        onChange={handleCityChange}
                        checked={cityFilter.includes("Berlin")}
                        />
                        500-600$
                    </label>
                    <label>
                        <input 
                        type="checkbox"
                        value="Berlin"
                        onChange={handleCityChange}
                        checked={cityFilter.includes("Berlin")}
                        />
                        600-700$
                    </label>
                    <div className="sorting">
                        <label>Sort by price:</label>
                        <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                            <option value="select">Select</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                <div className="container">
                <h2>Hello {username}</h2>
                    <div className="search-box">
                        <form onSubmit={handleSubmit}>
                            <label>In which country do you want to travel?</label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="select">Select</option>
                                <option value="Germany">Germany</option>
                                <option value="Poland">Poland</option>
                            </select>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>

                <div className="container2">
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
                                        <p><strong>Remaining spots:</strong> {travel.numberOfRemainingSpots}</p>
                                        <button className="book-button" onClick={() => handleBook(travel.id)}>Book Now</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h2>Please select a country</h2>
                        )}
                    </div>
            </div>
        </div>
    )
}

export default Travel;