import React, { useState } from "react";
import axios from "axios";
import './mockaxios.css';

const MockAxios = () => {
  const URL = "http://hn.algolia.com/api/v1/search";

  const [stories, setStorie] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${URL}?query=React`);
      console.log(result)
      setStorie(result.data.hits);
    } catch (error) {
      setError(error);
    }}

    return (
      <div>
        <button type='button' onClick={fetchData}>
          Fetch Stories
        </button>
        {error && <span>Something went wrong...</span>}
        <ul>{stories.length>0&&stories.map((story) => 
          <li key={story.objectID}>
            <a href={story.url}><span className="title">{story.title}</span></a>
          </li>
        )}</ul>
        
      </div>
    );

};

export default MockAxios;
