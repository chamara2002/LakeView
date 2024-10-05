import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Footer from '../../components/core/Footer';
import NavBar from '../../components/core/NavBar';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/leaves/leaves');
      const data = await response.json();

      // Sort leave requests by start date in ascending order
      const sortedData = data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      setLeaveRequests(sortedData);
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

  // Function to get all accepted leave dates
  const getAcceptedLeaveDates = () => {
    const acceptedLeaves = leaveRequests.filter(leave => leave.leaveStatus);
    const leaveDates = {};

    acceptedLeaves.forEach(leave => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      
      // Loop through all dates from start to end
      for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        const dateString = dt.toLocaleDateString();
        if (leaveDates[dateString]) {
          leaveDates[dateString] += 1; // Increment count for this date
        } else {
          leaveDates[dateString] = 1; // Initialize count for this date
        }
      }
    });

    // Convert leaveDates object to array for the chart
    return Object.entries(leaveDates).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const leaveData = getAcceptedLeaveDates();

  const containerStyle = {
    width: '80%',
    margin: '0 auto',
    backgroundColor: '#161E38',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    minHeight: '100vh',
    height: 'auto',
  };

  const heading = {
    fontSize: "25px",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    borderBottom: '1px solid #444',
    padding: '10px',
    backgroundColor: '#2E3A59',
    textAlign: 'left',
    color: 'white',
  };

  const tdStyle = {
    borderBottom: '1px solid #444',
    padding: '10px',
    textAlign: 'left',
    color: 'white',
    borderCollapse: "collapse",
    lineHeight: "1.5",
  };

  const statusAcceptedStyle = {
    color: 'white',
    backgroundColor: '#28a745',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'not-allowed',
  };

  const statusPendingStyle = {
    color: 'white',
    backgroundColor: '#FF6347',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{ backgroundColor: '#161E38' }}>
      <NavBar></NavBar>
      <div style={containerStyle}>
        <h2 style={heading}>Leave Accepted Chart</h2>

        {/* Display the bar chart for accepted leaves */}
        <div style={{ marginBottom: '40px', width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leaveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        

        <h2 style={heading}>Leave Requests</h2>

        {/* Display the table */}
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
