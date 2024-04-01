import './Filters.css'; //Import styling

export default function Filters() {
    return (
        <div className="filters">
            <label htmlFor="status">Filter by Status</label>
            <select className="filter">
            <option value="all">All</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            </select>
        </div>
    );
}

/* <div className="filter">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" />
        </div>
        <div className="filter">
            <label htmlFor="consultant">Consultant:</label>
            <input type="text" id="consultant" />
        </div> */