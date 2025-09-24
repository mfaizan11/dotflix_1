import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMediaDetails } from "../services/tmbdApi";
import { sniffStream } from "../services/streamApi";
import MovieDetails from "../components/MovieDetails";
import TVShowDetails from "../components/TVShowDetails";
import VideoPlayer from "../components/VideoPlayer";
import Loader from "../components/Loader";
import { getIdFromSlug } from "../utils/slug"; 

function DetailsPage() {
  const { type, slug } = useParams(); 
  const [details, setDetails] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const id = getIdFromSlug(slug); 
      if (!id) return;
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        <Loader />
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen  bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No details found.</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Add padding-top to account for fixed header */}
      <div className="!pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="mb-6 inline-block text-sm text-gray-300 hover:text-gray-100 hover:underline transition-colors"
          >
            ← Back to Home
          </Link>

          {details.type === "movie" && (
            <MovieDetails
              movie={details}
              onWatch={handleWatch}
              loading={loading}
            />
          )}
          {details.type === "tv" && (
            <TVShowDetails
              show={details}
              onWatch={handleWatch}
              loading={loading}
            />
          )}
          {videoUrl && <VideoPlayer src={videoUrl} />}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
