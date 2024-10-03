// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserList from './components/Users/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import PasswordResetRequest from './components/Auth/PasswordResetRequest';
import ResetPassword from './components/Auth/ResetPassword';

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/admin" element={<UserList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request-password-reset" element={<PasswordResetRequest />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
