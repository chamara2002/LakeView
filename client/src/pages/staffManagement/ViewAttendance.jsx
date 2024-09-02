import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const ViewAttendance = () => {
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#161E38', // Changed background color
    color: '#234151', // Changed text color to be readable on dark background
    height:'100vh'
  };

  const tableStyle = {
    padding :'40px',
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    textAlign: 'left',
  };

  const buttonStyle = {
    padding: '5px 10px',
    margin: '5px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f0ad4e',
    color: 'white',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d9534f',
    color: 'white',
  };

  return (
    <div>
      <NavBar></NavBar>
      <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Leave Id</th>
            <th style={thStyle}>Staff Id</th>
            <th style={thStyle}>Leave need Date</th>
            <th style={thStyle}>Reasone</th>
            <th style={thStyle}>Status</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}></td>
            <td style={tdStyle}></td>
            <td style={tdStyle}></td>
            <td style={tdStyle}></td>
            <td style={tdStyle}>
              <button style={updateButtonStyle}>Accept</button>
              <button style={deleteButtonStyle}>Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


      <Footer></Footer>
    </div>
  );
};

export default ViewAttendance;
