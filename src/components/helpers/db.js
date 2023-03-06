import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  return await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
}

export async function insertDocument(client, collection, document) {
  const db = client.db()
  return await db.collection(collection).insertOne(document)
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db()
  return await db.collection(collection).find().sort(sort).toArray();
}
