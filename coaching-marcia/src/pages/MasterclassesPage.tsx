import React from 'react';
import { Link } from 'react-router-dom';
import { masterclasses } from '../data/coachingData';
import {
    CalendarIcon,
    ClockIcon,
    UserGroupIcon,
    StarIcon,
    PlayIcon
} from '@heroicons/react/24/outline';

const MasterclassesPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Masterclasses Exclusivas
                    </h1>
                    <p className="text-xl text-primary-100 mb-8">
                        Sesiones intensivas con Marcia Guerron para tu transformación
                    </p>
                </div>
            </section>

            {/* Masterclasses Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {masterclasses.map((masterclass) => (
                            <div key={masterclass.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative">
                                    <img
                                        src={masterclass.imageUrl}
                                        alt={masterclass.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                                            {new Date(masterclass.date).toLocaleDateString('es-ES')}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                                            {masterclass.duration}h
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {masterclass.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        {masterclass.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <UserGroupIcon className="h-4 w-4 mr-2" />
                                            {masterclass.currentParticipants}/{masterclass.maxParticipants} participantes
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <ClockIcon className="h-4 w-4 mr-2" />
                                            {new Date(masterclass.date).toLocaleTimeString('es-ES', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                ${masterclass.price}
                                            </span>
                                            {masterclass.originalPrice && (
                                                <span className="ml-2 text-xl text-gray-500 line-through">
                                                    ${masterclass.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            to={`/masterclasses/${masterclass.id}`}
                                            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            Reservar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        ¿Quieres ser notificado de nuevas masterclasses?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Suscríbete a nuestro newsletter para recibir información exclusiva
                    </p>
                    <div className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button className="px-6 py-3 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors">
                            Suscribirse
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MasterclassesPage;
