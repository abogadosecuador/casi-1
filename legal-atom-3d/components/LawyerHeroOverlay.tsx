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
    let timeout: ReturnType<typeof setTimeout>;

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
      {/* Header overlay con botón Proyectos */}
      <div className="absolute top-0 left-0 right-0 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-auto">
        <div className="text-white/80 text-sm sm:text-base font-semibold tracking-wide">
          Abg. W. Ipiales
        </div>
        <a
          href="https://abogados.ecuador.workers.dev/proyectos"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-colors"
        >
          Proyectos
        </a>
      </div>
      {/* Fondo semi-transparente degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

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

      {/* Footer overlay con CTA a Proyectos */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-auto">
        <a
          href="https://abogados.ecuador.workers.dev/proyectos"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/20 transition-colors"
        >
          Ver Proyectos Integrados
        </a>
      </div>
    </div>
  );
};

export default LawyerHeroOverlay;
