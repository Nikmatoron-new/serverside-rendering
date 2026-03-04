# Server-Side Rendering Setup Instructions

This project demonstrates how to build a Node.js server using Express and PostgreSQL. Follow these steps to replicate the structure and create your own features.

## Initial Setup

### 1. Install Dependencies
Make sure you have Node.js installed, then install required packages:
```bash
npm install express pg nodemon
```

### 2. Setup package.json Scripts
Add scripts to run your server:
```json
{
    "scripts": {
        "serve": "node index.js",
        "dev": "nodemon index.js"
    },
    "dependencies": {
        "express": "^4.x.x",
        "pg": "^8.x.x",
        "nodemon": "^3.x.x"
    }
}
```

---

## Database Setup

### 1. Create SQL Files
Create two SQL files in your project root:

**test.sql** - Contains your table structure and initial data:
```sql
CREATE TABLE table_name (
    id SERIAL PRIMARY KEY,
    column_name VARCHAR(100)
);

INSERT INTO table_name (column_name) VALUES
    ('Value 1'),
    ('Value 2'),
    ('Value 3');
```

**test copy.sql** - Keep a backup copy or alternate schema here.

### 2. Run SQL Against PostgreSQL
Connect to your PostgreSQL database and execute the `.sql` file:
```bash
psql -U postgres -h localhost -d your_database -f test.sql
```

---

## Express Server Setup

### 1. Basic Server Structure (index.js)

Start with the Express foundation:
```javascript
const express = require('express');
const app = express();

// Routes go here (see below)

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

### 2. Create Simple Routes

For pages without database queries, use inline HTML:
```javascript
app.get('/route-name', (req, res) => {
    res.send(`
        <h1>Page Title</h1>
        <p>Your content here</p>
        <button onclick="window.history.back()">Back</button>
    `);
});
```

### 3. Create Routes with Database Connection

First, set up the PostgreSQL connection at the top of index.js:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'localhost',
    port: 5432,
    database: 'your_database_name'
});
```

Then create async routes that query the database:
```javascript
app.get('/data-route', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM table_name');
        
        // Convert database results to HTML
        let html = '<h1>Data from Database</h1><ul>';
        result.rows.forEach(row => {
            html += `<li>${row.column_name}</li>`;
        });
        html += '</ul>';
        
        res.send(html);
    } catch (error) {
        res.send(`<p>Error: ${error.message}</p>`);
    }
});
```

### 4. Return JSON from Routes

For API endpoints, return JSON instead of HTML:
```javascript
app.get('/api/data-route', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM table_name');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## Running Your Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm run serve
```

Then visit:
- `http://localhost:3000/` - Main page
- `http://localhost:3000/route-name` - Your custom routes
- `http://localhost:3000/api/data-route` - Your API endpoints

---

## General Pattern

1. **Create SQL files** → Define tables and seed data
2. **Setup Express app** → Create server and connect to database
3. **Build routes** → Create endpoints that return HTML or JSON
4. **Run server** → Use npm scripts to start
5. **Test in browser** → Visit localhost:3000 routes

Each route follows this pattern:
- `app.get('/path', handler)` - Define the route
- `async` for database queries
- `res.send()` for HTML responses
- `res.json()` for JSON responses
- `try/catch` for error handling

---

## File Structure

```
project/
├── index.js           (main server file)
├── package.json       (dependencies)
├── test.sql           (database schema & data)
├── test copy.sql      (backup schema)
└── public/            (static HTML files)
```

---

## References

- **Express Guide**: https://expressjs.com/
- **PostgreSQL Node.js**: https://node-postgres.com/
- **Nodemon Docs**: https://nodemon.io/
