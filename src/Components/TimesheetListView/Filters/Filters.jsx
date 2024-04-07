import "./Filters.css"; //Import styling

export default function Filters({ onFilterChange }) {
    const handleFilterChange = (e) => {
      onFilterChange(e.target.value);
    };
  
    return (
      <div className="filters">
        <label htmlFor="status">Filter by Status</label>
        <select className="filter" onChange={handleFilterChange}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="all">All</option>
        </select>
      </div>
    );
  }
