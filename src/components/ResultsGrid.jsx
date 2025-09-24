import React from "react";
import { Link } from "react-router-dom";
import { createSlug } from "../utils/slug";

function ResultsGrid({ results }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {results.map((r) => (
          <Link
            to={`/${r.media_type}/${createSlug(r.id, r.title || r.name)}`}
            key={r.id}
          >
            <div className="relative bg-gray-800/40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform cursor-pointer">
              {/* Poster */}
              {r.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${r.poster_path}`}
                  alt={r.title || r.name}
                  className="w-full h-86 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}

              {/* Metadata overlay */}
              <div className="absolute bottom-0 w-full bg-black/80 p-2 text-xs sm:text-sm">
                <h3 className="font-semibold truncate">{r.title || r.name}</h3>

                <div className="flex items-center justify-between text-gray-300 gap-x-2">
                  {/* Year (movie: release_date | tv: first_air_date) */}
                  {(r.release_date || r.first_air_date) && (
                    <span>
                      {new Date(
                        r.release_date || r.first_air_date
                      ).getFullYear()}
                    </span>
                  )}

                  {/* Runtime (only for movies usually) */}
                  {r.runtime && <span>{r.runtime} min</span>}

                  {/* Genres */}
                  {r.genres && r.genres.length > 0 && (
                    <span className="truncate">
                      {r.genres.map((g) => g.name).join(", ")}
                    </span>
                  )}

                  {/* Media type */}
                  <span className="italic text-gray-400">{r.media_type}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ResultsGrid;
