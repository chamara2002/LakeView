import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportButton = ({ bookings, title, fileName }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 20); // Use the title prop for the report

    // Table headers including Booking ID
    const tableColumn = [
      "Booking ID", // Added Booking ID
      "Movie Name",
      "Customer Email",
      "Seats",
      "Price",
      "Status"
    ];

    // Helper function to generate the same Booking ID format as MovieBookingManagement
    const generateBookingId = (booking) => {
      const shortId = booking._id.slice(-5); // Take the last 5 characters of the existing ID
      return `MB${shortId}`; // Combine prefix with the short ID
    };

    // Prepare data for the table, using the booking ID generation function
    const tableRows = bookings.map((booking) => [
      generateBookingId(booking), // Use the same Booking ID format
      booking.movie?.name || "Unknown",
      booking.customer?.email || "Unknown",
      booking.seatNumbers ? booking.seatNumbers.length : 0,
      `Rs.${booking.totalPrice.toFixed(2)}`,
      booking.confirmed ? "Paid" : "Not paid",
    ]);

    // Generate the table with updated colors for a more common PDF style
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] }, // Light gray background with black text
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }, // Darker gray for headers
      alternateRowStyles: { fillColor: [255, 255, 255] }, // White for alternate rows
    });

    // Move to the bottom of the table to add the total details
    const finalY = doc.lastAutoTable.finalY || 40;  // Get Y position after the table

    // Calculate totals (without total seats)
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    // Add total details at the end of the PDF
    doc.setFontSize(12);
    doc.text(`Total Bookings: ${totalBookings}`, 14, finalY + 10);
    doc.text(`Total Revenue: Rs.${totalRevenue.toFixed(2)}`, 14, finalY + 20);

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
