import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { Context } from '../App';

function Navbar(props) {

    const {token} = useContext(Context);

    const handleSignOut = () => {
        sessionStorage.clear(); 
    };

    return (    
        <div className='navbar'>
            <div className='img'>
                 <img src="/Images/TravelApp.png" alt="Travel App" className="navbarlogo" />
            </div>
            <div className='home'>
                <Link to="/home">Home</Link>
            </div>
            <div className='travel'>
                <Link to="/travel">Travel</Link>
            </div>
            <div className='account'>
                <Link to="/account">Account</Link>
            </div>
            {token === ""  && (
            <div className='signin'>
                <Link to='/signin'>Sign In</Link>
            </div>
            )}
            {token != "" && (
            <div className='signout'>
                <Link to='/signin' onClick={handleSignOut} >Sign Out</Link>
            </div>
            )}
        </div>
)
}

export default Navbar;