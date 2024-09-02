import React from 'react';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const Booking4 = () => {
  const data = [
    { _id: 'B001', bookingId: 'B001', email: 'kaml@gmail.com', tickets: 1 },
    { _id: 'B002', bookingId: 'B002', email: 'nimal@gmail.com', tickets: 2 },
    { _id: 'B003', bookingId: 'B003', email: 'sunil@gmail.com', tickets: 1 },
  ];

  const handleDelete = (id) => {
    console.log(`Delete clicked for row with id: ${id}`);
  };

  const handleUpdate = (id) => {
    console.log(`Update clicked for row with id: ${id}`);
  };

  return (
    <>
      <NavBar name='home' />
      <div style={{ display: 'flex', backgroundColor: '#0b0f29', color: 'white', minHeight: '80vh' }}>
        
        {/* Sidebar */}
        <div style={{ width: '250px', backgroundColor:'#1D284C', padding: '20px' }}>
          <h2 style={{ color: '#f1c40f', marginBottom: '30px' }}>Booking Manager</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                Dash Board
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                Manage Bookings
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                Users
              </a>
            </li>
            <li>
              <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'block', padding: '10px', borderRadius: '5px', backgroundColor: '#0b0f29' }}>
                View Booking History
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* <div style={{ backgroundColor: '#f1c40f', padding: '15px', borderRadius: '5px', textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Manage Bookings</h2>
            </div> */}

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px', backgroundColor: '#f1c40f', border: '1px solid #ccc', textAlign: 'center' }}>Booking ID</th>
                  <th style={{ padding: '10px', backgroundColor: '#f1c40f', border: '1px solid #ccc', textAlign: 'center' }}>E-mail</th>
                  <th style={{ padding: '10px', backgroundColor: '#f1c40f', border: '1px solid #ccc', textAlign: 'center' }}>No of Tickets</th>
                  <th style={{ padding: '10px', backgroundColor: '#f1c40f', border: '1px solid #ccc', textAlign: 'center' }}>Edit</th>
                  <th style={{ padding: '10px', backgroundColor: '#f1c40f', border: '1px solid #ccc', textAlign: 'center' }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={row._id} style={{ backgroundColor: index % 2 === 0 ? '#1c2335' : '#0b0f29' }}>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{row.bookingId}</td>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{row.email}</td>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{row.tickets}</td>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>
                      <button
                        onClick={() => handleUpdate(row._id)}
                        style={{ backgroundColor: '#f1c40f', color: '#0b0f29', padding: '5px 10px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        Update
                      </button>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>
                      <button
                        onClick={() => handleDelete(row._id)}
                        style={{ backgroundColor: '#e74c3c', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking4;
