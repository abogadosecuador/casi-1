// Tipos principales del sistema de coaching
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'coach' | 'student';
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    subscription?: Subscription;
    progress?: UserProgress[];
}

export interface Subscription {
    id: string;
    userId: string;
    planId: string;
    status: 'active' | 'inactive' | 'cancelled' | 'expired';
    startDate: string;
    endDate: string;
    autoRenew: boolean;
    paymentMethod: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    category: CourseCategory;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // en horas
    modules: CourseModule[];
    instructor: string;
    isPublished: boolean;
    isFeatured: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CourseModule {
    id: string;
    title: string;
    description: string;
    order: number;
    lessons: Lesson[];
    isUnlocked: boolean;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'text' | 'quiz' | 'assignment' | 'live';
    content: string;
    duration: number; // en minutos
    order: number;
    isUnlocked: boolean;
    resources?: Resource[];
}

export interface Resource {
    id: string;
    name: string;
    type: 'pdf' | 'video' | 'audio' | 'document' | 'link';
    url: string;
    size?: number;
}

export interface UserProgress {
    id: string;
    userId: string;
    courseId: string;
    moduleId: string;
    lessonId: string;
    completed: boolean;
    progress: number; // 0-100
    timeSpent: number; // en minutos
    lastAccessed: string;
}

export interface Masterclass {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    date: string;
    duration: number; // en horas
    maxParticipants: number;
    currentParticipants: number;
    instructor: string;
    isLive: boolean;
    isRecorded: boolean;
    recordingUrl?: string;
    isPublished: boolean;
    isFeatured: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    time: string;
    duration: number; // en horas
    location: string;
    isOnline: boolean;
    maxParticipants: number;
    currentParticipants: number;
    price: number;
    isPublished: boolean;
    isFeatured: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    category: string;
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface Newsletter {
    id: string;
    title: string;
    content: string;
    subject: string;
    isSent: boolean;
    sentAt?: string;
    recipients: number;
    createdAt: string;
    updatedAt: string;
}

export interface Ebook {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    fileUrl: string;
    fileSize: number;
    pages: number;
    author: string;
    category: string;
    isPublished: boolean;
    isFeatured: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    category: string;
    stock: number;
    isPublished: boolean;
    isFeatured: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'paid' | 'cancelled' | 'refunded';
    paymentMethod: string;
    paymentId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    type: 'course' | 'masterclass' | 'event' | 'ebook' | 'product';
    itemId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Affiliate {
    id: string;
    userId: string;
    code: string;
    commission: number; // porcentaje
    totalEarnings: number;
    totalReferrals: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Referral {
    id: string;
    affiliateId: string;
    referredUserId: string;
    commission: number;
    status: 'pending' | 'approved' | 'paid';
    createdAt: string;
    updatedAt: string;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'closed';
    createdAt: string;
    updatedAt: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    rating: number;
    imageUrl?: string;
    isPublished: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CourseCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    isPublished: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentMethod {
    id: string;
    name: string;
    type: 'card' | 'paypal' | 'crypto' | 'bank_transfer';
    isActive: boolean;
    config: Record<string, any>;
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
}

export interface Analytics {
    totalUsers: number;
    totalCourses: number;
    totalRevenue: number;
    monthlyRevenue: number;
    topCourses: Course[];
    recentOrders: Order[];
    userGrowth: Array<{ date: string; count: number }>;
    revenueGrowth: Array<{ date: string; amount: number }>;
}

// Tipos para formularios
export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

export interface ContactForm {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface NewsletterForm {
    email: string;
    name?: string;
}

// Tipos para filtros y búsquedas
export interface CourseFilters {
    category?: string;
    level?: string;
    priceRange?: [number, number];
    duration?: [number, number];
    tags?: string[];
    search?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    pagination?: Pagination;
}

// Tipos para el contexto de autenticación
export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterForm) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

// Tipos para el contexto de la aplicación
export interface AppContextType {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    language: 'es' | 'en';
    setLanguage: (language: 'es' | 'en') => void;
}
