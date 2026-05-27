// Først bruker vi 'require' for å referere til Express-biblioteket
//  (som ligger i node_modules):
const express = require('express');

// Deretter lager vi en ny instans av Express:
const app = express();

// Vi setter opp en enkel "rute" (route) som svarer på
// forespørsler til rotkatalogen, /:
app.get('/', (req, res) => {
    res.send(`
        <p>Hello, world! Klokken er ${new Date().toLocaleTimeString()}</p>
        <h1>elever</h1>
        <p>her er en liste over elever</p>
        <ul>
            <li><a href='/elev-1'>elev 1</a></li>
            <li><a href='/elev-2'>elev 2</a></li>
            <li><a href='/elev-3'>elev 3</a></li>
            <li><a href='/elev-4'>elev 4</a></li>
        </ul>
        <p><a href='/deltagere-2'>deltagere-2</a></p>
        <p><a href='/deltagere-json'>deltagere-json</a></p>
        <p><a href='/bilmerker'>bilmerker</a></p>
        <p><a href='/bilmerker-json'>bilmerker-json</a></p>
        <p><a href='/bilmerker.html'>bilmerker-jsonHTML</a></p>
        <p><a href='/skuespillere'>skuespillere</a></p>
        <p><a href='/skuespillere-json'>skuespillere-json</a></p>
        <p><a href='/filmer'>filmer</a></p>
        <p><a href='/filmer-json'>filmer-json</a></p>
        <p><a href='/skuespillere-og-filmer'>skuespillere og filmer</a></p>
        <p><a href='/skuespillere-og-filmer-json'>skuespillere og filmer json</a></p>
    `);
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/her', (req, res) => {
    res.send(`
        <h1>Her er en overskrift</h1>
        <p>Og her er en paragraf</p>

    `);
});


app.get('/elev-1', (req, res) => {
    res.send(`
        <h1>Her er en elev 1</h1>
        <p>de er elev 1</p>
        <button onclick="window.history.back()">tilbake</button>
        

    `);
});

app.get('/elev-2', (req, res) => {
    res.send(`
        <h1>Her er en elev 2</h1>
        <p>de er elev 2</p>
        <button onclick="window.history.back()">tilbake</button>
        

    `);
});


app.get('/elev-3', (req, res) => {
    res.send(`
        <h1>Her er en elev 3</h1>
        <p>de er elev 3</p>
        <button onclick="window.history.back()">tilbake</button>
        

    `);
});


app.get('/elev-4', (req, res) => {
    res.send(`
        <h1>Her er en elev 4</h1>
        <p>de er elev 4</p>
        <button onclick="window.history.back()">tilbake</button>
        

    `);
});


// Først refererer vi til driveren (som ligger i node_modules)
const { Pool } = require('pg');

// Så lager vi en forbindelse til databasen
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'mysecretpassword',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5433,
  database: process.env.PGDATABASE || 'mydatabase',
});

pool.connect()
  .then(client => {
      client.release();
      console.log('PostgreSQL connected');
  })
  .catch(error => {
      console.error('PostgreSQL connection error:', error);
      console.error(error.stack || error);
      process.exit(1);
  });


app.get('/deltagere-2', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');

    let html = '<h1>Deltagere</h1>';
    html += '<ul>';

    for (const row of result.rows) {
      html += '<li>' + row.name + '</li>';
    }

    html += '</ul>';
    res.send(html);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).send(`<p>Database query failed: ${error.message}</p>`);
  }
});


app.get('/bilmerker', async (req, res) => {
    // Henter data fra databasen:
    const result = await pool.query('SELECT * FROM bilmerker');

    // Starter en html-liste:
    let html = "<h1>Bilmerker</h1>"
    html += "<ul>"

    // Legger til en <li> for hver rad i databasen:
    for (const row of result.rows) {
        html += "<li>" + row.name + "</li>"
    }

    // Avslutter html-listen og returnerer resultatet:
    html += "</ul>"
    res.send(html);
});

app.get('/bilmerker-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');
    res.json(result.rows);
});


app.get('/skuespillere', async (req, res) => {
    // Henter data fra databasen:
    const result = await pool.query('SELECT * FROM skuespillere');

    // Starter en html-liste:
    let html = "<h1>Skuespillere</h1>"
    html += "<ul>"

    // Legger til en <li> for hver rad i databasen:
    for( const row of result.rows ) {
        html += "</li><li>" + row.name + "</li>"
    }

    // Avslutter html-listen og returnerer resultatet:
    html += "</ul>"
    res.send(html);
});

app.get('/skuespillere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM skuespillere');
    res.json(result.rows);
});



app.get('/filmer', async (req, res) => {
    // Henter data fra databasen:
    const result = await pool.query('SELECT * FROM filmer');

    // Starter en html-liste:
    let html = "<h1>Filmer</h1>"
    html += "<ul>"

    // Legger til en <li> for hver rad i databasen:
    for( const row of result.rows ) {
        html += "</li><li>" + row.name + "</li>"
    }

    // Avslutter html-listen og returnerer resultatet:
    html += "</ul>"
    res.send(html);
});

app.get('/filmer-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM filmer');
    res.json(result.rows);
});


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


app.get('/deltagere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});


app.use(express.static('public'));



// Så starter vi serveren, som nå lytter på port 3000:
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});