import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultsGrid from "../components/ResultsGrid";
import { searchMedia } from "../services/tmbdApi";
import Loader from "../components/Loader";

function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setResults([]);
    const data = await searchMedia(query);
    setResults(data?.results || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && <Loader />}
      
      {results.length > 0 && (
        <ResultsGrid results={results} />
      )}
    </div>
  );
}

export default Home;