import { useRef, useState } from 'react'

export default function login() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailRef = useRef('')
  const feedbackRef = useRef('')

  function submitHandler(event) {
    event.preventDefault()
    const enteredEmail = emailRef.current.value
    const enteredFeedback = feedbackRef.current.value
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        text: enteredFeedback
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => console.log(data))
  };

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then(response => response.json())
      .then(data => setFeedbackItems(data.feedback))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea type="text" id="feedback" required rows={5} ref={feedbackRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Fetch Feedbacks</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </>
  )
}
