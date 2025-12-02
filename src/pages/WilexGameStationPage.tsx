import React, { Suspense } from 'react';

// Lazy load the Wilex Game Station app
const WilexGameApp = React.lazy(() => 
  import('../../../introwilexgamestation/App').catch(() => ({
    default: () => (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Intro Wilex Game Station</h1>
          <p className="text-gray-400 mb-4">Cargando plataforma de juegos...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
        </div>
      </div>
    )
  }))
);

const WilexGameStationPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Intro Wilex Game Station</h1>
          <p className="text-gray-400 mb-4">Cargando plataforma de juegos...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
        </div>
      </div>
    }>
      <WilexGameApp />
    </Suspense>
  );
};

export default WilexGameStationPage;
