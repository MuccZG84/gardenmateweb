import React from 'react';
import styles from '../styles/PlantDetails.module.css';

export default function PlantDetails({ plant }) {
  if (!plant) return null;

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.title}>{plant.naziv}</h2>
      <p className={styles.latinski}><em>{plant.latinski}</em></p>

      <div className={styles.infoGrid}>
        <div><strong>Kompatibilne:</strong> {plant.kompatibilne.join(', ') || '—'}</div>
        <div><strong>Nekompatibilne:</strong> {plant.nekompatibilne.join(', ') || '—'}</div>
        <div><strong>Razmak:</strong> {plant.razmak}</div>
        <div><strong>Visina:</strong> {plant.visina}</div>
        <div><strong>Tlo:</strong> {plant.tlo}</div>
        <div><strong>Svjetlost:</strong> {plant.svjetlost}</div>
        <div><strong>Sadnja:</strong> {plant.sadnja.join(', ')}</div>
        <div><strong>Berba:</strong> {plant.berba.join(', ')}</div>
      </div>

      <div className={styles.notes}>
        <strong>Napomene:</strong> {plant.napomene}
      </div>
    </div>
  );
}