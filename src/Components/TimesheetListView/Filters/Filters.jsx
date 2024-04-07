import "./Filters.css"; //Import styling

export default function Filters({ onFilterChange }) {
    const handleFilterChange = (e) => {
      onFilterChange(e.target.value);
    };
  
    return (
      <div className="filters">
        <label htmlFor="status">Filter by Status</label>
        <select className="filter" onChange={handleFilterChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="all">All</option>
        </select>
      </div>
    );
  }
