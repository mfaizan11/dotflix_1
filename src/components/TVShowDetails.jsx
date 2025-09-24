import React, { useState } from "react";
import { getSeasonDetails } from "../services/tmbdApi";

function TVShowDetails({ show, onWatch, loading }) {
  const [episodesBySeason, setEpisodesBySeason] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [openSeasons, setOpenSeasons] = useState([]);

  async function fetchSeason(seasonNumber) {
    if (episodesBySeason[seasonNumber]) return;
    const data = await getSeasonDetails(show.id, seasonNumber);
    if (data && data.episodes) {
      setEpisodesBySeason((prev) => ({ ...prev, [seasonNumber]: data.episodes }));
    }
  }

  function toggleSeason(seasonNumber) {
    if (openSeasons.includes(seasonNumber)) {
      setOpenSeasons(openSeasons.filter((s) => s !== seasonNumber));
    } else {
      setOpenSeasons([...openSeasons, seasonNumber]);
      fetchSeason(seasonNumber);
    }
  }
  
  const handleWatchEpisode = () => {
    if (!selectedEpisode) return;
    const embedUrl = `https://www.vidking.net/embed/tv/${show.id}/${selectedEpisode.season}/${selectedEpisode.episode_number}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`;
    onWatch(embedUrl);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {show.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
            alt={show.name}
            className="rounded-lg shadow-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{show.name}</h1>
          <p className="text-gray-400 mt-2">{show.tagline}</p>
          <p className="text-gray-300 mt-4 leading-relaxed">{show.overview}</p>
        </div>
      </div>

      <div>
        {show.seasons
          .filter((s) => s.season_number > 0)
          .map((season) => (
            <div key={season.id} className="mb-10">
              <h2
                className="text-2xl font-semibold mb-3 cursor-pointer flex justify-between items-center bg-gray-800/70 px-4 py-3 rounded-lg hover:bg-gray-700"
                onClick={() => toggleSeason(season.season_number)}
              >
                {season.name} ({season.episode_count} episodes)
                <span className="text-gray-400">
                  {openSeasons.includes(season.season_number) ? "▲" : "▼"}
                </span>
              </h2>

              {openSeasons.includes(season.season_number) && (
                <>
                  <div className="overflow-x-auto">
                    <div className="flex gap-4 pb-4">
                      {episodesBySeason[season.season_number]?.map((ep) => (
                        <div
                          key={ep.id}
                          className={`min-w-[220px] bg-gray-800/60 rounded-lg shadow hover:scale-105 transition transform cursor-pointer ${
                            selectedEpisode?.id === ep.id ? "ring-2 ring-blue-500" : ""
                          }`}
                          onClick={() => setSelectedEpisode({ ...ep, season: season.season_number })}
                        >
                          {ep.still_path ? (
                            <img src={`https://image.tmdb.org/t/p/w300${ep.still_path}`} alt={ep.name} className="rounded-t-lg h-36 w-full object-cover" />
                          ) : (
                            <div className="h-36 flex items-center justify-center bg-gray-700 text-gray-400 text-xs rounded-t-lg">No Image</div>
                          )}
                          <div className="p-3">
                            <h3 className="font-semibold text-sm truncate">E{ep.episode_number}: {ep.name}</h3>
                            <p className="text-gray-400 text-xs">{ep.air_date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedEpisode?.season === season.season_number && (
                    <div className="mt-6 bg-gray-800/70 rounded-lg p-6 shadow-lg">
                      <h2 className="text-xl font-bold mb-3">S{selectedEpisode.season} · E{selectedEpisode.episode_number} — {selectedEpisode.name}</h2>
                      <p className="text-gray-300 mb-6 leading-relaxed">{selectedEpisode.overview}</p>
                      <button
                        onClick={handleWatchEpisode}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-90 rounded-lg text-white font-semibold shadow-lg"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "▶ Watch Episode"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default TVShowDetails;