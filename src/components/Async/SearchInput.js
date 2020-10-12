import React,{forwardRef} from "react";

const SearchInput = forwardRef(({ value, onChange, children },ref) => {
  return (
    <div >
      <label htmlFor="search">{children}</label>
      <input data-testid="searchinput" id="search" type='text' value={value} onChange={onChange} ref={ref}/>
    </div>
  );
});


export default SearchInput