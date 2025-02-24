import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Context } from '../App';
import '../Styles/Account.css'; 

function Account() {
    const { username, email, password, setUsername, setEmail, setPassword } = useContext(Context); 
    const [whatToUpdate, setWhatToUpdate] = useState("");
    const [infoToUpdate, setInfoToUpdate] = useState("");
    const [showAccountInfo, setShowAccountInfo] = useState(false);
    const [showEditOptions, setShowEditOptions] = useState(false);

    const handleChangeSelection = (event) => {
        setWhatToUpdate(event.target.value);
    };
    
    const handleInputChange = (event) => {
        setInfoToUpdate(event.target.value);
    };

    const handleSubmit = () => {
        axios.patch('http://localhost:8080/updateUser', {
            username: username,
            password: password,
            whatToUpdate: whatToUpdate,
            infoToUpdate: infoToUpdate
        }).then(response => {
            console.log("Update successful:", response.data);
            switch(whatToUpdate) {
                case "username":
                  setUsername(infoToUpdate);
                  break;
                case "email":
                  setEmail(infoToUpdate);
                  break;
                case "password":
                  setPassword(infoToUpdate);
                  break;
              }
        }).catch(error => {
            console.error("There was an error updating the user:", error);
        });
    };

    return (
        <div>
            <Navbar />
            <h1>Account</h1>

            {/* Checkbox to Show Account Info */}
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

            {/* Show Account Info Only If Checkbox is Checked */}
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
                            <span>{password}</span>
                        </div>
                    </div>

                    {/* Checkbox to Show Edit Account Options */}
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

                    {/* Show Edit Options Only If Second Checkbox is Checked */}
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
        </div>
    );
}

export default Account;
