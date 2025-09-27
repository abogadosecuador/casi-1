import React from 'react';
import { Link } from 'react-router-dom';
import {
    StarIcon,
    CheckIcon,
    AcademicCapIcon,
    HeartIcon,
    SparklesIcon,
    UserGroupIcon,
    BookOpenIcon,
    TrophyIcon
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
    const achievements = [
        { number: '2,500+', label: 'Estudiantes Transformados' },
        { number: '50+', label: 'Cursos y Masterclasses' },
        { number: '10+', label: 'Años de Experiencia' },
        { number: '4.9/5', label: 'Calificación Promedio' }
    ];

    const values = [
        {
            icon: <HeartIcon className="h-8 w-8" />,
            title: 'Pasión por el Crecimiento',
            description: 'Creemos que cada persona tiene el potencial de transformar su vida y alcanzar la abundancia.'
        },
        {
            icon: <SparklesIcon className="h-8 w-8" />,
            title: 'Excelencia en el Servicio',
            description: 'Nos comprometemos a brindar la más alta calidad en todos nuestros programas y servicios.'
        },
        {
            icon: <UserGroupIcon className="h-8 w-8" />,
            title: 'Comunidad de Apoyo',
            description: 'Fomentamos un ambiente de colaboración y apoyo mutuo entre nuestros estudiantes.'
        },
        {
            icon: <BookOpenIcon className="h-8 w-8" />,
            title: 'Aprendizaje Continuo',
            description: 'Creemos en la importancia del crecimiento constante y la actualización de conocimientos.'
        }
    ];

    const certifications = [
        'Coach Profesional Certificado (ICF)',
        'Especialista en Desarrollo Personal',
        'Experta en Péndulo Hebreo',
        'Consultora en Abundancia Financiera',
        'Mentora en Liderazgo Transformacional'
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Conoce a Marcia Iralda Guerron Caicedo
                            </h1>
                            <p className="text-xl text-primary-100 mb-8">
                                Coach profesional, mentora y especialista en transformación personal.
                                Mi misión es ayudarte a descubrir tu potencial y alcanzar la abundancia en todas las áreas de tu vida.
                            </p>
                            <div className="flex items-center space-x-8">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <StarIcon key={i} className="h-6 w-6 fill-current" />
                                    ))}
                                </div>
                                <span className="text-primary-100">
                                    4.9/5 (2,500+ estudiantes)
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                                alt="Marcia Guerron"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                                <div className="flex items-center">
                                    <TrophyIcon className="h-6 w-6 text-yellow-500 mr-2" />
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Coach del Año 2023
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                                    {achievement.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">
                                    {achievement.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                Mi Historia
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                <p>
                                    Mi nombre es Marcia Iralda Guerron Caicedo, y mi viaje comenzó hace más de 10 años
                                    cuando me di cuenta de que muchas personas luchaban con los mismos desafíos que yo había
                                    enfrentado: limitaciones financieras, falta de confianza y la sensación de estar estancadas.
                                </p>
                                <p>
                                    A través de años de estudio, práctica y transformación personal, desarrollé metodologías
                                    únicas que combinan técnicas ancestrales como el péndulo hebreo con estrategias modernas
                                    de coaching y desarrollo personal.
                                </p>
                                <p>
                                    Hoy, he ayudado a más de 2,500 personas a transformar sus vidas, alcanzar la abundancia
                                    financiera y encontrar el equilibrio espiritual que tanto buscaban.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800"
                                alt="Marcia trabajando"
                                className="rounded-2xl shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-sm">"Cada persona tiene el potencial de transformar su vida"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Mis Valores y Principios
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Los principios que guían mi trabajo y mi vida
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Certificaciones y Especializaciones
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Mi formación y experiencia profesional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((certification, index) => (
                            <div key={index} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                <CheckIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {certification}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Mi Misión
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-4xl mx-auto">
                        Ayudar a las personas a descubrir su potencial ilimitado, desarrollar una mentalidad de abundancia
                        y crear la vida de sus sueños a través del coaching, la mentoría y el crecimiento personal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/cursos"
                            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            <BookOpenIcon className="mr-2 h-5 w-5" />
                            Ver Mis Cursos
                        </Link>
                        <Link
                            to="/contacto"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                        >
                            <AcademicCapIcon className="mr-2 h-5 w-5" />
                            Trabajar Conmigo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
