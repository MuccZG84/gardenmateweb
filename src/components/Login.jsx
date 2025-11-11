import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Login({ onLogin }) {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('✅ Uspješno prijavljen:', user);
      if (onLogin) onLogin(user);
    } catch (error) {
      console.error('❌ Greška pri prijavi:', {
        kod: error.code,
        poruka: error.message,
        detalji: error.customData,
      });

      let poruka = 'Neuspješna prijava. Pokušaj ponovno.';

      if (error.code === 'auth/unauthorized-domain') {
        poruka = 'Ova domena nije autorizirana u Firebaseu. Dodaj "localhost" u Authorized domains.';
      } else if (error.code === 'auth/popup-blocked') {
        poruka = 'Popup je blokiran. Pokušaj u drugom browseru ili dopusti popup prozor.';
      } else if (error.code === 'auth/network-request-failed') {
        poruka = 'Greška u mreži. Provjeri internet vezu.';
      }

      alert(poruka);
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