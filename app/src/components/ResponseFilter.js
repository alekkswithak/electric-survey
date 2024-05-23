import React from "react";
import "./ResponseFilter.css";

const ResponseFilter = ({ filters, onChange }) => {
  const handleFilterChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const formatFilterName = (name) => {
    if (name.toUpperCase() === "AGE") {
      return "Age (or, range e.g: 18-36)";
    }
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filterKeys = Object.keys(filters);

  return (
    <div className="response-filter">
      <h2>Filter Responses</h2>
      <div className="filter-table">
        {filterKeys.map(
          (key, index) =>
            index % 4 === 0 && (
              <div key={index} className="filter-row">
                {filterKeys.slice(index, index + 4).map((filterKey) => (
                  <div key={filterKey} className="filter-cell">
                    <input
                      type="text"
                      name={filterKey}
                      value={filters[filterKey]}
                      onChange={handleFilterChange}
                      className="form-control"
                      placeholder={`Filter ${formatFilterName(filterKey)}`}
                    />
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ResponseFilter;
