const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

const uri = 'mongodb+srv://username:passwrod@my-db.fkl0p.mongodb.net/?retryWrites=true&w=majority&appName=my-db';
const client = new MongoClient(uri);
const db = client.db('inventory_db');
const collection = db.collection('products');

app.use(cors());

app.get('/api/items', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('inventory_db');
        const collection = db.collection('products');
        const items = await collection.find({}).toArray();
        res.json(items);
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
