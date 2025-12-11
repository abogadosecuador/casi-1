import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Gamepad2, Settings, Users, FileText, MessageSquare, Briefcase } from 'lucide-react';
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
      id: 'servicios',
      label: 'Servicios Legales',
      icon: <Briefcase className="w-5 h-5" />,
      href: '/servicios',
      description: 'Acceder a servicios legales profesionales'
    },
    {
      id: 'juegos',
      label: 'Centro de Juegos',
      icon: <Gamepad2 className="w-5 h-5" />,
      href: '/games',
      description: 'Plataforma de juegos profesionales con tokens'
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
      {/* Header Profesional Mac-like */}
      <motion.header className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Abogados OS</h1>
              <p className="text-xs text-slate-400 font-medium">v1.0 • Sistema Legal Profesional</p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMostrarMenu(!mostrarMenu)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
          >
            {mostrarMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Información del Sistema - Mejorada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div 
            whileHover={{ y: -5 }}
            className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-8 shadow-xl hover:shadow-blue-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-blue-300 text-sm font-semibold">SISTEMA</p>
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-white text-3xl font-bold mb-2">Abogados OS</p>
            <p className="text-slate-400 text-sm">v1.0 • Plataforma Legal Profesional</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-slate-500">Última actualización: Hoy</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-8 shadow-xl hover:shadow-green-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-green-300 text-sm font-semibold">ESTADO</p>
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-green-400 text-3xl font-bold mb-2">Activo</p>
            <p className="text-slate-400 text-sm">Sistema funcionando correctamente</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-green-500">• Todos los módulos operativos</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-8 shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-purple-300 text-sm font-semibold">MÓDULOS</p>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-white text-3xl font-bold mb-2">6+</p>
            <p className="text-slate-400 text-sm">Módulos integrados activos</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-slate-500">Juegos • Documentos • Chat • Usuarios</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Módulos Disponibles - Mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Módulos del Sistema</h2>
            <p className="text-slate-400 text-sm">Accede a todas las funcionalidades profesionales</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                nombre: 'Servicios Legales',
                icono: '⚖️',
                descripcion: 'Consultas legales profesionales y asesoría jurídica',
                estado: 'Activo',
                link: '/servicios',
                color: 'from-indigo-500/20 to-blue-500/20 border-indigo-400/30'
              },
              {
                nombre: 'Centro de Juegos',
                icono: '🎮',
                descripcion: 'Plataforma de juegos profesionales con sistema de tokens',
                estado: 'Activo',
                link: '/games',
                color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30'
              },
              {
                nombre: 'Gestión de Documentos',
                icono: '📋',
                descripcion: 'Almacenamiento y gestión de documentos legales',
                estado: 'Activo',
                link: '/documentos',
                color: 'from-purple-500/20 to-pink-500/20 border-purple-400/30'
              },
              {
                nombre: 'Chat Legal',
                icono: '💬',
                descripcion: 'Asesoría legal en tiempo real con IA',
                estado: 'Activo',
                link: '/chat',
                color: 'from-green-500/20 to-emerald-500/20 border-green-400/30'
              },
              {
                nombre: 'Gestión de Usuarios',
                icono: '👥',
                descripcion: 'Administración de usuarios y permisos',
                estado: 'Activo',
                link: '/usuarios',
                color: 'from-orange-500/20 to-red-500/20 border-orange-400/30'
              },
              {
                nombre: 'Análisis y Reportes',
                icono: '📊',
                descripcion: 'Estadísticas y reportes del sistema',
                estado: 'Activo',
                link: '/reportes',
                color: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
              },
              {
                nombre: 'Configuración',
                icono: '⚙️',
                descripcion: 'Ajustes y configuración del sistema',
                estado: 'Activo',
                link: '/configuracion',
                color: 'from-slate-500/20 to-gray-500/20 border-slate-400/30'
              }
            ].map((modulo, i) => (
              <motion.a
                key={i}
                href={modulo.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className={`backdrop-blur-xl bg-gradient-to-br ${modulo.color} border rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{modulo.icono}</div>
                  <span className="text-green-400 text-xs font-bold px-2 py-1 bg-green-500/20 rounded-full">ACTIVO</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{modulo.nombre}</h3>
                <p className="text-slate-300 text-sm mb-4">{modulo.descripcion}</p>
                <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>Acceder</span>
                  <span>→</span>
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
