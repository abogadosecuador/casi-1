import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Play, ShoppingCart, Menu, X, User, ChevronLeft, Star, Lock } from 'lucide-react';

type Vista = 'hub' | 'juego' | 'tienda' | 'personaje' | 'planes';

interface Juego {
  id: string;
  nombre: string;
  icono: string;
  categoria: string;
  dificultad: string;
  precio: number;
  recompensa: number;
  niveles: number;
  descripcion: string;
  desbloqueado: boolean;
}

interface Personaje {
  id: string;
  nombre: string;
  icono: string;
  precio: number;
  bonus: number;
}

interface Plan {
  id: string;
  nombre: string;
  precio: number;
  beneficios: string[];
  destacado: boolean;
}

const JUEGOS: Juego[] = [
  { id: 'trivia', nombre: 'Trivia Legal', icono: '🎓', categoria: 'legal', dificultad: 'media', precio: 10, recompensa: 50, niveles: 10, descripcion: 'Preguntas sobre derecho ecuatoriano', desbloqueado: true },
  { id: 'memoria', nombre: 'Memoria Legal', icono: '🧠', categoria: 'puzzle', dificultad: 'fácil', precio: 5, recompensa: 30, niveles: 8, descripcion: 'Juego de memoria con conceptos legales', desbloqueado: true },
  { id: 'sopa', nombre: 'Sopa de Letras', icono: '🔤', categoria: 'puzzle', dificultad: 'media', precio: 8, recompensa: 40, niveles: 12, descripcion: 'Busca palabras legales', desbloqueado: true },
  { id: 'ladrillos', nombre: 'Rompe Ladrillos', icono: '🧱', categoria: 'arcade', dificultad: 'media', precio: 10, recompensa: 45, niveles: 15, descripcion: 'Clásico arcade con mecánicas legales', desbloqueado: true },
  { id: 'naves', nombre: 'Defensor Espacial', icono: '🛸', categoria: 'arcade', dificultad: 'difícil', precio: 15, recompensa: 60, niveles: 20, descripcion: 'Defensa de naves contra enemigos', desbloqueado: true },
  { id: 'ajedrez', nombre: 'Ajedrez Legal', icono: '♟️', categoria: 'estrategia', dificultad: 'difícil', precio: 20, recompensa: 80, niveles: 10, descripcion: 'Ajedrez estratégico profesional', desbloqueado: true },
  { id: 'crucigrama', nombre: 'Crucigrama Legal', icono: '📝', categoria: 'puzzle', dificultad: 'media', precio: 12, recompensa: 50, niveles: 15, descripcion: 'Crucigramas con términos legales', desbloqueado: false },
  { id: 'tenis', nombre: 'Tenis Legal', icono: '🎾', categoria: 'arcade', dificultad: 'media', precio: 10, recompensa: 45, niveles: 12, descripcion: 'Tenis profesional con controles', desbloqueado: false },
  { id: 'tanques', nombre: 'Tanques Legales', icono: '🛢️', categoria: 'arcade', dificultad: 'difícil', precio: 15, recompensa: 60, niveles: 18, descripcion: 'Batalla de tanques estratégica', desbloqueado: false },
  { id: 'snake', nombre: 'Snake Legal', icono: '🐍', categoria: 'arcade', dificultad: 'media', precio: 8, recompensa: 40, niveles: 10, descripcion: 'Clásico Snake con contexto legal', desbloqueado: false },
  { id: 'flappy', nombre: 'Flappy Bird Legal', icono: '🦅', categoria: 'arcade', dificultad: 'fácil', precio: 5, recompensa: 25, niveles: 8, descripcion: 'Vuela entre obstáculos legales', desbloqueado: false },
  { id: 'pacman', nombre: 'Pac-Man Legal', icono: '👾', categoria: 'arcade', dificultad: 'media', precio: 10, recompensa: 45, niveles: 15, descripcion: 'Laberinto con contexto legal', desbloqueado: false },
];

const PERSONAJES: Personaje[] = [
  { id: 'abogado', nombre: 'Abogado Profesional', icono: '👨‍⚖️', precio: 100, bonus: 10 },
  { id: 'juez', nombre: 'Juez Supremo', icono: '👨‍⚖️', precio: 150, bonus: 15 },
  { id: 'notario', nombre: 'Notario Experto', icono: '📝', precio: 120, bonus: 12 },
];

