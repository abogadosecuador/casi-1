import React from 'react';
import { Link } from 'react-router-dom';
import { events } from '../data/coachingData';
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    UserGroupIcon,
    StarIcon
} from '@heroicons/react/24/outline';

const EventsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Eventos y Retos
                    </h1>
                    <p className="text-xl text-primary-100 mb-8">
                        Únete a nuestros eventos especiales y retos transformadores
                    </p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                                            {new Date(event.date).toLocaleDateString('es-ES')}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                                            {event.duration} días
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {event.description}
                                    </p>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            {new Date(event.date).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <ClockIcon className="h-4 w-4 mr-2" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <MapPinIcon className="h-4 w-4 mr-2" />
                                            {event.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <UserGroupIcon className="h-4 w-4 mr-2" />
                                            {event.currentParticipants}/{event.maxParticipants} participantes
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                ${event.price}
                                            </span>
                                        </div>
                                        <Link
                                            to={`/eventos/${event.id}`}
                                            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                                        >
                                            Participar
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
                        ¿Tienes una idea para un evento?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Contáctanos para proponer nuevos eventos y retos
                    </p>
                    <Link
                        to="/contacto"
                        className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Proponer Evento
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default EventsPage;
