# Oppgave 5 - Skuespillere og Filmer Setup

Denne guiden viser hvordan du setter opp en relation mellom skuespillere og filmer ved hjelp av en junction-tabell.

---

## Steg 1: Opprett SQL-tabeller

Legg til dette i en SQL-fil (f.eks. `task5.sql` eller `test.sql`):

```sql
-- Opprett tabell for skuespillere (hvis den ikke finnes)
CREATE TABLE IF NOT EXISTS skuespillere (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- Opprett tabell for filmer (hvis den ikke finnes)
CREATE TABLE IF NOT EXISTS filmer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- Opprett junction-tabell som kopplar skuespillere til filmer
CREATE TABLE IF NOT EXISTS skuespiller_i_film (
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
```

Kjør denne SQL-filen mot databasen:
```bash
psql -U postgres -h localhost -d your_database -f task5.sql
```

---

## Steg 2: Opprett SQL-spørring med JOIN

Denne spørringen kombinerer data fra alle tre tabellene:

```sql
SELECT 
    s.name AS skuespiller,
    f.name AS film
FROM skuespiller_i_film sif
JOIN skuespillere s ON sif.skuespiller_id = s.id
JOIN filmer f ON sif.film_id = f.id
ORDER BY s.name, f.name;
```

---

## Steg 3: Legg til ruter i index.js

Legg til disse to rutene. Erstatt de eksisterende rutene eller legg dem til på nytt:

```javascript
app.get('/skuespillere-og-filmer', async (req, res) => {
    // Henter data fra databasen med JOIN:
    const result = await pool.query(`
        SELECT 
            s.name AS skuespiller,
            f.name AS film
        FROM skuespiller_i_film sif
        JOIN skuespillere s ON sif.skuespiller_id = s.id
        JOIN filmer f ON sif.film_id = f.id
        ORDER BY s.name, f.name
    `);

    // Starter en html-liste:
    let html = "<h1>Skuespillere og Filmer</h1>"
    html += "<ul>"

    // Legger til en <li> for hver rad i databasen:
    for( const row of result.rows ) {
        html += "<li>" + row.skuespiller + " - " + row.film + "</li>"
    }

    // Avslutter html-listen og returnerer resultatet:
    html += "</ul>"
    res.send(html);
});

app.get('/skuespillere-og-filmer-json', async (req, res) => {
    const result = await pool.query(`
        SELECT 
            s.name AS skuespiller,
            f.name AS film
        FROM skuespiller_i_film sif
        JOIN skuespillere s ON sif.skuespiller_id = s.id
        JOIN filmer f ON sif.film_id = f.id
        ORDER BY s.name, f.name
    `);
    res.json(result.rows);
});
```

---

## Steg 4: Opprett HTML-fil i public-katalogen

Lag en ny fil `public/skuespillere-og-filmer.html`:

```html
<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skuespillere og Filmer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            padding: 10px;
            margin: 5px 0;
            background-color: #f0f0f0;
            border-left: 4px solid #007bff;
        }
        .error {
            color: red;
            padding: 10px;
            background-color: #ffe6e6;
            border-radius: 4px;
        }
        button {
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>Skuespillere og Filmer</h1>
    <button onclick="window.history.back()">Tilbake</button>
    
    <ul id="filmList"></ul>
    <div id="error"></div>

    <script>
        // Henter data fra API-ruten
        fetch('/skuespillere-og-filmer-json')
            .then(response => response.json())
            .then(data => {
                const filmList = document.getElementById('filmList');
                
                if (data.length === 0) {
                    filmList.innerHTML = '<li>Ingen data funnet</li>';
                    return;
                }
                
                // Lager HTML <li> for hver rad
                data.forEach(row => {
                    const li = document.createElement('li');
                    li.textContent = row.skuespiller + ' - ' + row.film;
                    filmList.appendChild(li);
                });
            })
            .catch(error => {
                document.getElementById('error').textContent = 'Feil: ' + error.message;
            });
    </script>
</body>
</html>
```

---

## Steg 5: Sjekk at alt fungerer

1. Kjør SQL-filen for å opprette tabeller og data
2. Sjekk at `skuespillere`, `filmer`, og `skuespiller_i_film` tabellene finnes i databasen
3. Start serveren: `npm run dev`
4. Test rutene:
   - `http://localhost:3000/skuespillere-og-filmer` → HTML liste
   - `http://localhost:3000/skuespillere-og-filmer-json` → JSON data
   - `http://localhost:3000/skuespillere-og-filmer.html` → HTML-side med dynamisk innlasting

---

## Viktige konsepter

### Junction-tabell
En tabell som kopplar to andre tabeller. I vårt tilfelle:
- `skuespillere` (id, name)
- `filmer` (id, name)
- `skuespiller_i_film` (id, skuespiller_id, film_id) ← junction-tabell

### Foreign Key
`REFERENCES skuespillere(id)` - sikrer at du kan bare legge inn ID-er som finnes i skuespillere-tabellen.

### JOIN
`JOIN` kombinerer rader fra flere tabeller basert på en betingelse:
```sql
JOIN skuespillere s ON sif.skuespiller_id = s.id
```

### ORDER BY
Sorterer resultatet: `ORDER BY s.name, f.name` sorterer først etter skuespiller-navn, så etter filmtittel.

---

## Feilsøking

**Feil: "relation 'skuespiller_i_film' does not exist"**
→ Kjør SQL-filen igjen

**Feil: "foreign key violation"**
→ Sjekk at skuespiller_id og film_id finnes i sine respektive tabeller

**Ingen data vises i HTML-siden**
→ Sjekk at du har lagt inn data i `skuespiller_i_film`-tabellen

