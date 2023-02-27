import { buildFeedbackPath, extractFeedback } from '.';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
  
    const selectedFeedback = data.find(item => item.id === feedbackId);
  
    res.status(200).json({ feedback: selectedFeedback });
  }
}
