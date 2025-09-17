import React, { useState, useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Context } from '../App';
import '../Styles/Travel.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Travel() {
    
    const { username } = useContext(Context);
    const userId = sessionStorage.getItem("id");

    const [country, setCountry] = useState('');
    const [travels, setTravels] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [priceRange, setPriceRange] = useState({ min: null, max: null });
    const [availableCities, setAvailableCities] = useState([]);
    const [calendarValue, calendarValueOnChange] = useState(new Date());

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [numberOfPersons, setNumberOfPersons] = useState(1);

    // Filters
    const [cityFilter, setCityFilter] = useState([]);

    const handleCityChange = (event) => {
        const { value, checked } = event.target;
        setCityFilter((prev) =>
            checked ? [...prev, value] : prev.filter((city) => city !== value)
        );
    };

    // Fetch Travels
    const fetchTravels = async () => {
    if (country) {
        try {
            const response = await axios.get('http://localhost:8080/findByCountry', {
                params: { country }
            });

            if (Array.isArray(response.data)) {
                setTravels(response.data);
                const uniqueCities = [...new Set(response.data.map(t => t.city))];
                setAvailableCities(uniqueCities);
            } else {
                console.log("Unexpected response format:", response.data);
                setTravels([]); // fallback to empty array
            }
        } catch (error) {
            console.error('Axios error during re-fetch:', error.message);
            setTravels([]); // important: reset travels to []
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
            if (order === 'asc') return a.pricePerPerson - b.pricePerPerson;
            if (order === 'desc') return b.pricePerPerson - a.pricePerPerson;
            return 0;
        });
        setTravels(sortedTravels);
    };
      
    const handlePriceRange = (event) => {
        const { value, checked } = event.target;
        if (checked) { 
            const [min, max] = value.split("-").map(v => v === "+" ? null : parseInt(v));
            setPriceRange({ min, max });
        } else {
            setPriceRange({ min: null, max: null });
        }
    };
    
    const handleBook = async (travelId) => {
        try {
            const id = sessionStorage.getItem("id"); 
            console.log("travelId : " + travelId + " userId : " + id);
            if (!id) {
                alert("User not logged in!");
                return;
            }  
            
            

            const response2 = await fetch("http://localhost:8080/createBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    arrivalDate: arrivalDate,
                    departureDate: departureDate,
                    numberOfPersons: numberOfPersons,
                    travel: { id: travelId },
                    user: { id: userId } 
                })
            });

            if (!response2.ok) {
                alert("Error creating booking");
                return;
            } else{
                alert("Booking successful!");
            }

            fetchTravels();

        } catch (error) {
            console.error("Error booking travel:", error);
            alert("Failed to book travel.");
        }
    };

   const filteredTravels = Array.isArray(travels) 
    ? travels.filter(t => {
        if (cityFilter.length > 0 && !cityFilter.includes(t.city)) return false;
        if (priceRange.min !== null && t.pricePerPerson < priceRange.min) return false;
        if (priceRange.max !== null && t.pricePerPerson > priceRange.max) return false;
        return true;
    })
  : [];

    return (
        <div>
            <Navbar />
            <div className="page-layout">
                <div className="container">
                    <h2>Hello {username}</h2>
                    <div className="search-box">
                        <form onSubmit={handleSubmit}>
                            <label>In which country do you want to travel?</label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="select">Select</option>
                                <option value="Germany">Germany</option>
                                <option value="Poland">Poland</option>
                                <option value="France">France</option>
                            </select>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>    
                    
                <div className="calendar-wrapper">
                    <Calendar onChange={calendarValueOnChange} value={calendarValue} />
                </div>

                {travels.length > 0 ? (
                    <div className="cities">
                        <label>Select which city would you like to visit</label>
                        {availableCities.map(city => (
                        <label key={city}>
                            <input
                                type="checkbox"
                                value={city}
                                onChange={handleCityChange}
                                checked={cityFilter.includes(city)}
                            />
                            {city}
                        </label>
                        ))}
                    </div> 
                ) : (
                    <h2>Please select a country</h2>
                )}

                <div className="filters-container">        
                    <label>Select which price range you wish</label>
                    <label>
                        <input 
                            type="checkbox"
                            value="200-400"
                            onChange={handlePriceRange}
                            checked={priceRange.min === 200 && priceRange.max === 400}
                        />
                        200-400$
                    </label>
                    <label>
                        <input 
                            type="checkbox"
                            value="400-600"
                            onChange={handlePriceRange}
                            checked={priceRange.min === 400 && priceRange.max === 600}
                        />
                        400-600$
                    </label>
                    <label>
                        <input 
                            type="checkbox"
                            value="600-800"
                            onChange={handlePriceRange}
                            checked={priceRange.min === 600 && priceRange.max === 800}
                        />
                        600-800$
                    </label>
                    <label>
                        <input 
                            type="checkbox"
                            value="800-1200"
                            onChange={handlePriceRange}
                            checked={priceRange.min === 800 && priceRange.max === 1200}
                        />
                        800-1200$
                    </label>
                    <label>
                        <input 
                            type="checkbox"
                            value="1200-+"
                            onChange={handlePriceRange}
                            checked={priceRange.min === 1200 && priceRange.max === null}
                        />
                        1200$+
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

                <div className="container2">
                    <div className="travel-results">
                        {travels.length > 0 ? (
                            <div className="travel-grid">
                                {filteredTravels.map((travel) => (
                                    <div key={travel.id} className="travel-card">
                                        <h3>{travel.country}</h3>
                                        <p><strong>City:</strong> {travel.city}</p>
                                        <p><strong>Hotel:</strong> {travel.hotel}</p>
                                        <p><strong>Price per Night:</strong> {travel.pricePerPerson}</p>
                                        <p><strong>Remaining spots:</strong> {travel.numberOfRemainingSpots}</p>

                                        {/* new inputs for booking */}
                                        <label>Arrival Date:</label>
                                        <input
                                            type="date"
                                            value={arrivalDate}
                                            onChange={(e) => setArrivalDate(e.target.value)}
                                        />

                                        <label>Departure Date:</label>
                                        <input
                                            type="date"
                                            value={departureDate}
                                            onChange={(e) => setDepartureDate(e.target.value)}
                                        />

                                        <label>Number of Persons:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={numberOfPersons}
                                            onChange={(e) => setNumberOfPersons(parseInt(e.target.value))}
                                        />

                                        <button className="book-button" onClick={() => handleBook(travel.id)}>
                                            Book Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h2>Please select a country</h2>
                        )}
                    </div>
                </div>       
            </div>
        </div>
    )
}

export default Travel;
