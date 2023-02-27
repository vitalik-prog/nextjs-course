import { buildFeedbackPath, extractFeedback } from '../api/feedback';

export default function FeedbackDetailPage(props) {
  return (
    <div>
      <h1>{props.feedbackData.email}</h1>
      <p>{props.feedbackData.text}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  const paths = data.map(item => ({ params: { id: item.id } }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.id;

  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  const selectedFeedback = data.find(item => item.id === id);

  return {
    props: {
      feedbackData: selectedFeedback
    }
  }
}
