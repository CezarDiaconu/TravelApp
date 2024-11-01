// src/components/Home.js
import React, { useContext } from 'react';
import Navbar from './Navbar';
import { Context } from '../App';

function Home() {
  const { username } = useContext(Context);

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <h2>Hello {username}</h2>
    </div>
  );
}

export default Home;
