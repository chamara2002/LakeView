import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../foodManagement/context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackGame = ({ onFeedbackSubmit }) => {
  const { id } = useParams(); // Get the game ID from the URL
  const [score, setScore] = useState(0); // Default score as 0 to indicate no rating
  const [feedback, setFeedback] = useState('');
  const { user } = useAuth(); // Assuming user is available in context
  const [hoveredStar, setHoveredStar] = useState(0); // Track hovered star
  const [submissionFailed, setSubmissionFailed] = useState(false); // Track submission status

  const handleSubmit = (event) => {
    event.preventDefault();

    if (feedback.trim() === '') {
      // If feedback is empty, notify the user
      toast.error('Feedback cannot be empty.');
      return;
    }

    // Prepare feedback data
    const feedbackData = {
      customerId: user.user._id, // User ID from context
      score: score > 0 ? score : undefined, // Include score only if it's greater than 0
      feedback,
    };

    // Send feedback data to the backend
    axios
      .post(`http://localhost:3000/api/games/games/${id}/feedback`, feedbackData)
      .then((response) => {
        // Notify parent component of successful submission
        onFeedbackSubmit();
        setSubmissionFailed(false);
        // Show success notification
        toast.success('Feedback submitted successfully!');
      })
      .catch((error) => {
        console.error('There was an error submitting the feedback!', error);
        setSubmissionFailed(true);
        // Show error notification
        toast.error('Failed to submit feedback. Please try again.');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={formTitleStyle}>Submit Feedback</h3>
        <label>
          <strong>Rating:</strong>
          <div style={starContainerStyle}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setScore(star)}
                style={{
                  ...starStyle,
                  color: star <= (hoveredStar || score) ? '#ffcc00' : '#ccc',
                }}
              >
                ★
              </span>
            ))}
          </div>
        </label>
        <br />
        <label>
          <strong>Feedback:</strong>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            cols="50"
            style={textareaStyle}
          />
        </label>
        <br />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
};

// Inline CSS Styles for the Feedback Form
const formStyle = {
  backgroundColor: '#222',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  width: '100%',
  marginTop: '20px',
};

const formTitleStyle = {
  fontSize: '20px',
  color: '#ffcc00',
  marginBottom: '10px',
};

const starContainerStyle = {
  display: 'flex',
  cursor: 'pointer',
};

const starStyle = {
  fontSize: '24px',
  margin: '0 2px',
};

const textareaStyle = {
  padding: '8px',
  width: '100%',
  marginBottom: '10px',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#ffcc00',
  color: '#000',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default FeedbackGame;
