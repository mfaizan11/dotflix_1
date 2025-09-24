
import React, { useState, useEffect } from 'react';
import { getTrendingMedia } from '../services/tmbdApi';
import { Link } from 'react-router-dom';
import { createSlug } from '../utils/slug';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

function Hero() {
  const [trending, setTrending] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingMedia();
      if (data?.results) {
        const filtered = data.results.filter(item => item.backdrop_path && item.poster_path);
        setTrending(filtered);
        setCurrentItem(filtered[0]);
      }
    };
    fetchTrending();
  }, []);

  if (!currentItem) {
    return <div className="h-screen w-full flex items-center justify-center bg-black"></div>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${currentItem.poster_path}`;
  const title = currentItem.title || currentItem.name;
  const slug = createSlug(currentItem.id, title);

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>
      <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center gap-8 text-white w-full">
          <div className="md:w-2/3 lg:w-1/2 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl">
              {currentItem.overview}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link
                to={`/${currentItem.media_type}/${slug}`}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
              >
                <FaPlay /> Watch Now
              </Link>
              <Link
                to={`/${currentItem.media_type}/${slug}`}
                className="flex items-center gap-2 px-6 py-3 bg-gray-500/70 text-white font-semibold rounded-md hover:bg-gray-500/90 transition"
              >
                <FaInfoCircle /> More Info
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:w-1/3 lg:w-1/2 flex justify-center">
            <img src={posterUrl} alt={title} className="rounded-lg shadow-2xl w-64" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;