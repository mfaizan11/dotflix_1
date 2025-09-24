import React from "react";

function MovieDetails({ movie, onWatch, loading }) {
  const embedUrl = `https://www.vidking.net/embed/movie/${movie.id}?color=e50914&autoPlay=true`;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full md:w-auto"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">{movie.tagline}</p>
          <p className="text-gray-300 mt-4 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
      <button
        onClick={() => onWatch(embedUrl)}
        className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 rounded-lg text-white font-semibold shadow-lg"
        disabled={loading}
      >
        {loading ? "Loading..." : "▶ Watch Movie"}
      </button>
    </>
  );
}

export default MovieDetails;