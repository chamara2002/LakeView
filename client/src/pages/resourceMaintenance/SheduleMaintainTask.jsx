import React from 'react';

function ScheduleTask() {
  return (
    <div style={{ backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '10px', width: '600px', margin: 'auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#00b0ff', padding: '10px', borderRadius: '5px 5px 0 0' }}>
        <h2>Dashboard</h2>
      </div>
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>SCHEDULE A MAINTENANCE TASK</h3>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '20px' }}>
        <label>
          Task ID
          <input type="text" style={{ width: '100%' }} />
        </label>
        <label>
          Assigned To
          <input type="text" style={{ width: '100%' }} />
        </label>
        <label>
          Task Name
          <input type="text" style={{ width: '100%' }} />
        </label>
        <label>
          Scheduled Date
          <input type="date" style={{ width: '100%' }} />
        </label>
        <label>
          Description
          <textarea style={{ width: '100%', gridColumn: 'span 2' }} rows="3"></textarea>
        </label>
        <label>
          Created At
          <input type="date" style={{ width: '100%' }} />
        </label>
        <label>
          Updated At
          <input type="date" style={{ width: '100%' }} />
        </label>
        <label>
          Status
          <input type="text" style={{ width: '100%' }} />
        </label>
        <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#ffcc00', color: '#000', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '5px' }}>
          Schedule Task
        </button>
      </form>
    </div>
  );
}

export default ScheduleTask;
