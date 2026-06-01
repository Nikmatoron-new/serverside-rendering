-- Slett eksisterende tabeller hvis de finnes
DROP TABLE IF EXISTS skuespiller_i_film;
DROP TABLE IF EXISTS skuespillere;
DROP TABLE IF EXISTS filmer;
DROP TABLE IF EXISTS bilmerker;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE bilmerker (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);



INSERT INTO users (name) VALUES
    ('Joe Biden'),
    ('Donald Trump'),
    ('Bob Joenson'),
    ('John Doe'),
    ('Jane Smith'),
    ('Alice Johnson'),
    ('Charlie Brown'),
    ('David Wilson'),
    ('Emily Davis'),
    ('Frank Miller');

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


-- Opprett tabell for skuespillere (hvis den ikke finnes)
CREATE TABLE skuespillere (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- Opprett tabell for filmer (hvis den ikke finnes)
CREATE TABLE filmer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- Opprett junction-tabell som kopplar skuespillere til filmer
CREATE TABLE skuespiller_i_film (
    id SERIAL PRIMARY KEY,
    skuespiller_id INT NOT NULL REFERENCES skuespillere(id),
    film_id INT NOT NULL REFERENCES filmer(id)
);

-- Legg inn testdata
INSERT INTO skuespillere (name) VALUES
    ('Tom Cruise'),
    ('Jennifer Aniston'),
    ('Brad Pitt'),
    ('Angelina Jolie');

INSERT INTO filmer (name) VALUES
    ('Top Gun'),
    ('Mission Impossible'),
    ('Friends'),
    ('Mr. & Mrs. Smith'),
    ('Maleficent');

INSERT INTO skuespiller_i_film (skuespiller_id, film_id) VALUES
    (1, 1),  -- Tom Cruise i Top Gun
    (1, 2),  -- Tom Cruise i Mission Impossible
    (2, 3),  -- Jennifer Aniston i Friends
    (3, 4),  -- Brad Pitt i Mr. & Mrs. Smith
    (4, 4),  -- Angelina Jolie i Mr. & Mrs. Smith
    (4, 5);  -- Angelina Jolie i Maleficent