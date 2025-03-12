import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import Home from './Components/Home';
import SignIn from './Authentification/SignIn';
import SignUp from './Authentification/SignUp';
import Error from './Components/Error';
import Travel from './Components/Travel';
import Account from './Components/Account';
import { Navigate } from 'react-router-dom';
import Admin from './Components/Admin';

export const Context = React.createContext();

// ProtectedRoute component to handle access control
const ProtectedRoute = ({ children, token }) => {
  if (!token) {
    return <Navigate to="/signin" />; // Redirect to sign-in page if no token
  }
  return children; // Allow access to the route if a valid token exists
};

function App() {
  const [username, setUsername] = useState(sessionStorage.getItem("username") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [password, setPassword] = useState(sessionStorage.getItem("password") || "");
  const [id, setId] = useState(sessionStorage.getItem("id") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  useEffect(() => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("token", token);
  }, [username, email, password, id, token]);

  return (
    <Context.Provider value={{ username, setUsername, email, setEmail, password, setPassword, id, setId, token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ProtectedRoute token={token}><Home /></ProtectedRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protect the Travel route */}
          <Route path="/travel" element={<ProtectedRoute token={token}><Travel /></ProtectedRoute>} />
          
          <Route path="/account" element={<ProtectedRoute token={token}><Account /></ProtectedRoute>} />
          <Route path="/admin"  element={<ProtectedRoute token={token}><Admin /> </ProtectedRoute>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
