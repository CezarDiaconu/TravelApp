import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import SignIn from './Authentification/SignIn';
import SignUp from './Authentification/SignUp';


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/home"   element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
