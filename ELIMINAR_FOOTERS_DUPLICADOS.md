# 🔧 Eliminar Footers Duplicados

## Problema
Las páginas individuales tienen su propio `<Footer />`, pero `App-ipiales.jsx` ya renderiza un footer global (línea 375).

Esto causa **footers duplicados** como se ve en la imagen.

## Solución
Eliminar `<Footer />` de todas las páginas individuales porque ya existe uno global en `App-ipiales.jsx`.

## Páginas con Footer Duplicado

### ✅ YA CORREGIDO:
- SubscriptionsPage.jsx

### ⚠️ PENDIENTES DE CORREGIR:
1. TokensPage.jsx
2. ThankYouPage.jsx
3. ServicioCobrosPage.jsx
4. Seguridad.jsx
5. PoliticasCondiciones.jsx
6. FreeConsultationPage.jsx
7. CoursePlayerPage.jsx
8. CoursesPage.jsx
9. CourseDetailPage.jsx
10. ConsultaIA.jsx
11. ConsultaGeneral.jsx
12. CheckoutPage.jsx
13. BankTransferPage.jsx
14. Blog.jsx

## Qué Hacer

En cada archivo:
1. Eliminar línea: `import Footer from '../components/Footer/Footer';`
2. Eliminar línea: `<Footer />`

## Footer Global
El footer global ya está en `App-ipiales.jsx` línea 375:
```jsx
<Footer />
<CookieConsent />
<WhatsAppChat />
<AILegalChatbot />
```

Esto renderiza el footer una sola vez para TODAS las páginas.
