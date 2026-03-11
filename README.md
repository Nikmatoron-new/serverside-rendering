# Server-Side Rendering Project

A Node.js web application demonstrating **server-side rendering** with Express.js and PostgreSQL. This project shows how to build dynamic web pages that generate HTML content from database data, along with JSON APIs.

## 🚀 What This Project Is

This is a **server-side rendered web application** that combines:
- **Express.js** web server for handling HTTP requests
- **PostgreSQL** database for data storage
- **Dynamic HTML generation** from database queries
- **JSON APIs** for frontend consumption
- **Static file serving** for additional web pages

The application demonstrates modern web development patterns where the server generates complete HTML pages instead of relying on client-side JavaScript frameworks.

## 📁 Project Structure

```
serverside-rendering/
├── index.js              # Main Express server
├── package.json          # Dependencies and scripts
├── README.md            # This documentation
├── Instructions.md      # Step-by-step setup guide
├── OPPGAVE5.md          # Task 5 implementation guide
├── test.sql             # Main database schema & data
├── test copy.sql        # Alternative database schema
└── public/              # Static HTML files
    ├── bilmerker.html
    ├── deltagere.html
    └── hei.html
```

## 🗄️ Database Schema

The project uses PostgreSQL with several tables:

### Core Tables
- **`users`** - Basic user information (id, name)
- **`bilmerker`** - Car brands (id, name)
- **`skuespillere`** - Actors (id, name)
- **`filmer`** - Movies (id, name)

### Relationship Table
- **`skuespiller_i_film`** - Junction table linking actors to movies (many-to-many relationship)

### Sample Data
- Users: Joe Biden, Donald Trump, etc.
- Car brands: Toyota Camry, Honda Civic, etc.
- Actors: Tom Cruise, Jennifer Aniston, etc.
- Movies: Top Gun, Mission Impossible, etc.

## 🌐 Available Routes

### Static Routes (No Database)
- **`/`** - Homepage with navigation links
- **`/api`** - Simple JSON API endpoint
- **`/her`** - Basic HTML page
- **`/elev-1`** through **`/elev-4`** - Individual student pages

### Database-Driven Routes (HTML Output)
- **`/deltagere-2`** - List all users from database
- **`/bilmerker`** - List all car brands
- **`/skuespillere`** - List all actors
- **`/filmer`** - List all movies
- **`/skuespillere-og-filmer`** - Actors and their movies (JOIN query)

### JSON API Routes
- **`/deltagere-json`** - Users as JSON
- **`/bilmerker-json`** - Car brands as JSON
- **`/skuespillere-json`** - Actors as JSON
- **`/filmer-json`** - Movies as JSON
- **`/skuespillere-og-filmer-json`** - Actor-movie relationships as JSON

### Static Files
- **`/bilmerker.html`** - Static HTML page for car brands
- **`/deltagere.html`** - Static HTML page for participants
- **`/hei.html`** - Static greeting page

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **PostgreSQL** database server
- **npm** package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
Create a PostgreSQL database and run the SQL files:
```bash
# Create database (adjust connection details as needed)
createdb mydatabase

# Run main schema
psql -U postgres -h localhost -d mydatabase -f test.sql

# Optional: Run alternative schema
psql -U postgres -h localhost -d mydatabase -f test\ copy.sql
```

### 3. Configure Database Connection
Update the connection details in `index.js`:
```javascript
const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
  database: 'mydatabase'  // Add your database name
});
```

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run serve
```

Visit `http://localhost:3000` to see the application.

## 🔧 Development Workflow

1. **Database Changes**: Edit `test.sql` or `test copy.sql`
2. **Server Logic**: Modify routes in `index.js`
3. **Static Pages**: Add HTML files to `public/` directory
4. **Test**: Run `npm run dev` and visit routes in browser

## 📚 Key Concepts Demonstrated

### Server-Side Rendering
- HTML generated on the server from database data
- No client-side JavaScript required for basic functionality
- Fast initial page loads

### Database Integration
- PostgreSQL connection pooling with `pg` library
- Async/await for database queries
- Error handling for database operations

### RESTful Routes
- GET routes for retrieving data
- JSON APIs for frontend consumption
- Static file serving

### SQL Relationships
- Foreign keys for data integrity
- JOIN queries for related data
- Many-to-many relationships with junction tables

## 🎯 Learning Objectives

This project teaches:
- **Backend Development** with Node.js and Express
- **Database Design** and SQL queries
- **Server-Side Rendering** vs Client-Side Rendering
- **API Development** (JSON endpoints)
- **Full-Stack Architecture** basics

## 🔗 Similar Projects

- **Blog Platforms** (WordPress, Ghost) - Server-rendered content
- **E-commerce Sites** - Product listings from database
- **Content Management Systems** - Dynamic page generation
- **Dashboard Applications** - Data visualization from APIs
- **Social Media Feeds** - Timeline content from database

## 📖 Documentation

- **[Instructions.md](Instructions.md)** - Step-by-step setup guide
- **[OPPGAVE5.md](OPPGAVE5.md)** - Task 5 implementation details

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new routes and database tables
- Experiment with different SQL queries
- Create additional static HTML pages
- Add CSS styling to the generated HTML

## 📄 License

This project is for educational purposes.
