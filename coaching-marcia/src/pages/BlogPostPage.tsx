import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/coachingData';
import {
    CalendarIcon,
    UserIcon,
    TagIcon,
    ArrowLeftIcon,
    ShareIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [isLiked, setIsLiked] = React.useState(false);

    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Artículo no encontrado
                    </h1>
                    <Link
                        to="/blog"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-500"
                    >
                        Volver al blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-primary-100 hover:text-white transition-colors"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Volver al blog
                        </Link>
                    </div>

                    <div className="flex items-center mb-4">
                        <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                            {post.category}
                        </span>
                        <span className="ml-3 text-primary-100">
                            {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-primary-100">
                            <UserIcon className="h-5 w-5 mr-2" />
                            <span>{post.author}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`p-2 rounded-full transition-colors ${isLiked
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                            >
                                <HeartIcon className="h-5 w-5" />
                            </button>
                            <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                                <ShareIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-64 object-cover rounded-lg mb-8"
                                />

                                <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    {post.content}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Etiquetas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                                        >
                                            <TagIcon className="h-3 w-3 mr-1" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Share Buttons */}
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Compartir
                                </h3>
                                <div className="flex space-x-4">
                                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                        Twitter
                                    </button>
                                    <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        Facebook
                                    </button>
                                    <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                {/* Author Info */}
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Sobre el Autor
                                    </h3>
                                    <div className="flex items-center mb-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                                            alt="Marcia Guerron"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="ml-3">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {post.author}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Coach Profesional
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Especialista en desarrollo personal, abundancia financiera y equilibrio espiritual.
                                    </p>
                                </div>

                                {/* Related Posts */}
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Artículos Relacionados
                                    </h3>
                                    <div className="space-y-4">
                                        {blogPosts.slice(0, 3).map((relatedPost) => (
                                            <Link
                                                key={relatedPost.id}
                                                to={`/blog/${relatedPost.slug}`}
                                                className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors"
                                            >
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                                    {new Date(relatedPost.publishedAt).toLocaleDateString('es-ES')}
                                                </p>
                                            </Link>
                                        ))}
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

export default BlogPostPage;
