import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navigation/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'
import ChatbotButton from '../components/ChatbotButton'
import CookiesBanner from '../components/CookiesBanner'

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Abg. W. Ipiales</h3>
              <p className="text-gray-400">Soluciones legales profesionales para empresas y particulares.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services" className="hover:text-white transition-colors">Derecho Civil</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Derecho Penal</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Derecho Comercial</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Cursos</Link></li>
                <li><Link to="/ebooks" className="hover:text-white transition-colors">Ebooks</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+593 98 883 5269</li>
                <li>wilson@ipiales.com</li>
                <li>Ipiales, Nariño</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sistema Legal Profesional. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      <WhatsAppButton />
      <ChatbotButton />
      <CookiesBanner />
    </div>
  )
}

export default PublicLayout
