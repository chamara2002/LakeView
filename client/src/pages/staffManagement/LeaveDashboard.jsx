import React, { useState, useEffect } from 'react';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/leaves/leaves');
      const data = await response.json();
      setLeaveRequests(data);
    } catch (err) {
      console.error("Failed to fetch leave requests:", err);
    }
  };

  const approveLeave = async (leaveId) => {
    try {
      await fetch(`http://localhost:3000/api/leaves/leaves/${leaveId}/approve`, {
        method: 'PUT',
      });
      fetchLeaveRequests(); // Refresh the leave requests after approving
    } catch (err) {
      console.error("Failed to approve leave:", err);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const containerStyle = {
    width: '80%',
    margin: '0 auto',
    backgroundColor: '#9b9fab',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    minheight: '100vh',
    height: 'auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    backgroundColor: '#e0e0e0',
    textAlign: 'left',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  };

  const statusAcceptedStyle = {
    color: 'white',
    backgroundColor: '#28a745', // Green background
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'not-allowed',
  };

  const statusPendingStyle = {
    color: 'black',
    backgroundColor: 'yellow', // Yellow background
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{backgroundColor: '#161E38'}}>
      <NavBar></NavBar>
      <div style={containerStyle}>
      <h2>LEAVE REQUESTS</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Staff Name</th>
            <th style={thStyle}>Leave Start Date</th>
            <th style={thStyle}>Leave End Date</th>
            <th style={thStyle}>Reason</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave._id}>
              <td style={tdStyle}>
                {leave.employeeId ? leave.employeeId.username : 'Unknown'}
              </td>
              <td style={tdStyle}>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td style={tdStyle}>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td style={tdStyle}>{leave.leaveReason}</td>
              <td style={tdStyle}>
                {leave.leaveStatus ? (
                  <span style={statusAcceptedStyle}>Accepted</span>
                ) : (
                  <span
                    style={statusPendingStyle}
                    onClick={() => approveLeave(leave._id)}
                  >
                    Accept
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default LeaveRequests;
