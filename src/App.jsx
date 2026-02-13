import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Flights from './pages/Flights.jsx';
import Tours from './pages/Tours.jsx';
import Hotels from './pages/Hotels.jsx';
import Cars from './pages/Cars.jsx';

function App() {
  return (
    <Router>
      <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </>
    </Router>
  );
}

export default App;