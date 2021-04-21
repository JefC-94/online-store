import React from 'react'

function PerPage({pageLimit, setPageLimit}) {
    return (
        <div className="pagination-perpage">
            <label>Per pagina:</label>
            <select value={pageLimit} onChange={(e) => setPageLimit(e.target.value)}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
            </select>
        </div>
    )
}

export default PerPage
