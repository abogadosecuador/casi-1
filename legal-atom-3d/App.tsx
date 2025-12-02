import React from 'react';
import LegalAtomScene from './components/LegalAtomScene';
import LawyerHeroOverlay from './components/LawyerHeroOverlay';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center">
      {/* Main 3D Container - No Backgrounds */}
      <div className="relative z-10 w-full h-full">
        <LegalAtomScene />
      </div>
      
      {/* Overlay con efecto de escritura */}
      <LawyerHeroOverlay
        lawyerName="Abg. Wilson Alexander Ipiales Guerron"
        lawyerTitle="Especialista en Derecho Penal y Civil"
        description="Con más de 5 años de experiencia y más de 50 casos ganados exitosamente"
      />
    </div>
  );
}