export default function Status({ status, editable, onUpdateStatus }) {
    const handleChange = (e) => {
      onUpdateStatus(e.target.value);
    };
  
    return (
      <div className="status-container">
        {/* Drop down menu for Payment Status */}
        <select
          className={`status-dropdown ${!editable ? 'disabled' : ''}`}
          value={status}
          disabled={!editable}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    );
  }
  