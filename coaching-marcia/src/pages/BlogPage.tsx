import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/coachingData';
import {
    MagnifyingGlassIcon,
    CalendarIcon,
    UserIcon,
    TagIcon
} from '@heroicons/react/24/outline';

const BlogPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = ['Todos', 'Finanzas', 'Sanación', 'Desarrollo Personal', 'Coaching'];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || selectedCategory === 'Todos' || post.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-xl text-primary-100 mb-8">
                        Artículos, consejos y recursos para tu crecimiento personal
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
                                    placeholder="Buscar artículos..."
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
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {filteredPosts.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Artículo Destacado
                            </h2>

                            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="p-8">
                                        <div className="flex items-center mb-4">
                                            <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                                                {filteredPosts[0].category}
                                            </span>
                                            <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                                {new Date(filteredPosts[0].publishedAt).toLocaleDateString('es-ES')}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            {filteredPosts[0].title}
                                        </h3>

                                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                            {filteredPosts[0].excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    {filteredPosts[0].author}
                                                </span>
                                            </div>
                                            <Link
                                                to={`/blog/${filteredPosts[0].slug}`}
                                                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                            >
                                                Leer Artículo
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <img
                                            src={filteredPosts[0].imageUrl}
                                            alt={filteredPosts[0].title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {filteredPosts.length} artículos encontrados
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Explora nuestros artículos más recientes
                        </p>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
                                <MagnifyingGlassIcon className="h-full w-full" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                                No se encontraron artículos
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Intenta ajustar los filtros de búsqueda
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.slice(1).map((post) => (
                                <article key={post.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                                            <UserIcon className="h-4 w-4 ml-4 mr-2" />
                                            {post.author}
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.slice(0, 2).map((tag, index) => (
                                                    <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                                        <TagIcon className="h-3 w-3 mr-1" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="text-primary-600 dark:text-primary-400 hover:text-primary-500 font-medium"
                                            >
                                                Leer más →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 bg-primary-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Mantente actualizado
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Recibe nuestros mejores artículos directamente en tu correo
                    </p>
                    <div className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="flex-1 px-4 py-3 rounded-l-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button className="px-6 py-3 bg-secondary-600 text-white rounded-r-lg hover:bg-secondary-700 transition-colors">
                            Suscribirse
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
