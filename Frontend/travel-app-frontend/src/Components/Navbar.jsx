import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

function Navbar(props) {

    

    return (    
        <div className='navbar'>
            <div className='home'>
                <Link to="/home">Home</Link>
            </div>
            <div className='travel'>
                <Link to="/travel">Travel</Link>
        </div>
            <div className='account'>
                <Link to="/account">Account</Link>
            </div>
            <div className='signout'>
                <Link to='/signin'>Sign Out</Link>
            </div>
        </div>
)
}

export default Navbar;