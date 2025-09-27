import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredCourses, courseCategories } from '../data/coachingData';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    StarIcon,
    ClockIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const CoursesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

    const filteredCourses = featuredCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || course.category.id === selectedCategory;
        const matchesLevel = !selectedLevel || course.level === selectedLevel;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Nuestros Cursos
                    </h1>
                    <p className="text-xl text-primary-100 mb-8">
                        Transforma tu vida con nuestros cursos especializados
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar cursos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="md:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">Todas las categorías</option>
                                {courseCategories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Level Filter */}
                        <div className="md:w-48">
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">Todos los niveles</option>
                                <option value="beginner">Principiante</option>
                                <option value="intermediate">Intermedio</option>
                                <option value="advanced">Avanzado</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {filteredCourses.length} cursos encontrados
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Descubre el curso perfecto para tu crecimiento personal
                        </p>
                    </div>

                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
                                <FunnelIcon className="h-full w-full" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                                No se encontraron cursos
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Intenta ajustar los filtros de búsqueda
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={course.imageUrl}
                                            alt={course.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                                                {course.category.name}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium rounded-full">
                                                {course.level === 'beginner' ? 'Principiante' :
                                                    course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                            {course.shortDescription}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <ClockIcon className="h-4 w-4 mr-1" />
                                                {course.duration}h
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <UserGroupIcon className="h-4 w-4 mr-1" />
                                                {course.modules.length} módulos
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    ${course.price}
                                                </span>
                                                {course.originalPrice && (
                                                    <span className="ml-2 text-lg text-gray-500 line-through">
                                                        ${course.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                            <Link
                                                to={`/cursos/${course.id}`}
                                                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                                            >
                                                Ver Curso
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        ¿No encuentras lo que buscas?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Contáctanos para crear un curso personalizado para ti
                    </p>
                    <Link
                        to="/contacto"
                        className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Contactar a Marcia
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;
