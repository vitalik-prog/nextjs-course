import { connectToDatabase, getAllDocuments, insertDocument } from '../../../src/components/helpers/db';

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectToDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return
  }

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
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
    }
  } 
  
  if (req.method === 'GET') {
    let data;
    try {
      data = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: data });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' })
    }
  }

  client.close();
}
