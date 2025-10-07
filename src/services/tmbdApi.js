const API_KEY = "ad301b7cc82ffe19273e55e4d4206885";
const BASE_URL = "https://api.themoviedb.org/3";

// testing
async function fetchFromTMDb(endpoint) {
  const url = `${BASE_URL}/${endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch from TMDb: ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Error in fetchFromTMDb:", err);
    return null;
  }
}

export const searchMedia = (query) => {
  return fetchFromTMDb(
    `search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US`
  );
};

export const getMediaDetails = (type, id) => {
  return fetchFromTMDb(`${type}/${id}?api_key=${API_KEY}&language=en-US`);
};

export const getSeasonDetails = (tvId, seasonNumber) => {
  return fetchFromTMDb(
    `tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
  );
};

export const getTrendingMedia = () => {
  // Changed from /day to /week
  return fetchFromTMDb(`trending/all/week?api_key=${API_KEY}&language=en-US`);
};

export const getTopRatedMovies = () => {
  // Changed from movie/top_rated to trending/movie/week for a weekly list
  return fetchFromTMDb(`trending/movie/week?api_key=${API_KEY}&language=en-US`);
};

export const getTopRatedShows = () => {
  // Changed from tv/top_rated to trending/tv/week for a weekly list
  return fetchFromTMDb(`trending/tv/week?api_key=${API_KEY}&language=en-US`);
};

// Genre IDs can be found on the TMDB website. Examples:
// Action: 28, Comedy: 35, Horror: 27, Sci-Fi: 878
export const getMediaByGenre = (genreId) => {
  return fetchFromTMDb(
    `discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
  );
};
