import React from 'react';
import LegalAtomScene from './components/LegalAtomScene';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center">
      {/* Main 3D Container - No Backgrounds */}
      <div className="relative z-10 w-full h-full">
        <LegalAtomScene />
      </div>
    </div>
  );
}