import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../foodManagement/context/authContext";
import NavBar from "../../../components/core/NavBar";
import Footer from "../../../components/core/Footer";

const FeedbackDetails = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useAuth();

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/games/games/feedbacks"
      );
      setFeedbacks(response.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (gameId, feedbackId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/games/games/${gameId}/feedbacks/${feedbackId}`
      );
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback._id !== feedbackId)
      );
      fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  return (
    <div>
      <NavBar />

      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>Feedback Details</h2> {/* Added heading */}
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>ID</th>
              <th style={styles.tableHeaderCell}>Game Name</th>
              <th style={styles.tableHeaderCell}>User</th>
              <th style={styles.tableHeaderCell}>Feedback</th>
              <th style={styles.tableHeaderCell}>Rating (stars)</th>
              {user.user.role ? (
                <th style={styles.tableHeaderCell}>Action</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.feedbackId} style={styles.tableRow}>
                <td style={styles.tableCell}>{feedback.gameId}</td>
                <td style={styles.tableCell}>{feedback.gameName}</td>
                <td style={styles.tableCell}>{feedback.user}</td>
                <td style={styles.tableCell}>{feedback.feedback}</td>
                <td style={styles.tableCell}>{feedback.score}</td>
                {user.user.role ? (
                  <td style={styles.tableCell}>
                    <button
                      style={styles.deleteButton}
                      onClick={() =>
                        handleDelete(feedback.gameId, feedback.feedbackId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#161E38",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "60px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    maxWidth: "1200px",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#2E3A59",
  },
  tableHeaderCell: {
    padding: "12px",
    borderBottom: "1px solid #444",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #444",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
};

export default FeedbackDetails;
