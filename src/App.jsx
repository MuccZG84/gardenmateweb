import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import MyBeds from './pages/MyBeds';
import CalendarPage from './pages/CalendarPage';
import BedDesigner from './components/BedDesigner'; // ✅ dodano

import './App.css';

function App() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Učitavanje...</div>;
  if (!user) return <Login onLogin={setUser} />;

  return (
    <Router>
      <div className="appContainer">
        <Header selectedPlant={selectedPlant} />
        <main className="mainContent">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedPlant={selectedPlant}
                  setSelectedPlant={setSelectedPlant}
                />
              }
            />
            <Route path="/moje-gredice" element={<MyBeds />} />
            <Route
              path="/kalendar"
              element={<CalendarPage selectedPlant={selectedPlant} />}
            />
            <Route
              path="/bed-designer"
              element={<BedDesigner selectedPlant={selectedPlant} />} // ✅ dodano
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;