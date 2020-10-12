import React from "react";

const SearchInput = ({ value, onChange, children }) => {
  return (
    <div >
      <label htmlFor="search">{children}</label>
      <input data-testid="search" id="search" type='text' value={value} onChange={onChange} />
    </div>
  );
};


export default SearchInput