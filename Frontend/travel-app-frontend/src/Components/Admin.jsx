import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import axios from "axios";
import { Context } from '../App';
import '../Styles/Admin.css'; 

function Admin() {

    const [users, setUsers] = useState([]);
    const [travels, setTravels] = useState([]);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [whatToUpdate, setWhatToUpdate] = useState("");
    const [infoToUpdate, setInfoToUpdate] = useState("");

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [hotel, setHotel] = useState("");
    const [pricePerPerson, setPricePerPerson] = useState(0);
    const [numberOfRemainingSpots, setNumberOfRemainingSpots] = useState("0");

    const [activeForm, setActiveForm] = useState(0);


    const updateUser = async () => {
        try {
            const response2 = await axios.patch('http://localhost:8080/updateUser', {
              username: username,
              whatToUpdate: whatToUpdate,
              infoToUpdate: infoToUpdate,
              password: password,
            });

            if (response2.data === "User created successfully!") {
                alert("User created succesfully!");
            } else {
                console.log('Something went wrong while fetching data');
            }

        } catch (error) {
            console.error('Axios error during creating user:', error.message);
        }
    };

    const createUser = async () => {
        try {
            const response3 = await axios.post('http://localhost:8080/createUser', {
              username: username,
              email: email,
              password: password,
            });

            if (response3.data === "User updated successfully!") {
                alert("User created succesfully!");
            } else {
                console.log('Something went wrong while fetching data');
            }

        } catch (error) {
            console.error('Axios error during creating user:', error.message);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await axios.delete("http://localhost:8080/deleteUser", {
                data: { username: username }, 
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.data === "User deleted") {
                alert("User deleted successfully!");
            } else {
                console.log("Something went wrong!");
            }
        } catch (error) {
            console.error("Axios error during deleting user:", error.message);
        }
    };

    const getAllUsers = async () => {
        try {
            const response9 = await axios.get('http://localhost:8080/getAllUsers');
            setUsers(response9.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateTravel = async () => {
        try {
            const response6 = await axios.patch('http://localhost:8080/updateTravel', {
                country: country,
                city: city,
                hotel: hotel,
                whatToUpdate: whatToUpdate,  
                infoToUpdate: infoToUpdate.toString()   
            });

            if (response6.data === "Travel updated!") {
                alert("Travel created succesfully!");
            } else {
                console.log('Something went wrong while fetching data');
            }
        } catch (error) {
            console.log("Something went bad when trying to update the travel");
        }
    };

    const createTravel = async () => {
        try {
            const response7 = await axios.post('http://localhost:8080/createTravel', {
                country: country,
                city: city,
                hotel: hotel,
                pricePerPerson: pricePerPerson
            });

            if (response7.data === "Travel created!") {
                alert("Travel created succesfully!");
            } else {
                console.log('Something went wrong while creating the travel');
            }

        } catch (error) {
            console.log(error);
        }
    };

    const deleteTravel = async () => {
        try {
            const response8 = await axios.delete("http://localhost:8080/deleteTravel", {
                data: { country: country, city: city, hotel: hotel }, 
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response8.data === "Travel deleted") {
                alert("Travel deleted successfully!");
            } else {
                console.log("Something went wrong!");
            }
        } catch (error) {
            console.error("Axios error during deleting travel:", error.message);
        }
    };

    const getAllTravels = async () => {
        try {
            const response10 = await axios.get('http://localhost:8080/getAllTravels');
            setTravels(response10.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="admin-container">
                <div className="admin-user-container">   
                    <button className="admin-button" onClick={() => setActiveForm("1")}>
                        Search User
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("2")}>
                        Update User
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("3")}>
                        Create User
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("4")}>
                        Delete User
                    </button>
                    <button className="admin-button" onClick={() => {
                        getAllUsers();  
                        setActiveForm("9"); 
                        }}>
                        Find All Users
                    </button>
                </div>     
                    
                <div className="admin-travel-container">  
                    <button className="admin-button" onClick={() => setActiveForm("5")}>
                        Search Travel
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("6")}>
                        Update Travel
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("7")}>
                        Create Travel
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("8")}>
                        Delete Travel
                    </button>
                    <button className="admin-button" onClick={() => {
                        getAllTravels();
                        setActiveForm("10")
                        }}>
                        Find All Travels
                    </button>
                </div>      
            </div>

            {activeForm === "2" && (
                <div className="form-container">
                <form onSubmit={updateUser}>    
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
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                    <label>What To Update:</label>
                    <input
                        type="text"
                        value={whatToUpdate}
                        onChange={(e) => setWhatToUpdate(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                    <label>Info To Update:</label>
                    <input
                        type="text"
                        value={infoToUpdate}
                        onChange={(e) => setInfoToUpdate(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit">Update User</button>
                </form>
            </div>
            )}

            {activeForm === "3" && (
                <div className="form-container">
                <form onSubmit={createUser}>    
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
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit">Create User</button>
                </form>
            </div>
            )}

            {activeForm === "4" && (
                <div className="form-container">
                <form onSubmit={deleteUser}>    
                    <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit">Delete User</button>
                </form>
            </div>
            )}

            {activeForm === "9" && (
                <div className="user-list">
                    {users.map(user => (
                        <div key={user.id} className="user-item">
                            <div className="user-id">ID: {user.id}</div>
                            <div className="user-username">Username: {user.username}</div>
                            <div className="user-email">Email: {user.email}</div>
                            <div className="user-password">Password: {user.password}</div>
                            <div className="user-travels">
                                <h4>Travels:</h4>
                                <ul>
                                    {user.travels.map(travel => (
                                        <li key={travel.id}>{travel.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeForm === "6" && (
                <div className="form-and-instructions"> 
                    <div className="admin-instructions"> 
                        <h3>What to Update needs to contain one of these strings in order to work: </h3>
                        <h4>country</h4>
                        <h4>city</h4>
                        <h4>hotel</h4>
                        <h4>pricePerPerson</h4>
                        <h4>numberOfRemainingSpots</h4>
                    </div>    
                    <div className="form-container">
                        <form onSubmit={updateTravel}>    
                            <div>
                            <label>Country:</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>City:</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>Hotel:</label>
                            <input
                                type="text"
                                value={hotel}
                                onChange={(e) => setHotel(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>What To Update:</label>
                            <input
                                type="text"
                                value={whatToUpdate}
                                onChange={(e) => setWhatToUpdate(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>Info To Update:</label>
                            <input
                                type="text"
                                value={infoToUpdate}
                                onChange={(e) => setInfoToUpdate(e.target.value)}
                                required
                            />
                            </div>
                            <button type="submit">Update Travel</button>
                        </form>
                    </div>
                </div>
            )}

            {activeForm === "7" && (
                <div className="form-and-instructions"> 
                    <div className="admin-instructions"> 
                        
                    </div>    
                    <div className="form-container">
                        <form onSubmit={createTravel}>    
                            <div>
                            <label>Country:</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>City:</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>Hotel:</label>
                            <input
                                type="text"
                                value={hotel}
                                onChange={(e) => setHotel(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>Price per person:</label>
                            <input
                                type="number"
                                value={pricePerPerson}
                                onChange={(e) => setPricePerPerson(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>Number of remaining spots:</label>
                            <input
                                type="number"
                                value={numberOfRemainingSpots}
                                onChange={(e) => setNumberOfRemainingSpots(e.target.value)}
                                required
                            />
                            </div>
                            <button type="submit">Create Travel</button>
                        </form>
                    </div>
                </div>    
            )}

            {activeForm === "8" && (
                <div className="form-and-instructions"> 
                    <div className="admin-instructions"> 
                        <h3>You cannot delete a travel if it's already booked by an user!</h3>
                    </div>
                    <div className="form-container">
                        <form onSubmit={deleteTravel}>    
                            <div>
                            <label>Country:</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>City:</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <label>Hotel:</label>
                            <input
                                type="text"
                                value={hotel}
                                onChange={(e) => setHotel(e.target.value)}
                                required
                            />
                            </div>
                            <button type="submit">Delete Travel</button>
                        </form>
                    </div>
            </div>
            )}

            {activeForm === "10" && (
                <div className="user-list">
                    {travels.map(travel => (
                        <div key={travel.id} className="user-item">
                            <div className="user-id">ID: {travel.id}</div>
                            <div className="user-username">Country: {travel.country}</div>
                            <div className="user-email">City: {travel.city}</div>
                            <div className="user-email">Hotel: {travel.hotel}</div>
                            <div className="user-email">PricePerPerson: {travel.price}</div>
                            <div className="user-email">Number of Remaining Spots: {travel.numberOfRemainingSpots}</div>
                        </div>   
                    ))}

                </div>    
            )}

        </div>
    )
}

export default Admin;