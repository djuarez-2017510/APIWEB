--Crea la tabla incidentes

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    reporter VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);