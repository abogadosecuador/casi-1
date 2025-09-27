import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbybhgxqdefuquybstqk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJoZ3hxZGVmdXF1eWJzdHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAwODMsImV4cCI6MjA3MzEzNjA4M30.s1knFM9QXd8CH8TC0IOtBBBvb-qm2XYl_VlhVb-CqcE';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Servicios de autenticación
export const authService = {
    async signUp(email: string, password: string, userData: any) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        });
        return { data, error };
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    async resetPassword(email: string) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        return { data, error };
    }
};

// Servicios de usuarios
export const userService = {
    async createUser(userData: any) {
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()
            .single();
        return { data, error };
    },

    async getUserById(id: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    },

    async updateUser(id: string, updates: any) {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        return { data, error };
    },

    async deleteUser(id: string) {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);
        return { error };
    }
};

// Servicios de cursos
export const courseService = {
    async getCourses(filters?: any) {
        let query = supabase
            .from('courses')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (filters?.category) {
            query = query.eq('category_id', filters.category);
        }

        if (filters?.level) {
            query = query.eq('level', filters.level);
        }

        if (filters?.search) {
            query = query.ilike('title', `%${filters.search}%`);
        }

        const { data, error } = await query;
        return { data, error };
    },

    async getCourseById(id: string) {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    },

    async createCourse(courseData: any) {
        const { data, error } = await supabase
            .from('courses')
            .insert([courseData])
            .select()
            .single();
        return { data, error };
    },

    async updateCourse(id: string, updates: any) {
        const { data, error } = await supabase
            .from('courses')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        return { data, error };
    },

    async deleteCourse(id: string) {
        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', id);
        return { error };
    }
};

// Servicios de masterclasses
export const masterclassService = {
    async getMasterclasses() {
        const { data, error } = await supabase
            .from('masterclasses')
            .select('*')
            .eq('is_published', true)
            .order('date', { ascending: true });
        return { data, error };
    },

    async getMasterclassById(id: string) {
        const { data, error } = await supabase
            .from('masterclasses')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    },

    async createMasterclass(masterclassData: any) {
        const { data, error } = await supabase
            .from('masterclasses')
            .insert([masterclassData])
            .select()
            .single();
        return { data, error };
    },

    async updateMasterclass(id: string, updates: any) {
        const { data, error } = await supabase
            .from('masterclasses')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        return { data, error };
    }
};

// Servicios de eventos
export const eventService = {
    async getEvents() {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('is_published', true)
            .order('date', { ascending: true });
        return { data, error };
    },

    async getEventById(id: string) {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    },

    async createEvent(eventData: any) {
        const { data, error } = await supabase
            .from('events')
            .insert([eventData])
            .select()
            .single();
        return { data, error };
    }
};

// Servicios de blog
export const blogService = {
    async getBlogPosts(filters?: any) {
        let query = supabase
            .from('blog_posts')
            .select('*')
            .eq('is_published', true)
            .order('published_at', { ascending: false });

        if (filters?.category) {
            query = query.eq('category', filters.category);
        }

        if (filters?.search) {
            query = query.ilike('title', `%${filters.search}%`);
        }

        const { data, error } = await query;
        return { data, error };
    },

    async getBlogPostBySlug(slug: string) {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();
        return { data, error };
    },

    async createBlogPost(postData: any) {
        const { data, error } = await supabase
            .from('blog_posts')
            .insert([postData])
            .select()
            .single();
        return { data, error };
    }
};

// Servicios de ebooks
export const ebookService = {
    async getEbooks() {
        const { data, error } = await supabase
            .from('ebooks')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async getEbookById(id: string) {
        const { data, error } = await supabase
            .from('ebooks')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    }
};

// Servicios de productos
export const productService = {
    async getProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async getProductById(id: string) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    }
};

// Servicios de órdenes
export const orderService = {
    async createOrder(orderData: any) {
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();
        return { data, error };
    },

    async getOrdersByUserId(userId: string) {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async updateOrderStatus(id: string, status: string) {
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single();
        return { data, error };
    }
};

// Servicios de progreso de usuario
export const progressService = {
    async getUserProgress(userId: string, courseId?: string) {
        let query = supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId);

        if (courseId) {
            query = query.eq('course_id', courseId);
        }

        const { data, error } = await query;
        return { data, error };
    },

    async updateProgress(progressData: any) {
        const { data, error } = await supabase
            .from('user_progress')
            .upsert(progressData)
            .select()
            .single();
        return { data, error };
    }
};

// Servicios de suscripciones
export const subscriptionService = {
    async createSubscription(subscriptionData: any) {
        const { data, error } = await supabase
            .from('subscriptions')
            .insert([subscriptionData])
            .select()
            .single();
        return { data, error };
    },

    async getUserSubscription(userId: string) {
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single();
        return { data, error };
    },

    async updateSubscription(id: string, updates: any) {
        const { data, error } = await supabase
            .from('subscriptions')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        return { data, error };
    }
};

// Servicios de contactos
export const contactService = {
    async createContact(contactData: any) {
        const { data, error } = await supabase
            .from('contacts')
            .insert([contactData])
            .select()
            .single();
        return { data, error };
    },

    async getContacts() {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async updateContactStatus(id: string, status: string) {
        const { data, error } = await supabase
            .from('contacts')
            .update({ status })
            .eq('id', id)
            .select()
            .single();
        return { data, error };
    }
};

// Servicios de newsletter
export const newsletterService = {
    async subscribe(email: string, name?: string) {
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email, name }])
            .select()
            .single();
        return { data, error };
    },

    async getSubscribers() {
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    }
};
