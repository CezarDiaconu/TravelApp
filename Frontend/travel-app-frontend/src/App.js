// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import Home from './Components/Home';
import SignIn from './Authentification/SignIn';
import SignUp from './Authentification/SignUp';
import Error from './Components/Error';
import Travel from './Components/Travel';
import Account from './Components/Account';

export const Context = React.createContext();

function App() {
 // Load stored session data
 const [username, setUsername] = useState(sessionStorage.getItem("username") || "");
 const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
 const [password, setPassword] = useState(sessionStorage.getItem("password") || "");

 // Update sessionStorage when state changes
 useEffect(() => {
   sessionStorage.setItem("username", username);
   sessionStorage.setItem("email", email);
   sessionStorage.setItem("password", password);
 }, [username, email, password]);
  return (
    <Context.Provider value={{ username, setUsername, email, setEmail, password, setPassword }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
