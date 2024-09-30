import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportButton = ({ bookings, title, fileName }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 20); // Use the title prop for the report

    // Table headers
    const tableColumn = title === "Movie Bookings" ? [
      "Movie Name",
      "Customer Email",
      "Seats",
      "Price",
      "Status",
    ] : [
      "Game Name",
      "Customer Email",
      "Seats",
      "Price",
      "Status",
    ];

    // Prepare data for the table
    const tableRows = bookings.map((booking) => [
      title === "Movie Bookings" ? booking.movie?.name || "Unknown" : booking.game?.name || "Unknown",
      booking.customer?.email || "Unknown",
      booking.seatNumbers ? booking.seatNumbers.length : 0,
      `$${booking.totalPrice.toFixed(2)}`,
      booking.confirmed ? "Paid" : "Not paid",
    ]);

    // Generate the table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fillColor: [40, 40, 40], textColor: [0, 0, 0] },
      headStyles: { fillColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [220, 220, 220] },
    });

    // Save the PDF
    doc.save(fileName); // Use the fileName prop
  };

  return (
    <button onClick={handleDownload} style={styles.button}>
      Generate Report
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default ReportButton;
