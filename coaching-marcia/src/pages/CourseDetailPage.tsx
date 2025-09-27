import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { featuredCourses } from '../data/coachingData';
import {
    PlayIcon,
    ClockIcon,
    UserGroupIcon,
    StarIcon,
    CheckIcon,
    ArrowRightIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

const CourseDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedModule, setSelectedModule] = useState(0);

    const course = featuredCourses.find(c => c.id === id);

    if (!course) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Curso no encontrado
                    </h1>
                    <Link
                        to="/cursos"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-500"
                    >
                        Volver a los cursos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <div className="flex items-center mb-4">
                                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                                    {course.category.name}
                                </span>
                                <span className="ml-3 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                                    {course.level === 'beginner' ? 'Principiante' :
                                        course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {course.title}
                            </h1>

                            <p className="text-xl text-primary-100 mb-8">
                                {course.description}
                            </p>

                            <div className="flex items-center space-x-8 mb-8">
                                <div className="flex items-center">
                                    <ClockIcon className="h-5 w-5 mr-2" />
                                    <span>{course.duration} horas
                                </div>
                                <div className="flex items-center">
                                    <UserGroupIcon className="h-5 w-5 mr-2" />
                                    <span>{course.modules.length} módulos</span>
                                </div>
                                <div className="flex items-center">
                                    <StarIcon className="h-5 w-5 mr-2 fill-current" />
                                    <span>4.9 (2,500+ estudiantes)</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    <PlayIcon className="inline h-5 w-5 mr-2" />
                                    Ver Preview
                                </button>
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`p-4 rounded-lg border-2 transition-colors ${isFavorite
                                            ? 'border-red-500 bg-red-500 text-white'
                                            : 'border-white text-white hover:bg-white hover:text-primary-600'
                                        }`}
                                >
                                    <HeartIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                                <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                    <PlayIcon className="h-8 w-8 text-primary-600 ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Course Modules */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                    Contenido del Curso
                                </h2>

                                <div className="space-y-4">
                                    {course.modules.map((module, index) => (
                                        <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setSelectedModule(selectedModule === index ? -1 : index)}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {module.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-300">
                                                            {module.description}
                                                        </p>
                                                    </div>
                                                    <ArrowRightIcon
                                                        className={`h-5 w-5 text-gray-400 transition-transform ${selectedModule === index ? 'rotate-90' : ''
                                                            }`}
                                                    />
                                                </div>
                                            </button>

                                            {selectedModule === index && (
                                                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="space-y-3">
                                                        {module.lessons.map((lesson, lessonIndex) => (
                                                            <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                                <div className="flex items-center">
                                                                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                                                                        <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                                                                            {lessonIndex + 1}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                                                            {lesson.title}
                                                                        </h4>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                            {lesson.duration} minutos
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {lesson.type === 'video' ? 'Video' :
                                                                            lesson.type === 'text' ? 'Lectura' :
                                                                                lesson.type === 'quiz' ? 'Quiz' : 'Tarea'}
                                                                    </span>
                                                                    {lesson.isUnlocked ? (
                                                                        <CheckIcon className="h-5 w-5 text-green-500" />
                                                                    ) : (
                                                                        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                    Tu Instructora
                                </h2>

                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                                    <div className="flex items-start space-x-6">
                                        <img
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                                            alt="Marcia Guerron"
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {course.instructor}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                Coach profesional especializada en desarrollo personal, abundancia financiera y equilibrio espiritual.
                                                Con más de 10 años de experiencia transformando vidas.
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <StarIcon key={i} className="h-5 w-5 fill-current" />
                                                    ))}
                                                </div>
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    4.9/5 (2,500+ estudiantes)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                {/* Price Card */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                                    <div className="text-center mb-6">
                                        <div className="flex items-center justify-center mb-2">
                                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                                ${course.price}
                                            </span>
                                            {course.originalPrice && (
                                                <span className="ml-2 text-2xl text-gray-500 line-through">
                                                    ${course.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                        {course.originalPrice && (
                                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                                Ahorra ${course.originalPrice - course.price}
                                            </span>
                                        )}
                                    </div>

                                    <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-4">
                                        Comprar Ahora
                                    </button>

                                    <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        Agregar al Carrito
                                    </button>

                                    <div className="mt-4 text-center">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Garantía de 30 días
                                        </p>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Información del Curso
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Duración</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {course.duration} horas
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Módulos</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {course.modules.length}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Nivel</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {course.level === 'beginner' ? 'Principiante' :
                                                    course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Idioma</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                Español
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseDetailPage;
