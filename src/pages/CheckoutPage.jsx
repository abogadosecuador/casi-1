import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaLock, FaCreditCard, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import Footer from '../components/Footer/Footer';
import PayPalButton from '../components/Payment/PayPalButton';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/supabaseService';

const CheckoutPage = () => {
  const { cart = [], getCartTotal, clearCart, checkout } = useCart() || {};
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    identificacion: '',
    direccion: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  
  // Cargar datos del usuario si está autenticado
  useEffect(() => {
    if (user) {
      // Intentar obtener información del perfil desde Supabase
      const fetchUserProfile = async () => {
        try {
          const { data, error } = await dataService.getById('profiles', user.id);
          
          if (data && !error) {
            setBillingInfo({
              name: data.full_name || '',
              email: user.email || '',
              phone: data.phone || '',
              identificacion: data.identification || '',
              direccion: data.address || ''
            });
          }
        } catch (error) {
          console.error('Error al obtener perfil de usuario:', error);
        }
      };
      
      fetchUserProfile();
    }
  }, [user]);
  
  // Verificar que hay productos en el carrito
  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.error('No hay productos en el carrito');
      navigate('/tienda');
    }
  }, [cart, navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    // Validar campos obligatorios
    if (!billingInfo.name.trim()) {
      toast.error('Por favor ingrese su nombre completo');
      return false;
    }
    
    if (!billingInfo.email.trim() || !/^\S+@\S+\.\S+$/.test(billingInfo.email)) {
      toast.error('Por favor ingrese un correo electrónico válido');
      return false;
    }
    
    if (!billingInfo.phone.trim()) {
      toast.error('Por favor ingrese su número telefónico');
      return false;
    }
    
    return true;
  };
  
  const handleBankTransfer = async () => {
    if (!validateForm()) return;
    
    if (!user) {
      toast.error('Debes iniciar sesión para realizar la compra');
      navigate('/login');
      return;
    }
    
    setLoading(true);
    
    try {
      // Generar ID único para la orden
      const orderId = 'ORD-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
      
      // Calcular totales
      const subtotal = getCartTotal();
      const tax = subtotal * 0.12; // 12% IVA
      const total = subtotal + tax;
      
      // Crear la orden en Supabase
      const orderData = {
        id: orderId,
        user_id: user.id,
        amount: total,
        subtotal: subtotal,
        tax: tax,
        status: 'pending', // Pendiente hasta que se confirme el pago
        payment_method: 'bank_transfer',
        items: cart,
        billing_info: billingInfo,
        created_at: new Date().toISOString()
      };
      
      const { error: orderError } = await dataService.create('orders', orderData);
      
      if (orderError) {
        throw new Error('Error al crear la orden');
      }
      
      // Crear registros de compra individuales (en estado pendiente)
      const purchasePromises = cart.map(async (item) => {
        const purchaseData = {
          user_id: user.id,
          product_id: item.id,
          product_type: item.category || 'product',
          product_name: item.name,
          amount: item.price,
          quantity: item.quantity || 1,
          order_id: orderId,
          payment_method: 'bank_transfer',
          status: 'pending' // Se activará cuando se confirme el pago
        };
        
        return dataService.create('purchases', purchaseData);
      });
      
      await Promise.all(purchasePromises);
      
      // Limpiar carrito
      clearCart();
      
      toast.success('Orden creada exitosamente. Pendiente de confirmación de pago.');
      
      // Redirigir a página de éxito
      navigate('/payment/success', { 
        state: { 
          orderId,
          amount: total,
          billingInfo,
          paymentMethod: 'bank_transfer'
        } 
      });
      
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      toast.error('Hubo un problema al procesar su orden. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Finalizar Compra | Abg. Wilson Ipiales</title>
        <meta name="description" content="Finalice su compra de servicios legales con el Abg. Wilson Ipiales" />
      </Helmet>
      
      <main className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-900 mb-8"
          >
            Finalizar Compra
          </motion.h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Formulario de Checkout */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaInfoCircle className="mr-2 text-blue-600" />
                Información de Facturación
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={billingInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700 mb-1">
                    Cédula o RUC
                  </label>
                  <input
                    type="text"
                    id="identificacion"
                    name="identificacion"
                    value={billingInfo.identificacion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={billingInfo.direccion}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaCreditCard className="mr-2 text-blue-600" />
                  Método de Pago
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-600">
                    <input
                      id="paypal"
                      name="payment-method"
                      type="radio"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-900">
                      PayPal (Tarjeta de crédito/débito)
                    </label>
                    <div className="ml-auto flex items-center gap-2">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.633h8.14c2.97 0 4.968 1.238 5.156 3.195.087.904-.008 1.637-.283 2.256.278.63.425 1.332.425 2.117 0 3.257-2.606 5.682-6.63 5.682H9.647a.77.77 0 0 0-.76.633l-.54 3.438a.641.641 0 0 1-.633.633h-.038z"/>
                      </svg>
                      <span className="text-xs text-gray-600">Pago Seguro</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Nota:</strong> La transferencia bancaria requiere validación manual del administrador.
                    </p>
                    <p className="text-sm text-gray-500">
                      Por favor, use PayPal para recibir acceso inmediato a sus productos.
                    </p>
                  </div>
                </div>
                
                {paymentMethod === 'paypal' && (
                  <PayPalButton 
                    amount={(getCartTotal() * 1.12).toFixed(2)}
                    onSuccess={async (details) => {
                      console.log('PayPal payment successful:', details);
                      setLoading(true);
                      
                      const result = await checkout('paypal', details);
                      
                      setLoading(false);
                      
                      if (result.success) {
                        toast.success('¡Compra realizada con éxito!');
                        navigate('/payment/success', {
                          state: {
                            orderId: result.orderId,
                            amount: getCartTotal() * 1.12,
                            billingInfo,
                            paymentMethod: 'paypal'
                          }
                        });
                      }
                    }}
                    onError={(err) => {
                      console.error('PayPal payment error:', err);
                      toast.error('Ocurrió un error durante el pago con PayPal.');
                    }}
                  />
                )}
              </div>
            </motion.div>
            
            {/* Resumen del Pedido */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaShoppingCart className="mr-2 text-blue-600" />
                Resumen del Pedido
              </h2>
              
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.name} {item.quantity > 1 && `(${item.quantity})`}
                      </p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${getCartTotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">IVA (12%)</p>
                  <p className="text-sm font-medium text-gray-900">${(getCartTotal() * 0.12).toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-4 text-lg font-bold">
                  <p>Total</p>
                  <p>${(getCartTotal() * 1.12).toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center text-sm text-gray-600">
                <FaLock className="text-green-500 mr-2" />
                <p>Pago seguro garantizado</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CheckoutPage;
