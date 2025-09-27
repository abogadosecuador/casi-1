import React from 'react';
import { Link } from 'react-router-dom';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    YoutubeIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        cursos: [
            { name: 'Sembrando Riqueza', href: '/cursos/sembrando-riqueza' },
            { name: 'Péndulo Hebreo', href: '/cursos/pendulo-hebreo' },
            { name: 'Desarrollo Personal', href: '/cursos/desarrollo-personal' },
            { name: 'Coaching Ejecutivo', href: '/cursos/coaching-ejecutivo' },
        ],
        servicios: [
            { name: 'Masterclasses', href: '/masterclasses' },
            { name: 'Eventos', href: '/eventos' },
            { name: 'Consultoría', href: '/consultoria' },
            { name: 'Mentorías', href: '/mentorias' },
        ],
        recursos: [
            { name: 'Blog', href: '/blog' },
            { name: 'E-books', href: '/ebooks' },
            { name: 'Podcast', href: '/podcast' },
            { name: 'Newsletter', href: '/newsletter' },
        ],
        empresa: [
            { name: 'Sobre Marcia', href: '/sobre-marcia' },
            { name: 'Testimonios', href: '/testimonios' },
            { name: 'Contacto', href: '/contacto' },
            { name: 'Política de Privacidad', href: '/privacidad' },
        ],
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo y descripción */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="ml-2 text-xl font-bold">Marcia Guerron</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Transformando vidas a través del coaching, la mentoría y el crecimiento personal.
                            Sembrando riqueza y equilibrio en cada persona.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FacebookIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <TwitterIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <YoutubeIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Cursos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Cursos</h3>
                        <ul className="space-y-2">
                            {footerLinks.cursos.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Servicios</h3>
                        <ul className="space-y-2">
                            {footerLinks.servicios.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recursos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Recursos</h3>
                        <ul className="space-y-2">
                            {footerLinks.recursos.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Empresa */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Empresa</h3>
                        <ul className="space-y-2">
                            {footerLinks.empresa.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="max-w-md">
                        <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Recibe consejos exclusivos y actualizaciones sobre nuevos cursos.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Tu email"
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button className="px-6 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors">
                                Suscribirse
                            </button>
                        </div>
                    </div>
                </div>

                {/* Información de contacto */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center">
                            <EnvelopeIcon className="h-5 w-5 text-primary-500 mr-3" />
                            <span className="text-gray-300 text-sm">hola@marciguerron.com</span>
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon className="h-5 w-5 text-primary-500 mr-3" />
                            <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 text-primary-500 mr-3" />
                            <span className="text-gray-300 text-sm">Ecuador, América del Sur</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Marcia Iralda Guerron Caicedo. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Términos de Servicio
                            </Link>
                            <Link to="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Política de Privacidad
                            </Link>
                            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Política de Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
