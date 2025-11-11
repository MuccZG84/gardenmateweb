import React, { useEffect, useState } from 'react';
import styles from '../styles/CropSelector.module.css';

export default function CropSelector({ onSelect }) {
  const [plants, setPlants] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch('/plants.json')
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  const handleChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const selectedPlant = plants.find(p => p.id === id);
    if (selectedPlant) onSelect(selectedPlant);
  };

  const selectedPlant = plants.find(p => p.id === selectedId);

  return (
    <div className={styles.selectorContainer}>
      <label htmlFor="plantSelect" className={styles.label}>🌿 Odaberi biljku:</label>
      <select
        id="plantSelect"
        value={selectedId}
        onChange={handleChange}
        className={styles.dropdown}
      >
        <option value="">—</option>
        {plants.map((plant) => (
          <option key={plant.id} value={plant.id}>
            {plant.naziv}
          </option>
        ))}
      </select>

      {selectedPlant && (
        <div className={styles.infoBox}>
          <div className={styles.compat}>
            ✅ <strong>Kompatibilne:</strong>{' '}
            {selectedPlant.kompatibilne.length > 0
              ? selectedPlant.kompatibilne.map((name, i) => (
                  <span key={i} className={styles.compatTag}>{name}</span>
                ))
              : '—'}
          </div>
          <div className={styles.incompat}>
            ⚠️ <strong>Nekompatibilne:</strong>{' '}
            {selectedPlant.nekompatibilne.length > 0
              ? selectedPlant.nekompatibilne.map((name, i) => (
                  <span key={i} className={styles.incompatTag}>{name}</span>
                ))
              : '—'}
          </div>
        </div>
      )}
    </div>
  );
}