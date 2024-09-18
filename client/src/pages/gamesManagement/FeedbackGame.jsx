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
        
        // Clear the fields
        setScore(0);
        setFeedback('');

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
        <center>
          <h3 style={formTitleStyle}>
            Share your expectations before the game and let us know how we did after.<br />
            Your feedback helps us level up!
          </h3>
        </center>
        <div style={flexContainerStyle}>
          {/* Rating section */}
          <div style={ratingContainerStyle}>
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
          </div>
          {/* Feedback section */}
          <div style={feedbackContainerStyle}>
            <label>
              <strong>Feedback:</strong>
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={inputStyle}
              />
            </label>
          </div>
        </div>
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
  backgroundColor: '#1d284c',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  width: '1000px',
  marginTop: '80px',
};

const formTitleStyle = {
  fontSize: '20px',
  color: 'white',
  marginTop: '5px',
  fontFamily: 'Roboto',
  lineHeight: '1.5'
};

const flexContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

const ratingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '0 0 30%',
  paddingRight: '10px',
  color: 'white',
  marginTop: '20px',
  marginLeft: '20px',
};

const starContainerStyle = {
  display: 'flex',
  cursor: 'pointer',
  marginTop: '20px',
};

const starStyle = {
  fontSize: '50px',
  margin: '0 2px',
};

const feedbackContainerStyle = {
  color: 'white',
  flex: '0 0 65%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '20px',
};

const inputStyle = {
  height: '40px',
  width: '95%',
  marginBottom: '10px',
  borderRadius: '5px',
  marginTop: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#ffcc00',
  color: '#000',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width:'160px',
  marginLeft: '420px',
};

export default FeedbackGame;
