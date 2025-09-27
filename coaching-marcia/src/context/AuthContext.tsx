import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginForm, RegisterForm } from '../types';
import { authService, userService } from '../services/supabase';
import { supabase } from '../services/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar si hay una sesión activa
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    // Obtener datos completos del usuario
                    const { data: userData } = await userService.getUserById(session.user.id);
                    if (userData) {
                        setUser(userData);
                    }
                }
            } catch (error) {
                console.error('Error checking session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();

        // Escuchar cambios en la autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    const { data: userData } = await userService.getUserById(session.user.id);
                    if (userData) {
                        setUser(userData);
                    }
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                }
                setIsLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);
            const { data, error } = await authService.signIn(email, password);

            if (error) {
                throw new Error(error.message);
            }

            if (data.user) {
                const { data: userData } = await userService.getUserById(data.user.id);
                if (userData) {
                    setUser(userData);
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (formData: RegisterForm): Promise<void> => {
        try {
            setIsLoading(true);

            // Validar contraseñas
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Crear usuario en Supabase Auth
            const { data, error } = await authService.signUp(
                formData.email,
                formData.password,
                {
                    name: formData.name,
                    role: 'student'
                }
            );

            if (error) {
                throw new Error(error.message);
            }

            if (data.user) {
                // Crear perfil de usuario en la base de datos
                const userData = {
                    id: data.user.id,
                    email: formData.email,
                    name: formData.name,
                    role: 'student',
                    avatar: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                const { error: userError } = await userService.createUser(userData);
                if (userError) {
                    console.error('Error creating user profile:', userError);
                }
            }
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await authService.signOut();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        isLoading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
