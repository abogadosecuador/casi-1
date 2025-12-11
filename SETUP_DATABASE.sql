-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50) DEFAULT 'client' CHECK (rol IN ('admin', 'client', 'guest')),
  balance DECIMAL(10, 2) DEFAULT 0,
  tokens INTEGER DEFAULT 0,
  creado_en TIMESTAMP DEFAULT NOW(),
  actualizado_en TIMESTAMP DEFAULT NOW(),
  activo BOOLEAN DEFAULT true
);

-- Tabla de Transacciones
CREATE TABLE IF NOT EXISTS transacciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  descripcion TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completado', 'fallido', 'cancelado')),
  referencia_externa VARCHAR(255),
  creado_en TIMESTAMP DEFAULT NOW(),
  actualizado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Compras
CREATE TABLE IF NOT EXISTS compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  producto_tipo VARCHAR(50) NOT NULL,
  producto_id VARCHAR(255) NOT NULL,
  cantidad INTEGER DEFAULT 1,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  precio_total DECIMAL(10, 2) NOT NULL,
  metodo_pago VARCHAR(50) NOT NULL,
  estado_pago VARCHAR(50) DEFAULT 'pendiente' CHECK (estado_pago IN ('pendiente', 'completado', 'fallido', 'reembolsado')),
  referencia_paypal VARCHAR(255),
  creado_en TIMESTAMP DEFAULT NOW(),
  actualizado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Tokens
CREATE TABLE IF NOT EXISTS tokens_comprados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'completado',
  transaccion_id UUID REFERENCES transacciones(id),
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Libros/Ebooks
CREATE TABLE IF NOT EXISTS libros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  autor VARCHAR(255),
  precio DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(100),
  url_descarga VARCHAR(500),
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Compras de Libros
CREATE TABLE IF NOT EXISTS compras_libros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  libro_id UUID NOT NULL REFERENCES libros(id),
  precio_pagado DECIMAL(10, 2) NOT NULL,
  fecha_acceso TIMESTAMP DEFAULT NOW(),
  fecha_expiracion TIMESTAMP,
  compra_id UUID REFERENCES compras(id)
);

-- Tabla de Productos Tienda
CREATE TABLE IF NOT EXISTS productos_tienda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(100),
  stock INTEGER DEFAULT 0,
  imagen_url VARCHAR(500),
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Compras Tienda
CREATE TABLE IF NOT EXISTS compras_tienda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  producto_id UUID NOT NULL REFERENCES productos_tienda(id),
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  precio_total DECIMAL(10, 2) NOT NULL,
  estado_entrega VARCHAR(50) DEFAULT 'pendiente',
  compra_id UUID REFERENCES compras(id),
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Servicios Profesionales
CREATE TABLE IF NOT EXISTS servicios_profesionales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  duracion_dias INTEGER,
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Suscripciones
CREATE TABLE IF NOT EXISTS suscripciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  servicio_id UUID NOT NULL REFERENCES servicios_profesionales(id),
  fecha_inicio TIMESTAMP DEFAULT NOW(),
  fecha_fin TIMESTAMP,
  estado VARCHAR(50) DEFAULT 'activa',
  compra_id UUID REFERENCES compras(id),
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Logs de Actividad
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  accion VARCHAR(100) NOT NULL,
  descripcion TEXT,
  ip_address VARCHAR(50),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Tabla de Wallets (para Crypto Banking)
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo_moneda VARCHAR(50) NOT NULL,
  direccion_publica VARCHAR(255),
  saldo DECIMAL(20, 8) DEFAULT 0,
  creado_en TIMESTAMP DEFAULT NOW(),
  actualizado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de Transacciones Crypto
CREATE TABLE IF NOT EXISTS transacciones_crypto (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  wallet_id UUID NOT NULL REFERENCES wallets(id),
  tipo VARCHAR(50) NOT NULL,
  cantidad DECIMAL(20, 8) NOT NULL,
  moneda VARCHAR(50) NOT NULL,
  hash_transaccion VARCHAR(255),
  estado VARCHAR(50) DEFAULT 'pendiente',
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_transacciones_usuario ON transacciones(usuario_id);
CREATE INDEX idx_compras_usuario ON compras(usuario_id);
CREATE INDEX idx_activity_logs_usuario ON activity_logs(usuario_id);
CREATE INDEX idx_wallets_usuario ON wallets(usuario_id);

-- Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Usuarios pueden ver su propio perfil" ON usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden ver sus transacciones" ON transacciones
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden ver sus compras" ON compras
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden ver su actividad" ON activity_logs
  FOR SELECT USING (auth.uid() = usuario_id);
