import React, { useState, useRef, useEffect } from "react";

const Search = () => {
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  /** 

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
  }, []);*/

  return (
    <div style={{ background: "gray", width: "100%" }}>
      <h1>Search a User</h1>
      <p data-testid='searchvalue'>Search for {search ? search : "..."}</p>
      
      <input
        ref={searchRef}
        type='text'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={() => searchRef.current.focus()}>Search</button>
    </div>
  );
};

export default Search;

//<p>User: {user?user.name:''}</p>