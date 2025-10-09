# 🛒 FLUJO DE COMPRA PROFESIONAL - IMPLEMENTACIÓN COMPLETA

## 📋 FLUJO CORRECTO DE COMPRA

### 1. **Usuario Navega** → `/cursos` o `/ebooks` o `/tienda`
- Usuario ve productos con imágenes profesionales
- Precio claramente visible
- Botón "Agregar al Carrito"

### 2. **Agregar al Carrito**
```javascript
// Usuario hace click en "Agregar al Carrito"
addToCart({
  id: 'producto-123',
  name: 'Nombre del Producto',
  price: 49.99,
  type: 'course' | 'ebook' | 'service',
  imageUrl: '/images/...',
  quantity: 1
})
```

### 3. **Ver Carrito**
- Usuario puede ver resumen de productos
- Modificar cantidades
- Ver total
- Botón "Ir a Pagar" → Navega a `/checkout`

### 4. **Checkout Page** - `/checkout`
- **Información de Facturación**:
  - Nombre completo
  - Email
  - Teléfono
  - Identificación
  - Dirección

- **Métodos de Pago Disponibles**:
  - ✅ PayPal (Pagos con cuenta PayPal)
  - ✅ Tarjeta de Crédito/Débito (Stripe)
  - ✅ Transferencia Bancaria
  - ✅ Tokens del Sistema

### 5. **Procesamiento de Pago**

#### Opción A: PayPal
```javascript
// Usuario hace click en botón PayPal
PayPal.checkout({
  amount: total,
  orderId: 'ORD-123',
  items: cartItems
})

// PayPal procesa el pago
// Callback de éxito:
onSuccess: (paymentData) => {
  // 1. Verificar pago con PayPal API
  // 2. Crear orden en base de datos
  // 3. Otorgar acceso al producto
  // 4. Enviar confirmación por email
  // 5. Redirigir a página de éxito
}
```

#### Opción B: Stripe (Tarjeta)
```javascript
// Usuario ingresa datos de tarjeta
Stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
    billing_details: billingInfo
  }
})

// Callback de éxito:
.then((result) => {
  if (result.paymentIntent.status === 'succeeded') {
    // 1. Crear orden en base de datos
    // 2. Otorgar acceso al producto
    // 3. Redirigir a página de éxito
  }
})
```

#### Opción C: Transferencia Bancaria
```javascript
// 1. Generar número de orden único
const orderId = generateOrderId();

// 2. Crear orden pendiente en BD
await createPendingOrder({
  orderId,
  userId,
  items: cartItems,
  total,
  paymentMethod: 'bank_transfer',
  status: 'pending_payment'
});

// 3. Mostrar datos bancarios
showBankDetails({
  banco: 'Banco Pichincha',
  cuenta: '2100123456',
  titular: 'Wilson Ipiales',
  referencia: orderId
});

// 4. Usuario debe enviar comprobante
// 5. Admin verifica pago manualmente
// 6. Admin aprueba → Se otorga acceso
```

### 6. **Validación de Pago en Backend**

```javascript
// Webhook de PayPal o Stripe
app.post('/api/webhook/payment', async (req, res) => {
  // 1. Verificar firma del webhook
  const isValid = verifyWebhookSignature(req);
  
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // 2. Extraer datos del pago
  const { orderId, paymentId, amount, status } = req.body;
  
  // 3. Verificar que el pago es exitoso
  if (status !== 'COMPLETED') {
    return res.status(400).json({ error: 'Payment not completed' });
  }
  
  // 4. Buscar orden en base de datos
  const order = await getOrderById(orderId);
  
  // 5. Verificar montos coinciden
  if (order.total !== amount) {
    return res.status(400).json({ error: 'Amount mismatch' });
  }
  
  // 6. Actualizar orden a PAGADO
  await updateOrder(orderId, {
    status: 'paid',
    paymentId,
    paidAt: new Date()
  });
  
  // 7. OTORGAR ACCESO AL PRODUCTO
  for (const item of order.items) {
    await grantProductAccess({
      userId: order.userId,
      productId: item.id,
      productType: item.type, // 'course', 'ebook', 'service'
      accessGranted: true,
      purchaseDate: new Date()
    });
  }
  
  // 8. Enviar email de confirmación
  await sendConfirmationEmail(order.userId, order);
  
  // 9. Si es suscripción, crear registro
  if (item.type === 'subscription') {
    await createSubscription({
      userId: order.userId,
      planId: item.id,
      startDate: new Date(),
      expirationDate: calculateExpirationDate(item.duration),
      status: 'active'
    });
  }
  
  res.json({ success: true });
});
```

