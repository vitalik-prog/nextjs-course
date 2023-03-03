import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    const db = client.db()
    const result = await db.collection('comments').insertOne(newComment);
    newComment._id = result.insertedId;

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  } 
  
  if (req.method === 'GET') {
    const db = client.db()
    const data = await db.collection('comments').find().sort({ _id: -1 }).toArray();

    res.status(200).json({ comments: data });
    client.close();
  }
}
