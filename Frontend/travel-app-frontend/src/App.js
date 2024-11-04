// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import Home from './Components/Home';
import SignIn from './Authentification/SignIn';
import SignUp from './Authentification/SignUp';
import Navbar from './Components/Navbar';
import Travel from './Components/Travel';
import Account from './Components/Account';

export const Context = React.createContext();

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Context.Provider value={{ username, setUsername, email, setEmail, password, setPassword }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
