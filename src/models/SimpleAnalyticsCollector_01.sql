CREATE SCHEMA SimpleAnalyticsCollector_01;

-- USERS TABLE
CREATE TABLE SimpleAnalyticsCollector_01.users (
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT now()
);

-- SITES TABLE 
CREATE TABLE SimpleAnalyticsCollector_01.sites (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES SimpleAnalyticsCollector_01.users(id) ON DELETE CASCADE,
	name TEXT NOT NULL,
	site_key TEXT UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT now()
);

-- Events TABLE
CREATE TABLE SimpleAnalyticsCollector_01.events (
	id BIGSERIAL PRIMARY KEY,
	site_id INT REFERENCES SimpleAnalyticsCollector_01.sites(id) ON DELETE CASCADE,
	url TEXT NOT NULL,
	referrer TEXT,
	user_agent TEXT,
	ip_address TEXT,
	created_at TIMESTAMP DEFAULT now()
)