const PLANES: Plan[] = [
  {
    id: 'basico',
    nombre: 'Plan Básico',
    precio: 0,
    beneficios: ['6 juegos desbloqueados', '1000 tokens iniciales', 'Acceso a tienda'],
    destacado: false,
  },
  {
    id: 'premium',
    nombre: 'Plan Premium',
    precio: 9.99,
    beneficios: ['Todos los juegos desbloqueados', '5000 tokens iniciales', 'Bonus tokens diarios', 'Personajes exclusivos'],
    destacado: true,
  },
  {
    id: 'elite',
    nombre: 'Plan Elite',
    precio: 19.99,
    beneficios: ['Todos los juegos', '10000 tokens', 'Bonus tokens x2', 'Personajes exclusivos', 'Soporte prioritario'],
    destacado: false,
  },
];

const GamesPlatform: React.FC = () => {
  const [vistaActual, setVistaActual] = useState<Vista>('hub');
  const [tokens, setTokens] = useState(1000);
  const [nivel, setNivel] = useState(5);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null);
  const [nivelActual, setNivelActual] = useState(1);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState('abogado');
  const [juegosDesbloqueados, setJuegosDesbloqueados] = useState(new Set(['trivia', 'memoria', 'sopa', 'ladrillos', 'naves', 'ajedrez']));

  const jugarJuego = (juego: Juego) => {
    if (!juegosDesbloqueados.has(juego.id) && tokens < juego.precio) {
      alert('No tienes suficientes tokens para desbloquear este juego');
      return;
    }
    if (!juegosDesbloqueados.has(juego.id)) {
      setJuegosDesbloqueados(new Set([...juegosDesbloqueados, juego.id]));
      setTokens(tokens - juego.precio);
    }
    setJuegoSeleccionado(juego);
    setNivelActual(1);
    setVistaActual('juego');
  };

  const finalizarJuego = (gano: boolean) => {
    if (gano && juegoSeleccionado) {
      const recompensa = juegoSeleccionado.recompensa;
      setTokens(tokens + recompensa);
      setNivel(nivel + 1);
    }
    setVistaActual('hub');
  };

  const comprarPersonaje = (personaje: Personaje) => {
    if (tokens < personaje.precio) {
      alert('No tienes suficientes tokens');
      return;
    }
    setTokens(tokens - personaje.precio);
    setPersonajeSeleccionado(personaje.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <motion.header className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Plataforma de Juegos</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="backdrop-blur-md bg-blue-500/20 border border-blue-400/30 rounded-lg px-4 py-2">
              <p className="text-sm text-slate-300">Tokens</p>
              <p className="text-2xl font-bold text-yellow-400">{tokens}</p>
            </div>
            <div className="backdrop-blur-md bg-purple-500/20 border border-purple-400/30 rounded-lg px-4 py-2">
              <p className="text-sm text-slate-300">Nivel</p>
              <p className="text-2xl font-bold text-purple-400">{nivel}</p>
            </div>
          </div>

          <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20">
            {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Contenido Principal */}
      <AnimatePresence mode="wait">
        {vistaActual === 'hub' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {/* Navegación */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { id: 'hub', label: 'Juegos', icon: Gamepad2 },
                { id: 'tienda', label: 'Tienda', icon: ShoppingCart },
                { id: 'planes', label: 'Planes', icon: Star },
                { id: 'personaje', label: 'Personajes', icon: User }
              ].map(nav => (
                <button
                  key={nav.id}
                  onClick={() => setVistaActual(nav.id as Vista)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                    vistaActual === nav.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'backdrop-blur-md bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <nav.icon className="w-5 h-5" />
                  {nav.label}
                </button>
              ))}
            </div>

            {/* Grid de Juegos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {JUEGOS.map(juego => (
                <motion.div
                  key={juego.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`backdrop-blur-xl border rounded-2xl p-6 transition-all group cursor-pointer ${
                    juegosDesbloqueados.has(juego.id)
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/20 hover:border-blue-400/50'
                      : 'bg-gradient-to-br from-slate-500/10 to-slate-600/10 border-slate-500/20 hover:border-slate-400/30'
                  }`}
                  onClick={() => jugarJuego(juego)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform">{juego.icono}</div>
                    {!juegosDesbloqueados.has(juego.id) && <Lock className="w-5 h-5 text-slate-400" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{juego.nombre}</h3>
                  <p className="text-slate-300 text-sm mb-4">{juego.descripcion}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-300">📊 {juego.niveles} niveles</p>
                    <p className="text-sm text-slate-300">⚡ Dificultad: {juego.dificultad}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">{juego.precio} tokens</span>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      {juegosDesbloqueados.has(juego.id) ? 'Jugar' : 'Desbloquear'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {vistaActual === 'tienda' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <button onClick={() => setVistaActual('hub')} className="flex items-center gap-2 text-blue-400 mb-8 hover:text-blue-300">
              <ChevronLeft className="w-5 h-5" />
              Volver a Juegos
            </button>
            <h2 className="text-3xl font-bold text-white mb-8">Tienda de Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { tokens: 100, precio: 4.99, desc: 0 },
                { tokens: 500, precio: 19.99, desc: 8 },
                { tokens: 1000, precio: 34.99, desc: 15 },
                { tokens: 2500, precio: 74.99, desc: 25 }
              ].map((paquete, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/20 rounded-2xl p-6 text-center"
                >
                  <p className="text-4xl font-bold text-white mb-2">{paquete.tokens}</p>
                  <p className="text-slate-300 mb-4">Tokens</p>
                  <p className="text-2xl font-bold text-yellow-400 mb-4">${paquete.precio}</p>
                  {paquete.desc > 0 && <p className="text-green-400 text-sm mb-4">Ahorra {paquete.desc}%</p>}
                  <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all">
                    Comprar
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {vistaActual === 'planes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <button onClick={() => setVistaActual('hub')} className="flex items-center gap-2 text-blue-400 mb-8 hover:text-blue-300">
              <ChevronLeft className="w-5 h-5" />
              Volver a Juegos
            </button>
            <h2 className="text-3xl font-bold text-white mb-8">Planes de Suscripción</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANES.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`backdrop-blur-xl border rounded-2xl p-8 ${
                    plan.destacado
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/50 ring-2 ring-yellow-400/30'
                      : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/20'
                  }`}
                >
                  {plan.destacado && <div className="text-yellow-400 text-sm font-bold mb-4">⭐ RECOMENDADO</div>}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.nombre}</h3>
                  <p className="text-3xl font-bold text-yellow-400 mb-6">${plan.precio}/mes</p>
                  <ul className="space-y-3 mb-6">
                    {plan.beneficios.map((beneficio, j) => (
                      <li key={j} className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="text-green-400">✓</span> {beneficio}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full px-4 py-2 rounded-lg font-bold transition-all ${
                    plan.destacado
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    {plan.precio === 0 ? 'Actual' : 'Suscribirse'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {vistaActual === 'personaje' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <button onClick={() => setVistaActual('hub')} className="flex items-center gap-2 text-blue-400 mb-8 hover:text-blue-300">
              <ChevronLeft className="w-5 h-5" />
              Volver a Juegos
            </button>
            <h2 className="text-3xl font-bold text-white mb-8">Personajes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PERSONAJES.map(personaje => (
                <motion.div
                  key={personaje.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`backdrop-blur-xl border rounded-2xl p-6 text-center transition-all ${
                    personajeSeleccionado === personaje.id
                      ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400/50'
                      : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/20'
                  }`}
                >
                  <div className="text-6xl mb-4">{personaje.icono}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{personaje.nombre}</h3>
                  <p className="text-sm text-slate-300 mb-4">+{personaje.bonus}% Bonus</p>
                  {personajeSeleccionado === personaje.id ? (
                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-bold">
                      Seleccionado
                    </button>
                  ) : (
                    <button
                      onClick={() => comprarPersonaje(personaje)}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      {personaje.precio} Tokens
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {vistaActual === 'juego' && juegoSeleccionado && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            <button onClick={() => setVistaActual('hub')} className="flex items-center gap-2 text-blue-400 mb-8 hover:text-blue-300">
              <ChevronLeft className="w-5 h-5" />
              Volver a Juegos
            </button>
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{juegoSeleccionado.icono}</div>
                <h2 className="text-3xl font-bold text-white mb-2">{juegoSeleccionado.nombre}</h2>
                <p className="text-slate-300">Nivel {nivelActual} de {juegoSeleccionado.niveles}</p>
              </div>

              <div className="bg-gradient-to-b from-slate-900 to-black rounded-lg p-8 mb-8 h-64 flex items-center justify-center">
                <p className="text-white text-center text-lg">Área de Juego - {juegoSeleccionado.nombre}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => finalizarJuego(true)}
                  className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all"
                >
                  ✓ Ganaste
                </button>
                <button
                  onClick={() => finalizarJuego(false)}
                  className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all"
                >
                  ✗ Perdiste
                </button>
                <button
                  onClick={() => setVistaActual('hub')}
                  className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-all"
                >
                  Salir
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamesPlatform;
