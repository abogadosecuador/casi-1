import React, { Suspense } from 'react';

// Lazy load the Abogados OS app
const AbogadosOSApp = React.lazy(() => 
  import('../../abogados-os/App').catch(() => ({
    default: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Abogados OS</h1>
          <p className="text-gray-400 mb-4">Cargando sistema operativo...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      </div>
    )
  }))
);

const AbogadosOSPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Abogados OS</h1>
          <p className="text-gray-400 mb-4">Cargando sistema operativo...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      </div>
    }>
      <AbogadosOSApp />
    </Suspense>
  );
};

export default AbogadosOSPage;
