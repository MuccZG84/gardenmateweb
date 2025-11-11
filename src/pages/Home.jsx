import React from 'react';
import CropSelector from '../components/CropSelector';
import BedDesigner from '../components/BedDesigner';
import PlantDetails from '../components/PlantDetails';

export default function Home({ selectedPlant, setSelectedPlant }) {
  return (
    <>
      <CropSelector onSelect={setSelectedPlant} />
      <BedDesigner selectedPlant={selectedPlant} />
      <PlantDetails plant={selectedPlant} />
    </>
  );
}
