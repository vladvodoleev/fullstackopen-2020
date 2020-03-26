import React from "react";

const Filter = ({ filterWord, handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={filterWord} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter;