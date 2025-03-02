const express = require('express');
const cors = require('cors');
const PORT = 5000;

// Creating Express App
const app = express();

// Using MiddleWares
app.use(express.json());
app.use(cors());

// Creating a To-Do
app.post('/todo', (req, res) => {
    const data = req.body;
    console.log(data);
})

app.listen(PORT);