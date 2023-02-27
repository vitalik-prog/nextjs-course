import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => path.join(process.cwd(), 'data', 'feedback.json');

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler (req, res) {
  if (req.method === 'POST') {
    const { email, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !text ||
      text.trim().length === 0
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    // Store it in a database
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text
    };

    console.log(newFeedback);
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  }
  else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
