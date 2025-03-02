const express = require('express');
const cors = require('cors');
const PORT = 5000;

// Creating Express App
const app = express();

// Using MiddleWares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hola! Express server is running.');
});

app.listen(PORT);