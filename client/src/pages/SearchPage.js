import React from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("q");

  return (
    <div>
      <h2>Search Results for: "{searchTerm}"</h2>
      {/* Fetch and display search results here */}
    </div>
  );
};

export default SearchPage;
