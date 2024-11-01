import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useLocation } from 'react-router-dom';
import { Context } from '../App';

function Account() {

    const { username } = useContext(Context);

    return (
        <div>
            <Navbar />
            <h1>Account</h1>
            <h2>Hello {username}</h2>
        </div>
    )
}

export default Account;