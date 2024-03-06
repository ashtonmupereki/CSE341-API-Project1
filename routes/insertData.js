const { MongoClient } = require('mongodb');
require('dotenv').config();

async function insertDocuments() {
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('<CSE-Project-1>');
    const contactsCollection = database.collection('contacts');

    // Insert documents
    const documents = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        favoriteColor: 'blue',
        birthday: '1990-01-01',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        favoriteColor: 'green',
        birthday: '1995-05-05',
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        favoriteColor: 'red',
        birthday: '1985-10-10',
      },
    ];

    const result = await contactsCollection.insertMany(documents);
    console.log(`${result.insertedCount} documents inserted`);

    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

insertDocuments();