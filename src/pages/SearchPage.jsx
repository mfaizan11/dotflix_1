import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ResultsGrid from "../components/ResultsGrid";
import { searchMedia } from "../services/tmbdApi";
import Loader from "../components/Loader";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const handleSearch = async () => {
      setLoading(true);
      setResults([]);
      const data = await searchMedia(query);
      setResults(data?.results || []);
      setLoading(false);
    };

    handleSearch();
  }, [query]);

  return (
    <div className="pt-24 p-6 md:p-30 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Search results for: "{query}"</h1>
      {loading && <Loader />}
      {results.length > 0 ? (
        <ResultsGrid results={results} />
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchPage;
