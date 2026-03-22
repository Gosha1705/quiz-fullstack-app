-- Таблица консультантов
CREATE TABLE advisors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specializations TEXT[] NOT NULL,
    min_asset_threshold INTEGER NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица ответов на квиз
CREATE TABLE quiz_responses (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    answers JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица совпадений (матчей)
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    quiz_response_id INTEGER REFERENCES quiz_responses(id),
    advisor_id INTEGER REFERENCES advisors(id),
    score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индекс, который просят в задании!
CREATE INDEX idx_matches_quiz_response_id ON matches(quiz_response_id);

-- Таблица сообщений
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для аналитики (трекинга событий)
CREATE TABLE tracking_events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    properties JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);