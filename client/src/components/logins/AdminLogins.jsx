import React from 'react';

const AdminLogins = () => {
  const managers = [
    'Games Manager',
    'Staff Manager',
    'Restaurant Manager',
    'Ticket Booking Manager',
    'Movie Manager',
    'Customer Support Manager',
    'Event Manager',
    'Resource Manager',
  ];

  return (
    <div className={styles.admindashboard }>
      <h2>Administrators</h2>
      <div className={styles.managergrid}>
        {managers.map((manager, index) => (
          <button key={index} className={styles.managerbutton}>
            {manager}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminLogins;
