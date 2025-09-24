import React, { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex items-center gap-3 max-w-2xl mx-auto"
    >
      <input
        type="text"
        value={query}
        placeholder="🔍 Search for movies, TV shows, or episodes..."
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-3 rounded-lg bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold disabled:bg-gray-500"
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;