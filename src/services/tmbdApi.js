const API_KEY = "ad301b7cc82ffe19273e55e4d4206885";
const BASE_URL = "https://api.themoviedb.org/3";

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
  return fetchFromTMDb(`trending/all/day?api_key=${API_KEY}&language=en-US`);
};
