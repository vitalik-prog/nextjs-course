import Link from 'next/link';
import React from 'react'
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = React.useState();
  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then(response => response.json())
      .then(data => setFeedbackData(data.feedback))
  }

  return (
    <>
      {feedbackData && (
        <div>
          <h1>{feedbackData.email}</h1>
          <p>{feedbackData.text}</p>
        </div>
      )}
      <ul>
        {props.feedbackItems.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
            <Link href={`/feedback/${item.id}`}>
              <a><b>See Feedback</b></a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {  
    props: {
      feedbackItems: data
    }
  }
}
