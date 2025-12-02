import React, { useState, useEffect } from 'react';

/**
 * OVERLAY DE HÉROE CON EFECTO DE ESCRITURA
 * 
 * Se superpone sobre la escena 3D sin dañarla
 * Integra el nombre del abogado con efecto de escritura y borrado
 */

interface LawyerHeroOverlayProps {
  lawyerName?: string;
  lawyerTitle?: string;
  description?: string;
}

const LawyerHeroOverlay: React.FC<LawyerHeroOverlayProps> = ({
  lawyerName = 'Abg. Wilson Alexander Ipiales Guerron',
  lawyerTitle = 'Especialista en Derecho Penal y Civil',
  description = 'Con más de 5 años de experiencia y más de 50 casos ganados exitosamente'
}) => {
  const [displayedName, setDisplayedName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Esperar antes de empezar
    if (!isTyping && !isDeleting && displayedName === '') {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }

    // Escribir
    if (isTyping && displayedName.length < lawyerName.length) {
      timeout = setTimeout(() => {
        setDisplayedName(lawyerName.slice(0, displayedName.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }

    // Cuando termina de escribir
    if (isTyping && displayedName.length === lawyerName.length) {
      setIsTyping(false);
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    // Borrar
    if (isDeleting && displayedName.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedName(displayedName.slice(0, -1));
      }, 40);
      return () => clearTimeout(timeout);
    }

    // Cuando termina de borrar
    if (isDeleting && displayedName.length === 0) {
      setIsDeleting(false);
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [displayedName, isTyping, isDeleting, lawyerName]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
      {/* Fondo semi-transparente degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* Contenedor de contenido */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-auto">
        {/* Nombre con efecto de escritura */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-serif tracking-tight leading-tight min-h-[120px] flex items-center justify-center">
          <span className="inline-block">
            {displayedName}
            {(isTyping || isDeleting) && (
              <span className="ml-2 inline-block w-2 h-16 bg-white animate-pulse" />
            )}
          </span>
        </h1>

        {/* Línea decorativa */}
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 mx-auto mb-6 rounded-full" />

        {/* Título profesional */}
        <p className="text-xl md:text-2xl text-yellow-300 font-semibold mb-4">
          {lawyerTitle}
        </p>

        {/* Descripción */}
        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          {description}
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Consulta Gratis
          </button>
          <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Chatear Ahora
          </button>
          <button className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
            Agendar Cita
          </button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default LawyerHeroOverlay;
