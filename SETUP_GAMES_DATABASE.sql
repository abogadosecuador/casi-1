-- ============================================================================
-- CONFIGURACIÓN DE BASE DE DATOS PARA SISTEMA DE JUEGOS PROFESIONAL
-- ============================================================================
-- Este archivo contiene todas las tablas necesarias para el sistema de juegos
-- integrado con la plataforma de servicios legales

-- ============================================================================
-- 1. TABLA: games
-- Almacena información de todos los juegos disponibles
-- ============================================================================
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id VARCHAR(50) UNIQUE NOT NULL,
  name_es VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_es TEXT,
  description_en TEXT,
  icon VARCHAR(10),
  category VARCHAR(50) NOT NULL, -- legal, arcade, puzzle, strategy
  difficulty VARCHAR(20) NOT NULL, -- easy, medium, hard
  price_tokens INTEGER NOT NULL DEFAULT 0,
  reward_tokens INTEGER NOT NULL DEFAULT 0,
  reward_xp INTEGER NOT NULL DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. TABLA: user_games
-- Almacena qué juegos posee cada usuario
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id VARCHAR(50) NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, game_id)
);

-- ============================================================================
-- 3. TABLA: game_progress
-- Almacena el progreso de cada usuario en cada juego
-- ============================================================================
CREATE TABLE IF NOT EXISTS game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id VARCHAR(50) NOT NULL,
  level INTEGER DEFAULT 1,
  score INTEGER DEFAULT 0,
  high_score INTEGER DEFAULT 0,
  time_played INTEGER DEFAULT 0, -- en segundos
  achievements TEXT[] DEFAULT ARRAY[]::TEXT[],
  completed BOOLEAN DEFAULT false,
  last_played TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, game_id)
);

-- ============================================================================
-- 4. TABLA: user_tokens
-- Almacena el saldo de tokens de cada usuario
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. TABLA: token_transactions
-- Registro de todas las transacciones de tokens
-- ============================================================================
CREATE TABLE IF NOT EXISTS token_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL, -- compra, recompensa, compra_juego, etc
  cantidad INTEGER NOT NULL,
  precio_usd DECIMAL(10, 2),
  game_id VARCHAR(50),
  paquete_id VARCHAR(50),
  razon TEXT,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. TABLA: user_achievements
-- Almacena los logros desbloqueados por cada usuario
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(50) NOT NULL,
  achievement_name_es VARCHAR(255),
  achievement_name_en VARCHAR(255),
  tokens_reward INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

-- ============================================================================
-- 7. TABLA: user_profiles (extensión)
-- Extensión de perfiles de usuario con datos de juegos
-- ============================================================================
-- Si no existe, crear tabla
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(255),
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  total_playtime INTEGER DEFAULT 0, -- en segundos
  games_completed INTEGER DEFAULT 0,
  achievements_unlocked INTEGER DEFAULT 0,
  preferred_language VARCHAR(10) DEFAULT 'es',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_user_games_user_id ON user_games(user_id);
