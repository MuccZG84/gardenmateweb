import { Link } from 'react-router-dom';

import styles from '../styles/Header.module.css';

export default function Header({ selectedPlant }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🌿 GardenMate</h1>

      {selectedPlant && (
        <p className={styles.subheading}>
          Odabrano: <strong>{selectedPlant.naziv}</strong>
        </p>
      )}

  <nav className={styles.nav}>
  <Link to="/" className={styles.navBtn}>🏡 Početna</Link>
  <Link to="/moje-gredice" className={styles.navBtn}>🪴 Moje gredice</Link>
  <Link to="/kalendar" className={styles.navBtn}>📅 Kalendar</Link>
</nav>

    </header>
  );
}