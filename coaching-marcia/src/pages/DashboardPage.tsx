import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    BookOpenIcon,
    CalendarIcon,
    ChartBarIcon,
    TrophyIcon,
    ClockIcon,
    StarIcon,
    PlayIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    const stats = [
        { name: 'Cursos Completados', value: '3', icon: CheckCircleIcon, color: 'text-green-600' },
        { name: 'Horas de Estudio', value: '24', icon: ClockIcon, color: 'text-blue-600' },
        { name: 'Certificados', value: '2', icon: TrophyIcon, color: 'text-yellow-600' },
        { name: 'Progreso Promedio', value: '85%', icon: ChartBarIcon, color: 'text-purple-600' }
    ];

    const recentCourses = [
        {
            id: '1',
            title: 'Sembrando Riqueza: Fundamentos del Abundancia',
            progress: 75,
            nextLesson: 'Módulo 3: Estrategias de Inversión',
            imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800'
        },
        {
            id: '2',
            title: 'Péndulo Hebreo: Sanación y Equilibrio',
            progress: 45,
            nextLesson: 'Módulo 2: Técnicas de Sanación',
            imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800'
        }
    ];

    const upcomingEvents = [
        {
            id: '1',
            title: 'Masterclass: Transformación Financiera',
            date: '2025-02-15',
            time: '18:00',
            type: 'masterclass'
        },
        {
            id: '2',
            title: 'Reto de 21 Días: Sembrando Riqueza',
            date: '2025-03-01',
            time: '09:00',
            type: 'event'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                ¡Hola, {user?.name}! 👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Bienvenido a tu dashboard de aprendizaje
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/cursos"
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Explorar Cursos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        {stat.name}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Courses */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Mis Cursos
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {recentCourses.map((course) => (
                                        <div key={course.id} className="flex items-center space-x-4">
                                            <img
                                                src={course.imageUrl}
                                                alt={course.title}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {course.nextLesson}
                                                </p>
                                                <div className="mt-2">
                                                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                                                        <span>Progreso</span>
                                                        <span>{course.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-primary-600 h-2 rounded-full"
                                                            style={{ width: `${course.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/cursos/${course.id}`}
                                                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                                            >
                                                Continuar
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Link
                                        to="/mis-cursos"
                                        className="text-primary-600 dark:text-primary-400 hover:text-primary-500 font-medium"
                                    >
                                        Ver todos mis cursos →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Upcoming Events */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Próximos Eventos
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {event.title}
                                                </h3>
                                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                                    {new Date(event.date).toLocaleDateString('es-ES')} a las {event.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Link
                                        to="/eventos"
                                        className="text-primary-600 dark:text-primary-400 hover:text-primary-500 text-sm font-medium"
                                    >
                                        Ver todos los eventos →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Acciones Rápidas
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    <Link
                                        to="/perfil"
                                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                                <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                                                    {user?.name?.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Mi Perfil
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                Actualizar información
                                            </p>
                                        </div>
                                    </Link>

                                    <Link
                                        to="/blog"
                                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                                                <BookOpenIcon className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Blog
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                Artículos y recursos
                                            </p>
                                        </div>
                                    </Link>

                                    <Link
                                        to="/contacto"
                                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                                                    💬
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Contacto
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                Hablar con Marcia
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
