import { MongoClient } from 'mongodb';

async function connectToDatabase() {
  return await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
}

async function insertDocument(client, document) {
  const db = client.db()
  return await db.collection('emails').insertOne(document)
}

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    let client;

    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return
    }

    try {
      await insertDocument(client, { email: userEmail })
      client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
      return
    }

    res.status(201).json({ message: 'Signed up!' })
  } else {
    // Handle any other HTTP method

  }
}
