import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
 import { useAuth } from '../foodManagement/context/authContext';

const FeedbackGame = ({ onFeedbackSubmit }) => {
  const { id } = useParams(); // Get the game ID from the URL
  const [score, setScore] = useState(1); // Default score
  const [feedback, setFeedback] = useState('');
  const { user } = useAuth() // Assuming user is available in context

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare feedback data
    const feedbackData = {
      customerId: user.user._id, // User ID from context
      score,
      feedback,
    };

    // Send feedback data to the backend
    axios
      .post(`http://localhost:3000/api/games/games/${id}/feedback`, feedbackData)
      .then((response) => {
        // Notify parent component of successful submission
        onFeedbackSubmit();
      })
      .catch((error) => {
        console.error('There was an error submitting the feedback!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={formTitleStyle}>Submit Feedback</h3>
      <label>
        <strong>Rating:</strong>
        <select
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          style={inputStyle}
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
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

const inputStyle = {
  padding: '10px',
  marginTop: '5px',
  marginBottom: '10px',
  width: '100%',
  borderRadius: '5px',
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
