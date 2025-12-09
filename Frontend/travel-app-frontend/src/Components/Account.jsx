import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import axios from "axios";
import { Context } from '../App';
import '../Styles/Account.css'; 

function Account() {
    const { username, email, password, role, setUsername, setEmail, setPassword } = useContext(Context); 
    const [whatToUpdate, setWhatToUpdate] = useState("");
    const [infoToUpdate, setInfoToUpdate] = useState("");
    const [showAccountInfo, setShowAccountInfo] = useState(false);
    const [showEditOptions, setShowEditOptions] = useState(false);
    const [showActualPassword, setShowActualPassword] = useState(false);

    const [bookings, setBookings] = useState([]);
    const id = sessionStorage.getItem("id");

    useEffect(() => {
        fetchUserBookings();
    }, []); 

    const fetchUserBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/${id}/bookings`);
            setBookings(response.data); 
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        
        // 1. Show the confirmation box
        const isConfirmed = window.confirm("Are you sure you want to delete this booking?");

        // 2. Only proceed if the user clicked OK (isConfirmed is true)
        if (isConfirmed) {
            try {
                const userId = sessionStorage.getItem("id"); 
                if (!userId) return;

                // Existing deletion logic
                await axios.delete(`http://localhost:8080/user/${userId}/bookings/${bookingId}`);
                
                // Update the state to remove the booking from the UI
                setBookings(bookings.filter((b) => b.id !== bookingId));
                
            } catch (error) {
                console.error("Error removing booking:", error);
                // Optionally, alert the user of the failure
                alert("Failed to delete booking. Please try again.");
            }
        }
        // If the user clicks 'Cancel', the function simply returns, and nothing happens.
    };

    const handleChangeSelection = (event) => {
        setWhatToUpdate(event.target.value);
    };
    
    const handleInputChange = (event) => {
        setInfoToUpdate(event.target.value);
    };

    const handleSubmit = () => {
        if (!infoToUpdate) {
            alert("Please enter the new information first.");
            return;
        }

        const message = `Are you sure you want to change your ${whatToUpdate} to: "${infoToUpdate}"?`;

        const isConfirmed = window.confirm(message);

        if (isConfirmed) {
            axios.patch('http://localhost:8080/updateUser', {
                username,
                password,
                whatToUpdate,
                infoToUpdate
            }).then(response => {
                switch(whatToUpdate) {
                    case "username": setUsername(infoToUpdate); break;
                    case "email": setEmail(infoToUpdate); break;
                    case "password": setPassword(infoToUpdate); break;
                    default: break;
                }
                alert("Update successful!");
                setInfoToUpdate(""); 
            }).catch(error => {
                console.error("Error updating user:", error);
                alert("An error occurred while updating. Please try again.");
            });
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Account</h1>

            {/* --- BOOKINGS --- */}
            <h2>My Bookings</h2>
            {bookings.length > 0 ? (
                <div className="booking-container">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <h3>Travel: {booking.travel.country} - {booking.travel.city} - {booking.travel.hotel}</h3>
                            <p><strong>Arrival:</strong> {booking.arrivalDate}</p>
                            <p><strong>Departure:</strong> {booking.departureDate}</p>
                            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                            <button 
                                className="delete-button" 
                                onClick={() => handleDeleteBooking(booking.id)} >
                                Delete Booking
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-bookings">No bookings yet.</p>
            )}

            {/* --- ACCOUNT INFO --- */}
            <div className="checkbox-container">
                <label>
                    <input 
                        type="checkbox" 
                        checked={showAccountInfo} 
                        onChange={() => setShowAccountInfo(!showAccountInfo)} 
                    />
                    Show Account Info
                </label>
            </div>

            {showAccountInfo && (
                <div className="account-box">
                    <h2>User Details</h2>
                    <div className="account-info">
                        <div className="info-item">
                            <label>Username:</label>
                            <span>{username}</span>
                        </div>
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{email}</span>
                        </div>
                        <div className="info-item">
                            <label>Password:</label>
                            <span>{showActualPassword ? password : "****"}</span>
                        </div>
                        <div className="password-reveal-wrapper">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={showActualPassword} 
                                    onChange={() => setShowActualPassword(!showActualPassword)} 
                                />
                                Show Password
                            </label>
                        </div>
                        <div className="info-item">
                            <label>Account status:</label>
                            <span>User</span>
                        </div>
                    </div>

                    <div className="checkbox-container">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={showEditOptions} 
                                onChange={() => setShowEditOptions(!showEditOptions)} 
                            />
                            Edit Account Info
                        </label>
                    </div>

                    {showEditOptions && (
                        <div className="account-actions">
                            <label htmlFor="change-select">Select an option to change:</label>
                            <select
                                id="change-select"
                                value={whatToUpdate}
                                onChange={handleChangeSelection}
                            >
                                <option value="">--Select--</option>
                                <option value="username">Change Username</option>
                                <option value="email">Change Email</option>
                                <option value="password">Change Password</option>
                            </select>
                            <label htmlFor="info-input">Update Info:</label>
                            <input 
                                type="text" 
                                value={infoToUpdate} 
                                onChange={handleInputChange}
                            />
                            <button 
                                className="action-button" 
                                onClick={handleSubmit} 
                                disabled={!whatToUpdate}
                            >
                                Confirm Change
                            </button>
                        </div>
                    )}
                </div>
            )}

            {role === "admin" && (
                <div className="admin-container">
                    <div className='signout'>
                        <Link to='/admin'>Go to Admin Page</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Account;
