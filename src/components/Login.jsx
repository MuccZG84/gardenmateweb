import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Login({ onLogin }) {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Uspješno prijavljen:', user);
      if (onLogin) onLogin(user);
    } catch (error) {
      console.error('Greška pri prijavi:', error);
      alert('Neuspješna prijava. Pokušaj ponovno.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Dobrodošao u GardenMateWeb 🌱</h2>
      <button onClick={handleLogin}>
        Prijavi se Google računom
      </button>
    </div>
  );
}