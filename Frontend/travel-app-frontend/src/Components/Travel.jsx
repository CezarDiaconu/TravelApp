import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Context } from '../App';

function Travel() {
    
    const { username } = useContext(Context);

    return (
        <div>
            <Navbar />
            <h1>Travel</h1>
            <h2>Hello {username}</h2>
        </div>
    )
}

export default Travel;