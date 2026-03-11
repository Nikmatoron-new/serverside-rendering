
-- Slett eksisterende tabell hvis den finnes
DROP TABLE IF EXISTS bilmerker;

CREATE TABLE bilmerker (
    id SERIAL PRIMARY KEY,
    NAME VARCHAR(100)
);


INSERT INTO bilmerker (name) VALUES
    ('Toyota Camry'),
    ('Honda Civic'),
    ('Ford F-150'),
    ('Chevrolet Silverado'),
    ('BMW X5'),
    ('Mercedes-Benz C-Class'),
    ('Audi A4'),
    ('Nissan Altima'),
    ('Hyundai Elantra'),
    ('Kia Optima');