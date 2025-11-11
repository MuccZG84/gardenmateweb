import React, { useState } from 'react';
import styles from '../styles/BedDesigner.module.css';

const GRID_ROWS = 4;
const GRID_COLS = 6;

export default function BedDesigner({ selectedPlant }) {
  const [grid, setGrid] = useState(Array(GRID_ROWS * GRID_COLS).fill(null));

  const handleCellClick = (index) => {
    if (!selectedPlant || grid[index]) return;
    const newGrid = [...grid];
    newGrid[index] = selectedPlant;
    setGrid(newGrid);
  };

  const handleCellDoubleClick = (index) => {
    console.log('Dupli klik na ćeliju:', index, 'Biljka:', grid[index]);
    if (!grid[index]) return;
    const newGrid = [...grid];
    newGrid[index] = null;
    setGrid(newGrid);
  };

  const resetGrid = () => {
    if (window.confirm('Želiš li stvarno resetirati cijelu gredicu?')) {
      setGrid(Array(GRID_ROWS * GRID_COLS).fill(null));
    }
  };

  const getBorderClass = (row, col) => {
    return [
      row === 0 && styles.topEdge,
      row === GRID_ROWS - 1 && styles.bottomEdge,
      col === 0 && styles.leftEdge,
      col === GRID_COLS - 1 && styles.rightEdge,
    ].filter(Boolean).join(' ');
  };

  const getTooltip = (plant) => {
    if (!plant) return 'Klikni za postavljanje biljke';
    return `${plant.naziv}\nVisina: ${plant.visina}\nRazmak: ${plant.razmak}\n✅ Kompatibilne: ${plant.kompatibilne.join(', ') || '—'}\n⚠️ Nekompatibilne: ${plant.nekompatibilne.join(', ') || '—'}\nDupli klik za brisanje`;
  };

  return (
    <div className={styles.bedContainer}>
      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          {grid.map((plant, index) => {
            const row = Math.floor(index / GRID_COLS);
            const col = index % GRID_COLS;
            const borderClass = getBorderClass(row, col);
            const tooltip = getTooltip(plant);

            return (
              <div
                key={index}
                className={`${styles.gridCell} ${plant ? styles.hasPlant : ''} ${borderClass}`}
                onClick={() => handleCellClick(index)}
                onDoubleClick={() => handleCellDoubleClick(index)}
                title={tooltip}
              >
                {plant && (
                  <div className={styles.plantContent}>
                    <span>{plant.naziv}</span>
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation(); // spriječi da klik pokrene handleCellClick
                        handleCellDoubleClick(index);
                      }}
                    >
                      BRIŠI
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className={styles.resetBtn} onClick={resetGrid}>
          🔄 Resetiraj gredicu
        </button>
      </div>
    </div>
  );
}