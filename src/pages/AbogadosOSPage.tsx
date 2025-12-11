import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Gamepad2, Settings, Users, FileText, MessageSquare } from 'lucide-react';
import AbogadosOSApp from '../modules/abogados-os';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  description: string;
}

const AbogadosOSPage: React.FC = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: <Home className="w-5 h-5" />,
      href: '/',
      description: 'Volver a la página principal'
    },
    {
      id: 'juegos',
      label: 'Centro de Juegos',
      icon: <Gamepad2 className="w-5 h-5" />,
      href: '/juegos',
      description: 'Acceder a la plataforma de juegos profesional'
    },
    {
      id: 'documentos',
      label: 'Documentos',
      icon: <FileText className="w-5 h-5" />,
      href: '/documentos',
      description: 'Gestionar documentos legales'
    },
    {
      id: 'chat',
      label: 'Chat Legal',
      icon: <MessageSquare className="w-5 h-5" />,
      href: '/chat',
      description: 'Consultar con asistente legal'
    },
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: <Users className="w-5 h-5" />,
      href: '/usuarios',
      description: 'Gestionar usuarios del sistema'
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: <Settings className="w-5 h-5" />,
      href: '/configuracion',
      description: 'Ajustes del sistema operativo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header Profesional */}
      <motion.header className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚖️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Abogados OS</h1>
              <p className="text-xs text-slate-400">Sistema Operativo Legal Profesional</p>
            </div>
          </div>

          <button
            onClick={() => setMostrarMenu(!mostrarMenu)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
          >
            {mostrarMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Desplegable */}
        <AnimatePresence>
          {mostrarMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/20 bg-white/5 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map(item => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all group"
                  >
                    <div className="text-blue-400 group-hover:text-cyan-400 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{item.label}</p>
                      <p className="text-slate-400 text-xs">{item.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Información del Sistema */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/20 rounded-2xl p-6">
            <p className="text-slate-300 text-sm mb-2">Sistema Operativo</p>
            <p className="text-white text-2xl font-bold">Abogados OS v1.0</p>
            <p className="text-slate-400 text-xs mt-2">Plataforma profesional legal</p>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-2xl p-6">
            <p className="text-slate-300 text-sm mb-2">Estado</p>
            <p className="text-green-400 text-2xl font-bold">✓ Activo</p>
            <p className="text-slate-400 text-xs mt-2">Sistema funcionando correctamente</p>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/20 rounded-2xl p-6">
            <p className="text-slate-300 text-sm mb-2">Módulos</p>
            <p className="text-white text-2xl font-bold">6+</p>
            <p className="text-slate-400 text-xs mt-2">Módulos integrados activos</p>
          </div>
        </motion.div>

        {/* Módulos Disponibles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Módulos del Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                nombre: 'Centro de Juegos',
                icono: '🎮',
                descripcion: 'Plataforma de juegos profesionales con sistema de tokens',
                estado: 'Activo',
                link: '/juegos'
              },
              {
                nombre: 'Gestión de Documentos',
                icono: '📋',
                descripcion: 'Almacenamiento y gestión de documentos legales',
                estado: 'Activo',
                link: '/documentos'
              },
              {
                nombre: 'Chat Legal',
                icono: '💬',
                descripcion: 'Asesoría legal en tiempo real con IA',
                estado: 'Activo',
                link: '/chat'
              },
              {
                nombre: 'Gestión de Usuarios',
                icono: '👥',
                descripcion: 'Administración de usuarios y permisos',
                estado: 'Activo',
                link: '/usuarios'
              },
              {
                nombre: 'Análisis y Reportes',
                icono: '📊',
                descripcion: 'Estadísticas y reportes del sistema',
                estado: 'Activo',
                link: '/reportes'
              },
              {
                nombre: 'Configuración',
                icono: '⚙️',
                descripcion: 'Ajustes y configuración del sistema',
                estado: 'Activo',
                link: '/configuracion'
              }
            ].map((modulo, i) => (
              <motion.a
                key={i}
                href={modulo.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-6 hover:border-blue-400/50 transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{modulo.icono}</div>
                <h3 className="text-lg font-bold text-white mb-2">{modulo.nombre}</h3>
                <p className="text-slate-300 text-sm mb-4">{modulo.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs font-semibold">● {modulo.estado}</span>
                  <span className="text-blue-400 text-xs">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Sistema Operativo Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Sistema Operativo</h2>
          <AbogadosOSApp />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-white/20 pt-8 text-center text-slate-400 text-sm"
        >
          <p>© 2025 Abg. Wilson Alexander Ipiales Guerrón - Abogados OS v1.0</p>
          <p className="mt-2">Sistema Operativo Legal Profesional Integrado</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default AbogadosOSPage;
