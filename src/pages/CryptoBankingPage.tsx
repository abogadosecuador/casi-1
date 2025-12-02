import React, { Suspense, lazy } from 'react';

// Lazy load the Crypto Banking app - Plataforma profesional de trading
const CryptoBankingApp = lazy(() => 
  import('../../../wiglobalbanking&cryptoecosystem/App').then(module => ({
    default: module.default
  })).catch(error => {
    console.error('Error loading crypto banking platform:', error);
    return {
      default: () => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">WI Global Banking & Crypto</h1>
            <p className="text-gray-400 mb-4">Error al cargar la plataforma. Por favor, recarga la página.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
            >
              Recargar
            </button>
          </div>
        </div>
      )
    };
  })
);

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">WI Global Banking & Crypto</h1>
      <p className="text-gray-400 mb-6">Cargando plataforma de finanzas profesional...</p>
      <div className="flex justify-center items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
      <p className="text-gray-500 text-sm mt-4">Conectando con servicios de trading...</p>
    </div>
  </div>
);

const CryptoBankingPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CryptoBankingApp />
    </Suspense>
  );
};

export default CryptoBankingPage;
