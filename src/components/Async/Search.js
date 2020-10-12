import React, { useState, useRef, useEffect } from "react";
import SearchInput from "./SearchInput";

const Search = () => {
  const searchRef = useRef(null);
  const techRef=useRef(null);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);

  const getUser = () => {
    return Promise.resolve({
      id: "1",
      name: "Jack",
    });
  };

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  return (
    <div style={{ background: "gray", width: "100%" }}>
      <h1>Search a User</h1>
      <p data-testid='searchvalue'>Search for {search ? search : "..."}</p>
      <p data-testid='user'>User: {user ? user.name : ""}</p>
      <input
        ref={searchRef}
        type='text'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={() => searchRef.current.focus()}>Search</button>
      <p style={{color:'black'}}>{value}</p>
      <SearchInput
        ref={techRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        Technical Search
      </SearchInput>
      <button onClick={() => techRef.current.focus()}>TechSearch</button>
    </div>
  );
};

export default Search;