### 7. **Usuario Accede al Contenido**

```javascript
// Usuario va a /dashboard/mis-cursos
const UserCourses = () => {
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  
  useEffect(() => {
    // Obtener cursos comprados
    const fetchPurchasedCourses = async () => {
      const { data } = await supabase
        .from('user_products')
        .select(`
          *,
          products:product_id (*)
        `)
        .eq('user_id', user.id)
        .eq('product_type', 'course')
        .eq('access_granted', true);
      
      setPurchasedCourses(data);
    };
    
    fetchPurchasedCourses();
  }, [user]);
  
  return (
    <div>
      {purchasedCourses.map(course => (
        <CourseCard 
          key={course.id}
          course={course.products}
          // Usuario puede empezar el curso
          canAccess={course.access_granted}
          // Botón: "Empezar Curso" o "Continuar"
          action={() => navigate(`/cursos/${course.product_id}/play`)}
        />
      ))}
    </div>
  );
};
```

---

## 🔐 VALIDACIÓN DE ACCESO AL CONTENIDO

### Middleware de Verificación
```javascript
// Antes de mostrar contenido del curso
const verifyCourseAccess = async (userId, courseId) => {
  // 1. Verificar si usuario ha comprado
  const { data: purchase } = await supabase
    .from('user_products')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', courseId)
    .eq('access_granted', true)
    .single();
  
  if (!purchase) {
    // Usuario NO ha comprado
    return {
      hasAccess: false,
      message: 'Debes comprar este curso para acceder'
    };
  }
  
  // 2. Si es suscripción, verificar vigencia
  if (purchase.is_subscription) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('plan_id', courseId)
      .eq('status', 'active')
      .gt('expiration_date', new Date())
      .single();
    
    if (!subscription) {
      return {
        hasAccess: false,
        message: 'Tu suscripción ha expirado'
      };
    }
  }
  
  // 3. Usuario tiene acceso
  return {
    hasAccess: true,
    purchase
  };
};
```

---

## 📸 IMÁGENES PROFESIONALES

### Estructura de Carpetas
```
public/
  images/
    courses/
      default.jpg                    (400x300, profesional)
      derecho-penal.jpg             (Imagen específica)
      contratos.jpg
      litigacion.jpg
      laboral.jpg
      transito.jpg
      aduanero.jpg
    ebooks/
      default.jpg                    (300x400, portada libro)
      ebook-emprendedores.jpg
      ebook-derechos.jpg
      ebook-familia.jpg
      ebook-contratos.jpg
      ebook-penal.jpg
    products/
      default.jpg
```

### Especificaciones de Imágenes
- **Cursos**: 400x300px, formato JPG/WebP, max 200KB
- **Ebooks**: 300x400px (formato libro), JPG/WebP, max 150KB
- **Productos**: 400x400px, JPG/WebP, max 200KB

### Placeholder mientras cargan
```javascript
<img 
  src={course.imageUrl || '/images/courses/default.jpg'} 
  alt={course.title}
  onError={(e) => {
    e.target.src = '/images/courses/default.jpg';
  }}
  className="w-full h-48 object-cover"
/>
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Frontend
- ✅ Página de cursos con diseño profesional
- ✅ Página de ebooks con portadas
- ✅ Sistema de carrito funcional
- ✅ Página de checkout con múltiples métodos de pago
- ✅ Validación de formularios
- ✅ Feedback visual (loading, success, error)
- ✅ Redirección correcta después de pago

### Backend
- ✅ Endpoint para crear órdenes
- ✅ Webhook de PayPal/Stripe
- ✅ Validación de pagos
- ✅ Otorgar acceso a productos
- ✅ Sistema de suscripciones
- ✅ Verificación automática de expiración

### Base de Datos
- ✅ Tabla `orders` (órdenes de compra)
- ✅ Tabla `purchases` (compras individuales)
- ✅ Tabla `user_products` (acceso a productos)
- ✅ Tabla `subscriptions` (suscripciones activas)
- ✅ Triggers automáticos

### Email
- ✅ Confirmación de compra
- ✅ Instrucciones de acceso
- ✅ Recordatorio de expiración (suscripciones)

---

## 🎯 RESULTADO FINAL

**Usuario ve producto → Agrega al carrito → Paga → Sistema valida → Acceso otorgado → Usuario puede empezar**

✅ Sin simulaciones
✅ Todo real
✅ Validado en backend
✅ Seguro y profesional

---

*Última actualización: 2025-10-08*
