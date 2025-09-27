import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Lo sentimos, la página que buscas no existe o ha sido movida.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                        <HomeIcon className="h-5 w-5 mr-2" />
                        Ir al Inicio
                    </Link>

                    <div className="flex justify-center">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-2" />
                            Volver Atrás
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    <p>Si crees que esto es un error, por favor contáctanos.</p>
                    <Link
                        to="/contacto"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-500"
                    >
                        Contactar Soporte
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
