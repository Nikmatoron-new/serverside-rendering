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
    `);
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


// Så starter vi serveren, som nå lytter på port 3000:
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});