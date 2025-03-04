const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const PORT = 5000;
dotenv.config();

// Creating Express App
const app = express();

// Using MiddleWares
app.use(express.json());
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const database = client.db('toDoCRUD');
        const toDoCollection = database.collection('toDo');

        // Getting all To-Do
        app.get('/', async (req, res) => {
            const todo = await toDoCollection.find().toArray();
            res.send(todo);
        })

        // Creating a To-Do
        app.post('/todo', async (req, res) => {
            const data = req.body;
            const result = await toDoCollection.insertOne(data);
            res.send(result);
        });

        // Updating To-Do
        app.put('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateToDo = {
                $set: {
                    name: data.name,
                    description: data.description
                }
            }
            const result = await toDoCollection.updateOne(filter, updateToDo);
            res.send(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(PORT);