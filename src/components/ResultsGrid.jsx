import React from "react";
import { Link } from "react-router-dom";
import { createSlug } from "../utils/slug"; // Import the utility

function ResultsGrid({ results }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {results.map((r) => (
          // Use the createSlug function to generate the URL
          <Link to={`/${r.media_type}/${createSlug(r.id, r.title || r.name)}`} key={r.id}>
            <div
              className="relative bg-gray-800/40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform cursor-pointer"
            >
              {/* ... rest of the component is the same */}
              {r.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${r.poster_path}`}
                  alt={r.title || r.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}
              <div className="absolute bottom-0 w-full bg-black/60 p-2 text-sm">
                <h3 className="font-semibold truncate">{r.title || r.name}</h3>
                <p className="text-gray-300 text-xs">{r.media_type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ResultsGrid;