import React from 'react';
import { Link } from 'react-router-dom';
import {
    PlayIcon,
    StarIcon,
    CheckIcon,
    ArrowRightIcon,
    UserGroupIcon,
    BookOpenIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { featuredCourses, masterclasses, testimonials } from '../data/coachingData';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                                    Transforma tu vida con{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                                        Coaching Profesional
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                    Descubre el poder del crecimiento personal, la abundancia financiera y el equilibrio
                                    espiritual con Marcia Iralda Guerron Caicedo.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/cursos"
                                    className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                                >
                                    Explorar Cursos
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Link>
                                <button className="inline-flex items-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <PlayIcon className="mr-2 h-5 w-5" />
                                    Ver Demo
                                </button>
                            </div>

                            <div className="flex items-center space-x-8">
                                <div className="flex items-center">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-r from-primary-400 to-secondary-400"
                                            />
                                        ))}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">+2,500</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Estudiantes</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <StarIcon key={i} className="h-5 w-5 fill-current" />
                                        ))}
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">4.9/5</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Calificación</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                                    alt="Marcia Guerron"
                                    className="rounded-2xl shadow-2xl"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 bg-primary-600 text-white p-4 rounded-full shadow-lg">
                                <SparklesIcon className="h-8 w-8" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-secondary-600 text-white p-4 rounded-full shadow-lg">
                                <BookOpenIcon className="h-8 w-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            ¿Por qué elegir nuestros cursos?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Metodología probada y resultados garantizados
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <UserGroupIcon className="h-8 w-8" />,
                                title: 'Comunidad Exclusiva',
                                description: 'Accede a una comunidad privada de estudiantes y mentores que te apoyarán en tu crecimiento.'
                            },
                            {
                                icon: <BookOpenIcon className="h-8 w-8" />,
                                title: 'Contenido Actualizado',
                                description: 'Materiales y recursos actualizados constantemente con las últimas tendencias y técnicas.'
                            },
                            {
                                icon: <SparklesIcon className="h-8 w-8" />,
                                title: 'Resultados Garantizados',
                                description: 'Metodología probada que ha transformado la vida de miles de personas en todo el mundo.'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Cursos Destacados
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Los cursos más populares y efectivos para tu transformación
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCourses.map((course) => (
                            <div key={course.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <img
                                    src={course.imageUrl}
                                    alt={course.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                            {course.category.name}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {course.duration}h
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {course.shortDescription}
                                    </p>
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

                    <div className="text-center mt-12">
                        <Link
                            to="/cursos"
                            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            Ver Todos los Cursos
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Masterclasses */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Próximas Masterclasses
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Sesiones intensivas con Marcia Guerron
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {masterclasses.map((masterclass) => (
                            <div key={masterclass.id} className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                                        {new Date(masterclass.date).toLocaleDateString('es-ES')}
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {masterclass.duration}h
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {masterclass.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {masterclass.description}
                                </p>
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
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Lo que dicen nuestros estudiantes
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Historias reales de transformación
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.imageUrl}
                                        alt={testimonial.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {testimonial.role}
                                            {testimonial.company && ` en ${testimonial.company}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 mb-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <StarIcon key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    "{testimonial.content}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Listo para transformar tu vida?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Únete a miles de personas que ya han comenzado su camino hacia la abundancia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/registro"
                            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Comenzar Ahora
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/contacto"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                        >
                            Hablar con Marcia
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
