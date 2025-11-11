import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyBeds from './pages/MyBeds';
import CalendarPage from './pages/CalendarPage';
import './App.css';

function App() {
  const [selectedPlant, setSelectedPlant] = useState(null);

  return (
    <Router>
      <div className="appContainer">
        <Header selectedPlant={selectedPlant} />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Home selectedPlant={selectedPlant} setSelectedPlant={setSelectedPlant} />} />
            <Route path="/moje-gredice" element={<MyBeds />} />
            <Route path="/kalendar" element={<CalendarPage selectedPlant={selectedPlant} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;