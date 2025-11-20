import { useState, useEffect } from 'react';
import styles from '../styles/BedDesigner.module.css';
import { saveBed } from '../firebase/bedService';
import { auth } from '../firebase/config';

const GRID_ROWS = 4;
const GRID_COLS = 6;

const predefinedPlants = [
  { naziv: 'Mrkva', visina: 'nisko', razmak: '10cm', kompatibilne: ['Luk'], nekompatibilne: ['Kopar'] },
  { naziv: 'Rajčica', visina: 'visoko', razmak: '40cm', kompatibilne: ['Bosiljak'], nekompatibilne: ['Krumpir'] },
  { naziv: 'Salata', visina: 'nisko', razmak: '20cm', kompatibilne: ['Rotkvica'], nekompatibilne: [] },
  { naziv: 'Luk', visina: 'nisko', razmak: '10cm', kompatibilne: ['Mrkva'], nekompatibilne: ['Grašak'] },
  { naziv: 'Krumpir', visina: 'srednje', razmak: '30cm', kompatibilne: ['Kupus'], nekompatibilne: ['Rajčica'] },
  { naziv: 'Kupus', visina: 'srednje', razmak: '30cm', kompatibilne: ['Krumpir'], nekompatibilne: ['Rajčica'] },
  { naziv: 'Rotkvica', visina: 'nisko', razmak: '10cm', kompatibilne: ['Salata'], nekompatibilne: [] },
  { naziv: 'Bosiljak', visina: 'nisko', razmak: '20cm', kompatibilne: ['Rajčica'], nekompatibilne: [] },
  { naziv: 'Kopar', visina: 'nisko', razmak: '15cm', kompatibilne: ['Krastavac'], nekompatibilne: ['Mrkva'] },
  { naziv: 'Krastavac', visina: 'puzajuće', razmak: '40cm', kompatibilne: ['Kopar'], nekompatibilne: ['Aromatične biljke'] },
  { naziv: 'Blitva', visina: 'srednje', razmak: '25cm', kompatibilne: ['Luk'], nekompatibilne: [] },
  { naziv: 'Cikla', visina: 'nisko', razmak: '15cm', kompatibilne: ['Luk'], nekompatibilne: ['Špinat'] },
  { naziv: 'Špinat', visina: 'nisko', razmak: '10cm', kompatibilne: ['Rotkvica'], nekompatibilne: ['Cikla'] },
  { naziv: 'Peršin', visina: 'nisko', razmak: '10cm', kompatibilne: ['Mrkva'], nekompatibilne: [] },
  { naziv: 'Češnjak', visina: 'nisko', razmak: '10cm', kompatibilne: ['Rajčica'], nekompatibilne: ['Grašak'] },
  { naziv: 'Grašak', visina: 'penjač', razmak: '30cm', kompatibilne: ['Mrkva'], nekompatibilne: ['Luk', 'Češnjak'] },
];

export default function BedDesigner() {
  const [grid, setGrid] = useState(Array(GRID_ROWS * GRID_COLS).fill(null));
  const [bedName, setBedName] = useState('');
  const [saving, setSaving] = useState(false);
  const [selectedNaziv, setSelectedNaziv] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('editBed');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('🧩 Učitana gredica iz localStorage:', parsed);
        setGrid(parsed.grid || Array(GRID_ROWS * GRID_COLS).fill(null));
        setBedName(parsed.name || '');
      } catch (error) {
        console.error('Greška pri učitavanju gredice za uređivanje:', error);
      } finally {
        localStorage.removeItem('editBed');
      }
    }
  }, []);

  useEffect(() => {
    setSelectedNaziv('Mrkva');
  }, []);

  useEffect(() => {
    console.log('🔄 Grid promijenjen:', grid);
  }, [grid]);

  const handleCellClick = (index) => {
    const selected = predefinedPlants.find(p => p.naziv === selectedNaziv);
    if (!selected) {
      alert('⚠️ Nema odabrane biljke. Odaberi iz dropdowna.');
      return;
    }
    if (grid[index]) return;
    const newGrid = [...grid];
    newGrid[index] = selected;
    setGrid(newGrid);
  };

  const handleCellDoubleClick = (index) => {
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

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Prijava je potrebna za spremanje gredice.');
      return;
    }

    const bedData = {
      name: bedName || 'Moja gredica',
      grid: grid,
    };

    try {
      setSaving(true);
      await saveBed(user.uid, bedData);
      alert('✅ Gredica je uspješno spremljena!');
      setBedName('');
      setGrid(Array(GRID_ROWS * GRID_COLS).fill(null));
    } catch (error) {
      console.error('❌ Greška pri spremanju gredice:', error);
      alert('❌ Neuspješno spremanje gredice.');
    } finally {
      setSaving(false);
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
      <div className={styles.selectorRow}>
        <label htmlFor="plantSelect">Odaberi biljku:</label>
        <select
          id="plantSelect"
          className={styles.selectorDropdown}
          value={selectedNaziv}
          onChange={(e) => setSelectedNaziv(e.target.value)}
        >
          <option value="">—</option>
          {predefinedPlants.map((plant) => (
            <option key={plant.naziv} value={plant.naziv}>
              {plant.naziv}
            </option>
          ))}
        </select>
      </div>

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
                {plant ? (
                  <div className={styles.plantContent}>
                    <span>{plant.naziv}</span>
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCellDoubleClick(index);
                      }}
                    >
                      BRIŠI
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: '#aaa' }}> </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

            <div className={styles.bedDetailsContainer}>
              <div className={styles.bedNameInput}>
                <label htmlFor="bedNameInput">Naziv gredice:</label>
                <input
                  id="bedNameInput"
                  type="text"
                  placeholder="Unesite naziv gredice"
                  value={bedName}
                  onChange={(e) => setBedName(e.target.value)}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.saveBtn}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Spremanje...' : '💾 Spremi gredicu'}
                </button>
                <button
                  className={styles.resetBtn}
                  onClick={resetGrid}
                >
                  🔄 Resetiraj gredicu
                </button>
              </div>
            </div>
          </div>
        );
      }