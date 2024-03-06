const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// MongoDB Connection String
const uri = process.env.MONGODB_URI;

// Route: GET /contacts
router.get('/', async (req, res) => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const database = client.db('<your-database-name>');
    const contactsCollection = database.collection('contacts');

    const contacts = await contactsCollection.find().toArray();

    await client.close();

    res.json(contacts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route: GET /contacts/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const database = client.db('<your-database-name>');
    const contactsCollection = database.collection('contacts');

    const contact = await contactsCollection.findOne({ _id: ObjectId(id) });

    await client.close();

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;