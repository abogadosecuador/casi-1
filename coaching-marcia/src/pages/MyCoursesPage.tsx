import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    PlayIcon,
    CheckCircleIcon,
    ClockIcon,
    StarIcon,
    BookOpenIcon,
    TrophyIcon
} from '@heroicons/react/24/outline';

const MyCoursesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('enrolled');

    const enrolledCourses = [
        {
            id: '1',
            title: 'Sembrando Riqueza: Fundamentos del Abundancia',
            instructor: 'Marcia Iralda Guerron Caicedo',
            progress: 75,
            totalLessons: 20,
            completedLessons: 15,
            lastAccessed: '2025-01-27',
            imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800',
            nextLesson: 'Módulo 3: Estrategias de Inversión',
            status: 'in_progress'
        },
        {
            id: '2',
            title: 'Péndulo Hebreo: Sanación y Equilibrio',
            instructor: 'Marcia Iralda Guerron Caicedo',
            progress: 45,
            totalLessons: 25,
            completedLessons: 11,
            lastAccessed: '2025-01-25',
            imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800',
            nextLesson: 'Módulo 2: Técnicas de Sanación',
            status: 'in_progress'
        }
    ];

    const completedCourses = [
        {
            id: '3',
            title: 'Introducción al Coaching Personal',
            instructor: 'Marcia Iralda Guerron Caicedo',
            progress: 100,
            totalLessons: 12,
            completedLessons: 12,
            completedDate: '2025-01-20',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
            certificate: true,
            status: 'completed'
        }
    ];

    const tabs = [
        { id: 'enrolled', name: 'En Progreso', count: enrolledCourses.length },
        { id: 'completed', name: 'Completados', count: completedCourses.length },
        { id: 'certificates', name: 'Certificados', count: completedCourses.filter(c => c.certificate).length }
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in_progress':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        En Progreso
                    </span>
                );
            case 'completed':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Completado
                    </span>
                );
            default:
                return null;
        }
    };

    const renderCourseCard = (course: any) => (
        <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
                <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                    {getStatusBadge(course.status)}
                </div>
                <div className="absolute top-4 right-4">
                    {course.certificate && (
                        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-2 rounded-full">
                            <TrophyIcon className="h-5 w-5" />
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {course.instructor}
                </p>

                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
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

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                        <BookOpenIcon className="h-4 w-4 mr-1" />
                        {course.completedLessons}/{course.totalLessons} lecciones
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {course.status === 'completed' ? `Completado ${course.completedDate}` : `Último acceso ${course.lastAccessed}`}
                    </div>
                </div>

                {course.status === 'in_progress' && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Siguiente: {course.nextLesson}
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <Link
                        to={`/cursos/${course.id}`}
                        className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                        <PlayIcon className="h-4 w-4 mr-2" />
                        {course.status === 'completed' ? 'Revisar' : 'Continuar'}
                    </Link>

                    {course.certificate && (
                        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <TrophyIcon className="h-4 w-4 mr-2" />
                            Certificado
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Mis Cursos
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Gestiona tu aprendizaje y progreso
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.name}
                                    <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-0.5 px-2.5 rounded-full text-xs">
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'enrolled' && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Cursos en Progreso
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Continúa tu aprendizaje donde lo dejaste
                            </p>
                        </div>

                        {enrolledCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                    No tienes cursos en progreso
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Explora nuestros cursos y comienza tu aprendizaje
                                </p>
                                <div className="mt-6">
                                    <Link
                                        to="/cursos"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                                    >
                                        Explorar Cursos
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enrolledCourses.map(renderCourseCard)}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'completed' && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Cursos Completados
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Revisa tus logros y certificados
                            </p>
                        </div>

                        {completedCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                    No has completado ningún curso
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Completa tus cursos para obtener certificados
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {completedCourses.map(renderCourseCard)}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'certificates' && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Mis Certificados
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Descarga y comparte tus certificados
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedCourses.filter(c => c.certificate).map((course) => (
                                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-6 text-center">
                                        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <TrophyIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            Completado el {course.completedDate}
                                        </p>
                                        <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                                            Descargar Certificado
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCoursesPage;