CREATE INDEX IF NOT EXISTS idx_user_games_game_id ON user_games(game_id);
CREATE INDEX IF NOT EXISTS idx_game_progress_user_id ON game_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_game_progress_game_id ON game_progress(game_id);
CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON token_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_token_transactions_tipo ON token_transactions(tipo);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- ============================================================================
-- INSERTAR JUEGOS DISPONIBLES
-- ============================================================================
INSERT INTO games (game_id, name_es, name_en, description_es, description_en, icon, category, difficulty, price_tokens, reward_tokens, reward_xp, enabled)
VALUES
  ('juicio-legal', 'Juicio Legal', 'Law Trial', 'Resuelve casos legales complejos aplicando principios de justicia', 'Resolve complex legal cases applying justice principles', '⚖️', 'legal', 'medium', 50, 50, 100, true),
  ('defensor-espacio', 'Defensor del Espacio', 'Space Defender', 'Arcade de acción con niveles progresivos y desafíos crecientes', 'Action arcade with progressive levels and growing challenges', '🚀', 'arcade', 'medium', 40, 40, 80, true),
  ('tetris-legal', 'Tetris Legal', 'Legal Tetris', 'Puzzle con términos legales y mecánicas clásicas', 'Puzzle with legal terms and classic mechanics', '🧩', 'puzzle', 'easy', 35, 35, 70, true),
  ('quien-quiere-ser-abogado', '¿Quién Quiere Ser Abogado?', 'Who Wants to Be a Lawyer?', 'Trivia legal con preguntas de dificultad creciente', 'Legal trivia with increasing difficulty questions', '🎓', 'legal', 'medium', 45, 45, 90, true),
  ('constructor-contratos', 'Constructor de Contratos', 'Contract Builder', 'Construye contratos legales válidos siguiendo reglas profesionales', 'Build valid legal contracts following professional rules', '📋', 'strategy', 'hard', 60, 60, 120, true),
  ('memoria-legal', 'Memoria Legal', 'Legal Memory', 'Juego de memoria con términos y conceptos legales', 'Memory game with legal terms and concepts', '🧠', 'puzzle', 'easy', 30, 30, 60, true),
  ('ajedrez-legal', 'Ajedrez Legal', 'Legal Chess', 'Ajedrez estratégico con contexto legal profesional', 'Strategic chess with professional legal context', '♟️', 'strategy', 'hard', 65, 65, 130, true),
  ('damas-legales', 'Damas Legales', 'Legal Checkers', 'Damas clásicas con mecánicas legales', 'Classic checkers with legal mechanics', '⚫', 'strategy', 'medium', 50, 50, 100, true);

-- ============================================================================
-- LOGROS DISPONIBLES
-- ============================================================================
INSERT INTO user_achievements (user_id, achievement_id, achievement_name_es, achievement_name_en, tokens_reward)
VALUES
  (NULL, 'first-victory', 'Primera Victoria', 'First Victory', 10),
  (NULL, 'law-master', 'Maestro Legal', 'Law Master', 50),
  (NULL, 'arcade-champion', 'Campeón Arcade', 'Arcade Champion', 50),
  (NULL, 'perfect-score', 'Puntuación Perfecta', 'Perfect Score', 100),
  (NULL, 'speedrunner', 'Corredor Rápido', 'Speedrunner', 75),
  (NULL, 'all-games-master', 'Maestro de Todos', 'Master of All', 200);

-- ============================================================================
-- TRIGGERS PARA ACTUALIZACIÓN AUTOMÁTICA
-- ============================================================================

-- Trigger para actualizar updated_at en games
CREATE OR REPLACE FUNCTION update_games_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER games_updated_at_trigger
BEFORE UPDATE ON games
FOR EACH ROW
EXECUTE FUNCTION update_games_updated_at();

-- Trigger para actualizar updated_at en game_progress
CREATE OR REPLACE FUNCTION update_game_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER game_progress_updated_at_trigger
BEFORE UPDATE ON game_progress
FOR EACH ROW
EXECUTE FUNCTION update_game_progress_updated_at();

-- Trigger para actualizar updated_at en user_tokens
CREATE OR REPLACE FUNCTION update_user_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_tokens_updated_at_trigger
BEFORE UPDATE ON user_tokens
FOR EACH ROW
EXECUTE FUNCTION update_user_tokens_updated_at();

-- ============================================================================
-- POLÍTICAS RLS (Row Level Security)
-- ============================================================================

-- Habilitar RLS en tablas
ALTER TABLE user_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para user_games
CREATE POLICY "Users can view their own games" ON user_games
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own games" ON user_games
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para game_progress
CREATE POLICY "Users can view their own progress" ON game_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON game_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON game_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para user_tokens
CREATE POLICY "Users can view their own tokens" ON user_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens" ON user_tokens
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para token_transactions
CREATE POLICY "Users can view their own transactions" ON token_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" ON token_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para user_achievements
CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- FIN DE CONFIGURACIÓN DE BASE DE DATOS
-- ============================================================================
