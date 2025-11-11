import React from 'react';
import PlantingCalendar from '../components/PlantingCalendar';

export default function CalendarPage({ selectedPlant }) {
  return (
    <div style={{ padding: '12px' }}>
      <h2>📅 Kalendar sadnje</h2>
      <PlantingCalendar plant={selectedPlant} />
    </div>
  );
}
