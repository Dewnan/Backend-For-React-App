const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

const uri = 'mongodb+srv://dewnan:Dewnan2003@my-db.fkl0p.mongodb.net/?retryWrites=true&w=majority&appName=my-db';
const client = new MongoClient(uri);

let db;
let ItemCollection;
let CustomerCollection;

app.use(cors());
app.use(express.json());

async function connect_to_db() {
    try {
        await client.connect();
        console.log('Connected to Data Base.');
        db = client.db('inventory_db');
        ItemCollection = db.collection('products');
    } catch (err) {
        console.error('Failed to connect to database:', err);
    }
}
connect_to_db().catch(console.error);

app.get('/api/items', async (req, res) => {
    try {
        const items = await collection.find({}).toArray();
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const newItem = req.body;
        const result = await collection.insertOne(newItem);
        res.status(201).json({ message: 'Item added successfully', id: result.insertedId });
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ error: 'Failed to add item' });
    }
});

app.delete('/api/items/:item_id', async (req, res) => {
    try {
        const delID = req.params.item_id;
        await collection.deleteOne({ item_id: delID });

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

app.get('/api/customers', async (req, res) => {
    try {
        const customers = await collection.find({}).toArray();
        res.json(customers);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        const newCustomer = req.body;
        const result = await collection.insertOne(newCustomer);
        res.status(201).json({ message: 'Customer added successfully', id: result.insertedId });
    } catch (err) {
        console.error('Error adding customer:', err);
        res.status(500).json({ error: 'Failed to add customer' });
    }
});

app.delete('/api/customers/:customer_id', async (req, res) => {
    try {
        const CuslID = req.params.customer_id;
        await collection.deleteOne({ customer_id: CuslID });

        res.status(200).json({ message: 'Customers deleted successfully' });
    } catch (err) {
        console.error('Error deleting customer:', err);
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
