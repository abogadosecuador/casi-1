// Servicios de pago
export interface PaymentConfig {
    paypalClientId: string;
    stripePublishableKey: string;
    currency: string;
}

export const paymentConfig: PaymentConfig = {
    paypalClientId: 'ARZdFZthRzwMXmYc9wtf0Zs4GVMHMbwVGE54_tzngzBT3OWjk4QT89XBVpcvZ57nYmNAZIJf1S4xgr7w',
    stripePublishableKey: 'pk_test_...', // Agregar clave de Stripe si se usa
    currency: 'USD'
};

export interface PaymentItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    type: 'course' | 'masterclass' | 'event' | 'ebook' | 'product';
}

export interface PaymentResult {
    success: boolean;
    paymentId?: string;
    error?: string;
    redirectUrl?: string;
}

export class PaymentService {
    // PayPal
    static async createPayPalPayment(items: PaymentItem[], total: number): Promise<PaymentResult> {
        try {
            const response = await fetch('/api/payments/paypal/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    total,
                    currency: paymentConfig.currency
                })
            });

            const data = await response.json();

            if (data.success) {
                return {
                    success: true,
                    paymentId: data.paymentId,
                    redirectUrl: data.redirectUrl
                };
            } else {
                return {
                    success: false,
                    error: data.error
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error al procesar el pago con PayPal'
            };
        }
    }

    // Stripe
    static async createStripePayment(items: PaymentItem[], total: number): Promise<PaymentResult> {
        try {
            const response = await fetch('/api/payments/stripe/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    total,
                    currency: paymentConfig.currency
                })
            });

            const data = await response.json();

            if (data.success) {
                return {
                    success: true,
                    paymentId: data.paymentId,
                    redirectUrl: data.redirectUrl
                };
            } else {
                return {
                    success: false,
                    error: data.error
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error al procesar el pago con Stripe'
            };
        }
    }

    // Transferencia bancaria
    static async createBankTransfer(items: PaymentItem[], total: number): Promise<PaymentResult> {
        try {
            const response = await fetch('/api/payments/bank-transfer/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    total,
                    currency: paymentConfig.currency
                })
            });

            const data = await response.json();

            if (data.success) {
                return {
                    success: true,
                    paymentId: data.paymentId
                };
            } else {
                return {
                    success: false,
                    error: data.error
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error al procesar la transferencia bancaria'
            };
        }
    }

    // Verificar estado del pago
    static async verifyPayment(paymentId: string, method: string): Promise<PaymentResult> {
        try {
            const response = await fetch(`/api/payments/${method}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentId })
            });

            const data = await response.json();

            return {
                success: data.success,
                error: data.error
            };
        } catch (error) {
            return {
                success: false,
                error: 'Error al verificar el pago'
            };
        }
    }

    // Procesar reembolso
    static async processRefund(paymentId: string, amount?: number): Promise<PaymentResult> {
        try {
            const response = await fetch('/api/payments/refund', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentId, amount })
            });

            const data = await response.json();

            return {
                success: data.success,
                error: data.error
            };
        } catch (error) {
            return {
                success: false,
                error: 'Error al procesar el reembolso'
            };
        }
    }
}

// Utilidades de pago
export const paymentUtils = {
    formatPrice(price: number, currency: string = 'USD'): string {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: currency
        }).format(price);
    },

    calculateDiscount(originalPrice: number, currentPrice: number): number {
        return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    },

    calculateTax(amount: number, taxRate: number = 0.12): number {
        return amount * taxRate;
    },

    calculateTotal(items: PaymentItem[], taxRate: number = 0.12): number {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = this.calculateTax(subtotal, taxRate);
        return subtotal + tax;
    }
};
