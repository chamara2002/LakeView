import React from 'react';

const ReportButton = () => {
  return (
    <button style={styles.button}>
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
