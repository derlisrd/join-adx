import React from 'react'
import Chat from './Chat'
import FeedbackProvider from './FeedbackProvider'

const Feedback = () => {
  return (
    <FeedbackProvider>
      <Chat />
    </FeedbackProvider>
  )
}

export default Feedback
