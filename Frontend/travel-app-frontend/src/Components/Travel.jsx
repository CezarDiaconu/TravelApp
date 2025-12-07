import React, { useState, useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Context } from '../App';
import '../Styles/Travel.css';
import Calendar from 'react-calendar'; // specific imports if needed
import 'react-calendar/dist/Calendar.css';

function Travel() {
    
    const { username } = useContext(Context);
    const userId = sessionStorage.getItem("id");

    const [country, setCountry] = useState('');
    const [travels, setTravels] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [priceRange, setPriceRange] = useState({ min: null, max: null });
    const [availableCities, setAvailableCities] = useState([]);

    // --- NEW: State for the Modal ---
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingData, setBookingData] = useState(null); // Stores the data temporarily
    // --------------------------------

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
                    setTravels([]);
                }
            } catch (error) {
                console.error('Axios error during re-fetch:', error.message);
                setTravels([]);
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

    // --- NEW: Step 1 - Open the Modal ---
    const initiateBooking = (travelItem) => {
        // Simple validation
        if (!userId) {
            alert("User not logged in!");
            return;
        }
        if (!arrivalDate || !departureDate) {
            alert("Please select arrival and departure dates.");
            return;
        }

        // Prepare the data object
        const dataToConfirm = {
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            numberOfPersons: numberOfPersons,
            travel: travelItem, // We store the whole travel object to show details like Hotel name
            userId: userId
        };

        setBookingData(dataToConfirm);
        setShowBookingModal(true);
    };

    // --- NEW: Step 2 - Send the Request (Moved from handleBook) ---
    const confirmBooking = async () => {
        if (!bookingData) return;

        try {
            const response2 = await fetch("http://localhost:8080/createBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    arrivalDate: bookingData.arrivalDate,
                    departureDate: bookingData.departureDate,
                    numberOfPersons: bookingData.numberOfPersons,
                    travel: { id: bookingData.travel.id },
                    user: { id: bookingData.userId } 
                })
            });

            if (!response2.ok) {
                alert("Error creating booking");
            } else{
                alert("Booking successful!");
                // Close modal and refresh
                setShowBookingModal(false);
                setBookingData(null);
                fetchTravels();
            }

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
                {/* ... existing search and filter UI ... */}
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
                   {/* ... keeping your existing price filters ... */}
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
                    {/* ... other price filters ... */}
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
                                        <img 
                                            src={`/images/${travel.hotel}.png`} 
                                            
                                            alt={travel.hotel} 
                                            className="travel-image"
                                            
                                            onError={(e) => {
                                                e.target.onerror = null; // prevents looping
                                                e.target.src = "/hotels/Berlin.png"; // make sure you create a default.jpg too!
                                            }} 
                                        />
                                        <p><strong>City:</strong> {travel.city}</p>
                                        <p><strong>Hotel:</strong> {travel.hotel}</p>
                                        <p><strong>Price per Night:</strong> {travel.pricePerPerson}</p>
                                        <p><strong>Remaining spots:</strong> {travel.numberOfRemainingSpots}</p>

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

                                        {/* CHANGED: onClick calls initiateBooking instead of handleBook */}
                                        <button className="book-button" onClick={() => initiateBooking(travel)}>
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

            {/* --- NEW: Modal HTML Structure --- */}
            {showBookingModal && bookingData && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Your Booking</h3>
                        <div className="modal-details">
                            <p><strong>Hotel:</strong> {bookingData.travel.hotel}</p>
                            <p><strong>City:</strong> {bookingData.travel.city}</p>
                            <p><strong>Arrival:</strong> {bookingData.arrivalDate}</p>
                            <p><strong>Departure:</strong> {bookingData.departureDate}</p>
                            <p><strong>Persons:</strong> {bookingData.numberOfPersons}</p>
                            <p><strong>Total Estimate:</strong> {bookingData.travel.pricePerPerson * bookingData.numberOfPersons}$</p>
                        </div>
                        <div className="modal-actions">
                            <button className="confirm-btn" onClick={confirmBooking}>Confirm</button>
                            <button className="cancel-btn" onClick={() => setShowBookingModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Travel;