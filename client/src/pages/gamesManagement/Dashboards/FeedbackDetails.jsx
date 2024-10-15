import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../foodManagement/context/authContext";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autoTable plugin for jsPDF
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import { Chart, registerables } from "chart.js"; // Import chart.js
Chart.register(...registerables); // Register chart.js components

const FeedbackDetails = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { user } = useAuth();
  const chartRef = useRef(null); // Create a ref for the chart

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

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Company Information
    const companyName = "LakeView Gaming Zone"; 
    const companyAddress = "Gampaha, Sri Lanka"; 
    const companyPhone = "+9433-7628316"; 
    const companyEmail = "lakeviewgaming01@gmail.com"; 

    // Logo (Replace with your actual base64 string or image URL)
    const logo = "reportLogo.png"; 

    // Add the logo to the PDF
    doc.addImage(logo, "PNG", 150, 10, 40, 35); 

    // Add company name in blue and bold
    doc.setFontSize(14);
    doc.setTextColor(30, 39, 73); // Set text color to blue
    doc.setFont("Helvetica", "bold"); // Set font to bold
    doc.text(companyName, 20, 20);
    
    // Reset text color and font for the rest of the text
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.setFont("Helvetica", "normal"); // Set font to normal for the rest
    doc.setFontSize(10);
    doc.text(companyAddress, 20, 30);
    doc.text(companyPhone, 20, 35);
    doc.text(companyEmail, 20, 40);
    
    // Add a line for separation
    doc.line(20, 45, 190, 45); 

    // Add the report title
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold"); // Set font to bold for title
    doc.text("Feedback and Ratings Details Report", 55, 60);
    doc.setFont("Helvetica", "normal"); // Set font back to normal for rest of content

    // Filter feedbacks based on search query
    const filteredFeedbacks = feedbacks.filter(feedback =>
      feedback.gameName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format data for autoTable based on filtered feedbacks
    const tableData = filteredFeedbacks.map(feedback => [
      "GID" + feedback.gameId.slice(-4),
      feedback.gameName,
      feedback.user,
      feedback.feedback,
      feedback.score
    ]);

    // Add autoTable with filtered feedback data
    doc.autoTable({
      head: [['Game ID', 'Game Name', 'User', 'Feedback', 'Rating']],
      body: tableData,
      startY: 70,
      theme: 'grid',
      headStyles: { fillColor: [22, 30, 56] },  // Table header style
      styles: { cellPadding: 3, fontSize: 10 }
    });

    // Calculate the total number of feedback entries
    const totalFeedbackCount = filteredFeedbacks.length;

    // Add the total feedback count below the table
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text(`Total Feedbacks: ${totalFeedbackCount}`, 14, doc.lastAutoTable.finalY + 10);

    const now = new Date();
    const timestamp = now.toLocaleString(); // Formats the current date and time
    doc.setFontSize(12);
    doc.setTextColor(6, 64, 43);
    doc.text(`Report Generated on: ${timestamp}`, 14, doc.lastAutoTable.finalY + 25);

    // Save the PDF
    doc.save('feedback_and_ratings_details_report.pdf');
  };

  const handleExportChartPDF = () => {
    const chart = chartRef.current; // Get the chart instance
    const chartImage = chart.toBase64Image(); // Convert the chart to a base64 image

    const doc = new jsPDF();

    // Company Information
    const companyName = "LakeView Gaming Zone"; 
    const companyAddress = "Gampaha, Sri Lanka"; 
    const companyPhone = "+9433-7628316"; 
    const companyEmail = "lakeviewgaming01@gmail.com"; 

    // Logo (Replace with your actual base64 string or image URL)
    const logo = "reportLogo.png"; 

    // Add the chart description below the image
    const chartDescription = generateChartDescription(); // Call the function that generates chart description

    // Get the current date and time
    const now = new Date();
    const reportDate = now.toLocaleDateString(); // Format the date
    const reportTime = now.toLocaleTimeString(); // Format the time

    // Set font properties for the chart description
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50); // Set text color to dark gray
    doc.setFont("Helvetica", "normal"); // Set font to normal

    // Add chart description text
    const descriptionLines = doc.splitTextToSize(chartDescription, 180); // Split the text into lines that fit the PDF width
    const startingY = 180 + (descriptionLines.length * 1); // Calculate starting Y position based on the number of lines
    doc.text(descriptionLines, 10, startingY); // Add text with word wrapping

    const dateText = `Report Generated on: ${reportDate}, ${reportTime}`;
    const dateYPosition = startingY + (descriptionLines.length * 7); // Adjust the Y position based on the length of the description
    doc.setFontSize(12);
    doc.setTextColor(6, 64, 43);
    doc.text(dateText, 10, dateYPosition); // Add date text below des

    // Add the logo to the PDF
    doc.addImage(logo, "PNG", 150, 10, 40, 35); 

    // Add company name in blue and bold
    doc.setFontSize(14);
    doc.setTextColor(30, 39, 73); // Set text color to blue
    doc.setFont("Helvetica", "bold"); // Set font to bold
    doc.text(companyName, 20, 20);
    
    // Reset text color and font for the rest of the text
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.setFont("Helvetica", "normal"); // Set font to normal for the rest
    doc.setFontSize(10);
    doc.text(companyAddress, 20, 30);
    doc.text(companyPhone, 20, 35);
    doc.text(companyEmail, 20, 40);
    
    // Add a line for separation
    doc.line(20, 45, 190, 45); 

    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold"); // Set font to bold for title
    doc.text("Average Ratings for Games", 65, 60); // Chart title
    doc.setFont("Helvetica", "normal"); // Set font back to normal for rest of content

    // Add chart image to PDF
    doc.addImage(chartImage, "PNG", 10, 70, 180, 100); // Add the chart image to the PDF

    // Save the PDF
    doc.save("game_ratings_chart.pdf");
  };

  // Filter feedbacks based on the search query
  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate average ratings per game for the chart
  const ratingsPerGame = feedbacks.reduce((acc, feedback) => {
    const game = feedback.gameName;
    if (!acc[game]) {
      acc[game] = { totalScore: 0, count: 0 };
    }
    acc[game].totalScore += feedback.score;
    acc[game].count += 1;
    return acc;
  }, {});

  const gameNames = Object.keys(ratingsPerGame);
  const averageRatings = gameNames.map(
    (game) => ratingsPerGame[game].totalScore / ratingsPerGame[game].count
  );

  // Bar chart data
  const chartData = {
    labels: gameNames,
    datasets: [
      {
        label: "Average Rating",
        data: averageRatings,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    animation: {
      duration: 1500, // Chart animation duration
      easing: "easeInOutQuad", // Easing function
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // Max rating is 5
      },
    },
  };

  // Function to generate chart description
  const generateChartDescription = () => {
    if (gameNames.length === 0) return "No data available.";
    return gameNames.map((game, index) => {
      const avgRating = averageRatings[index].toFixed(2); // Format to 2 decimal places
      return `${game} has an average rating of ${avgRating} out of 5.`;
    }).join(" "); // Join all descriptions into one string
  };

  return (
    <div>
      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>Feedback and Ratings Details</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by game name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          style={styles.searchBar}
        />

        {/* Feedback Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableHeaderCell}>Game ID</th>
                <th style={styles.tableHeaderCell}>Game Name</th>
                <th style={styles.tableHeaderCell}>User Name</th>
                <th style={styles.tableHeaderCell}>Feedback</th>
                <th style={styles.tableHeaderCell}>Rating (Stars)</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback.feedbackId} style={styles.tableRow}>
                  <td style={styles.tableCell}>{"GID" + feedback.gameId.slice(-4)}</td>
                  <td style={styles.tableCell}>{feedback.gameName}</td>
                  <td style={styles.tableCell}>{feedback.user}</td>
                  <td style={styles.tableCell}>{feedback.feedback}</td>
                  <td style={styles.tableCell}>{feedback.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <br /><br />
        <button style={styles.exportButton} onClick={handleExportPDF}>
          Download Report as PDF
        </button>

        <br /><br /><br />

        {/* Bar Chart */}
        <div style={{ width: "80%", margin: "0 auto" }}>
          <h2 style={styles.chartHeading}>Average Ratings for Games</h2><br></br>
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
          
          {/* Chart Description 
          <div style={styles.chartDescription}>
            {generateChartDescription()}
          </div>*/}
        </div>

        <br />
        {/* New Button to Download Chart as PDF */}
        <button style={styles.exportButton} onClick={handleExportChartPDF}>
          Download Chart as PDF
        </button>
        
        <br /><br /><br />
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
    color: "#fff",
    padding: "10px",
    lineHeight: "1.5", // Line spacing for heading
  },
  searchBar: {
    marginBottom: "10px",
    padding: "10px",
    width: "40%",
    borderRadius: "5px",
    border: "1px solid #2C3354",
    backgroundColor: "#243055",
    color: "#fff",
    lineHeight: "1.5", // Line spacing for search bar
  },
  tableContainer: {
    backgroundColor: "#1E2749",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    width: "1025px",
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
    lineHeight: "1.5", // Line spacing for table header cells
  },
  tableRow: {
    borderBottom: "1px solid #444",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
    lineHeight: "1.5", // Line spacing for table cells
  },
  exportButton: {
    padding: "10px 20px",
    backgroundColor: '#FFD700',
    color: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    lineHeight: "1.5", // Line spacing for buttons
  },
  chartHeading: {
    color: "#fff",
    textAlign: "center",
    lineHeight: "1.5", // Line spacing for chart heading
  },
  chartDescription: {
    color: "#fff",
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
    padding: "10px",
    border: "1px solid #2C3354", // Border to separate from the chart
    borderRadius: "5px",
    backgroundColor: "#243055", // Background color to match the theme
    lineHeight: "1.5", // Line spacing for chart description
  },
};

export default FeedbackDetails;
