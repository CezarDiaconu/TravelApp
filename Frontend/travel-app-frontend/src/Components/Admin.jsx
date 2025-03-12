import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import axios from "axios";
import { Context } from '../App';
import '../Styles/Admin.css'; 

function Admin() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [activeForm, setActiveForm] = useState(0);


    const createUser = async () => {
        try {
            const response = await axios.post('http://localhost:8080/createUser', {
              username: username,
              email: email,
              password: password,
            });

            if (response.data === "User created successfully!") {
                alert("User created succesfully");
            } else {
                console.log('Something went wrong while fetching data');
            }

        } catch (error) {
            console.error('Axios error during creating user:', error.message);
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
                        Modify User
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("3")}>
                        Create User
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("4")}>
                        Delete User
                    </button>
                </div>     
                    
                <div className="admin-travel-container">  
                    <button className="admin-button" onClick={() => setActiveForm("5")}>
                        Search Travel
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("6")}>
                        Modify Travel
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("7")}>
                        Create Travel
                    </button>
                    <button className="admin-button" onClick={() => setActiveForm("8")}>
                        Delete Travel
                    </button>
                </div>      
            </div>

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
                
            

        </div>
    )
}

export default Admin;