import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import MasterclassesPage from './pages/MasterclassesPage';
import EventsPage from './pages/EventsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import MyCoursesPage from './pages/MyCoursesPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppProvider>
                <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
                    <Header />
                    <main className="flex-1">
                        <Routes>
                            {/* Páginas públicas */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/registro" element={<RegisterPage />} />
                            <Route path="/cursos" element={<CoursesPage />} />
                            <Route path="/cursos/:id" element={<CourseDetailPage />} />
                            <Route path="/masterclasses" element={<MasterclassesPage />} />
                            <Route path="/eventos" element={<EventsPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:slug" element={<BlogPostPage />} />
                            <Route path="/contacto" element={<ContactPage />} />
                            <Route path="/sobre-marcia" element={<AboutPage />} />

                            {/* Páginas protegidas */}
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/perfil" element={<ProfilePage />} />
                            <Route path="/mis-cursos" element={<MyCoursesPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />

                            {/* 404 */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AppProvider>
        </AuthProvider>
    );
};

export default App;
