import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterAuth from './Components/RegisterForm';
import LoginAuth from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import BookingForm from './Components/Booking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginAuth} />
        <Route path="/register" Component={RegisterAuth} />
        <Route path='/parking-spots' Component={Dashboard} />
        <Route path='/book/:id' Component={BookingForm} />
      </Routes>
    </Router>
  );
}

export default App;

