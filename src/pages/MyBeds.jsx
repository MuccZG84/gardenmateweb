import React, { useEffect, useState } from 'react';
import { getBedsByUser, deleteBed } from '../firebase/bedService';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const GRID_ROWS = 4;
const GRID_COLS = 6;

export default function MyBeds() {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBeds = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userBeds = await getBedsByUser(user.uid);
      setBeds(userBeds);
    } catch (error) {
      console.error('Greška pri dohvaćanju gredica:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bedId) => {
    try {
      await deleteBed(bedId);
      setBeds((prev) => prev.filter((bed) => bed.id !== bedId));
    } catch (error) {
      console.error('Greška pri brisanju gredice:', error);
    }
  };

const handleEdit = (bed) => {
  localStorage.setItem('editBed', JSON.stringify({
    name: bed.name,
    grid: bed.grid,
  }));
  navigate('/bed-designer');
};

useEffect(() => {
    fetchBeds();
  }, []);

  const renderGridPreview = (grid) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gap: '2px',
          marginTop: '8px',
          border: '1px solid #ccc',
          padding: '4px',
          maxWidth: '300px',
        }}
      >
        {grid.map((plant, index) => (
          <div
            key={index}
            style={{
              backgroundColor: plant ? '#d4f4d2' : '#f0f0f0',
              border: '1px solid #aaa',
              fontSize: '10px',
              textAlign: 'center',
              padding: '2px',
              height: '30px',
              overflow: 'hidden',
            }}
            title={plant?.naziv || 'Prazno'}
          >
            {plant?.naziv || ''}
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div>Učitavanje gredica...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Moje gredice 🌿</h2>
      {beds.length === 0 ? (
        <p>Nema spremljenih gredica.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {beds.map((bed) => (
            <li key={bed.id} style={{ marginBottom: '20px' }}>
              <strong>{bed.name || 'Bez naziva'}</strong>
              <button
                onClick={() => handleDelete(bed.id)}
                style={{ marginLeft: '10px' }}
              >
                Obriši
              </button>
              <button
                onClick={() => handleEdit(bed)}
                style={{ marginLeft: '10px' }}
              >
                Uredi
              </button>
              {bed.bedData?.grid && renderGridPreview(bed.grid)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}