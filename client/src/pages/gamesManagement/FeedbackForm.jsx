import React, { useState } from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Updated styles for a more user-friendly UI
  const formContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    gap: "10px",
  };

  const formStyle = {
    backgroundColor: "#f8f9fa", // Light background for better readability
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    width: "100%",
    maxWidth: "400px", // Make form responsive
  };

  const inputStyle = {
    width: "80%",
    padding: "12px 15px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #dee2e6", // Softer border color
    fontSize: "14px",
    outline: "none",
  };

  const labelStyle = {
    color: "#333",
    fontWeight: "500",
    marginBottom: "5px",
    display: "block",
  };

  const buttonStyle = {
    backgroundColor: "#007bff", // Use a primary color for the button
    color: "#ffffff",
    border: "none",
    padding: "12px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    width: "100%",
    transition: "background-color 0.3s ease", // Smooth transition on hover
  };

  const starStyle = (index) => ({
    cursor: "pointer",
    color: (hoverRating || rating) >= index ? "#ffc107" : "#e4e5e9", // Bright color for selected stars
    fontSize: "28px", // Larger stars
    transition: "color 0.2s ease", // Smooth transition on hover
  });

  return (
   <div>
    <NavBar></NavBar>
    <div style={{backgroundColor:"#161E38", height:"100vh"}}>
     <div style={formContainerStyle}>
      {/* Feedback Form */}
      <div style={formStyle}>
        <form>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Game:</label>
            <select style={inputStyle}>
              <option>Select Game</option>
              {/* Add game options here */}
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Name:</label>
            <input type="text" placeholder="Name" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Email:</label>
            <input type="email" placeholder="Email" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Feedback:</label>
            <textarea
              placeholder="Feedback"
              style={{ ...inputStyle, height: "100px", resize: "none" }} // Disable resize for consistent look
            ></textarea>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Date:</label>
            <input type="date" style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>

      {/* Rating Form */}
      <div style={formStyle}>
        <form>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Game:</label>
            <select style={inputStyle}>
              <option>Select Game</option>
              {/* Add game options here */}
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Name:</label>
            <input type="text" placeholder="Name" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Email:</label>
            <input type="email" placeholder="Email" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Rate:</label>
            <div>
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  style={starStyle(index)}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHoverRating(index)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Date:</label>
            <input type="date" style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
   </div>
   <Footer></Footer>
   </div>
  );
};

export default FeedbackForm;
