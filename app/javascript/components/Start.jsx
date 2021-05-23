import React, { useState } from "react";

export default function Start() {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    console.log("searching...");
  };

  return (
    <div>
      <h1>Search for movies</h1>
      <form>
        <label>
          Title:
          <input
            id="name"
            name="movie-title"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button onClick={handleSearch()}>Search</button>
      </form>
    </div>
  );
}
