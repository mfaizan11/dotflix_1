// src/pages/DetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMediaDetails } from "../services/tmbdApi";
import { sniffStream } from "../services/streamApi";
import MovieDetails from "../components/MovieDetails";
import TVShowDetails from "../components/TVShowDetails";
import VideoPlayer from "../components/VideoPlayer";
import Loader from "../components/Loader";
import { getIdFromSlug } from "../utils/slug"; // Import the utility

function DetailsPage() {
  const { type, slug } = useParams(); // Get the 'slug' from the URL
  const [details, setDetails] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const id = getIdFromSlug(slug); // Extract the ID from the slug
      if (!id) return; // Handle cases where the slug might be invalid

      setLoading(true);
      const data = await getMediaDetails(type, id);
      setDetails({ ...data, type });
      setLoading(false);
    };

    fetchDetails();
  }, [type, slug]);

  const handleWatch = async (embedUrl) => {
    setLoading(true);
    setVideoUrl(null);
    setError(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const streamUrl = await sniffStream(embedUrl, controller.signal);
      if (streamUrl) {
        setVideoUrl(streamUrl);
      } else {
        alert("Stream not found");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  if (loading && !details) {
    return <Loader />;
  }

  if (!details) {
    return <p>No details found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
      <Link
        to="/"
        className="mb-6 inline-block text-sm text-gray-300 hover:underline"
      >
        ← Back to Search
      </Link>

      {details.type === "movie" && (
        <MovieDetails movie={details} onWatch={handleWatch} loading={loading} />
      )}

      {details.type === "tv" && (
        <TVShowDetails show={details} onWatch={handleWatch} loading={loading} />
      )}

      {videoUrl && <VideoPlayer src={videoUrl} />}
    </div>
  );
}

export default DetailsPage;
