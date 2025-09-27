import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CreditCardIcon,
    BanknotesIcon,
    DevicePhoneMobileIcon,
    CheckCircleIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';

const CheckoutPage: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const cartItems = [
        {
            id: '1',
            name: 'Sembrando Riqueza: Fundamentos del Abundancia',
            type: 'course',
            price: 297,
            originalPrice: 497,
            imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800'
        }
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const discount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simular procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsProcessing(false);
        setIsCompleted(true);
    };

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        ¡Pago Exitoso!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Tu pago ha sido procesado correctamente. Ya puedes acceder a tu curso.
                    </p>
                    <div className="space-y-3">
                        <Link
                            to="/mis-cursos"
                            className="w-full inline-flex justify-center items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                            Ir a Mis Cursos
                        </Link>
                        <Link
                            to="/dashboard"
                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Ir al Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="lg:order-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                Resumen del Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {item.type === 'course' ? 'Curso' : 'Producto'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                ${item.price}
                                            </p>
                                            {item.originalPrice && (
                                                <p className="text-sm text-gray-500 line-through">
                                                    ${item.originalPrice}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                    <span className="text-gray-900 dark:text-white">${subtotal}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600 dark:text-green-400">Descuento</span>
                                        <span className="text-green-600 dark:text-green-400">-${discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">Impuestos</span>
                                    <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-2">
                                    <span className="text-gray-900 dark:text-white">Total</span>
                                    <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="lg:order-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                Información de Pago
                            </h2>

                            {/* Payment Methods */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                    Método de Pago
                                </h3>
                                <div className="space-y-3">
                                    <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                        />
                                        <CreditCardIcon className="h-5 w-5 ml-3 text-gray-400" />
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                                            Tarjeta de Crédito/Débito
                                        </span>
                                    </label>

                                    <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                        />
                                        <BanknotesIcon className="h-5 w-5 ml-3 text-gray-400" />
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                                            PayPal
                                        </span>
                                    </label>

                                    <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="transfer"
                                            checked={paymentMethod === 'transfer'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                        />
                                        <DevicePhoneMobileIcon className="h-5 w-5 ml-3 text-gray-400" />
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                                            Transferencia Bancaria
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Card Form */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Número de Tarjeta
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Fecha de Vencimiento
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/AA"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nombre en la Tarjeta
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Juan Pérez"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* PayPal Info */}
                            {paymentMethod === 'paypal' && (
                                <div className="text-center py-8">
                                    <BanknotesIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Serás redirigido a PayPal para completar tu pago
                                    </p>
                                </div>
                            )}

                            {/* Transfer Info */}
                            {paymentMethod === 'transfer' && (
                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                                            Información para Transferencia
                                        </h3>
                                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            <p><strong>Banco:</strong> Banco del Pacífico</p>
                                            <p><strong>Cuenta:</strong> 1234567890</p>
                                            <p><strong>Titular:</strong> Marcia Iralda Guerron Caicedo</p>
                                            <p><strong>Concepto:</strong> Curso Sembrando Riqueza</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Terms and Conditions */}
                            <div className="mt-6">
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded mt-1"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                        Acepto los{' '}
                                        <Link to="/terminos" className="text-primary-600 dark:text-primary-400 hover:text-primary-500">
                                            términos y condiciones
                                        </Link>{' '}
                                        y la{' '}
                                        <Link to="/privacidad" className="text-primary-600 dark:text-primary-400 hover:text-primary-500">
                                            política de privacidad
                                        </Link>
                                    </span>
                                </label>
                            </div>

                            {/* Security Notice */}
                            <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <LockClosedIcon className="h-4 w-4 mr-2" />
                                Tu información está protegida con encriptación SSL
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
