import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { createSlug } from "../utils/slug";
import Loader from "./Loader";
import RatingBadge from "./RatingBadge";

// Memoized MediaItem component to prevent unnecessary re-renders
const MediaItem = memo(({ item, media_type }) => {
  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  };

  return (
    <Link
      to={`/${item.media_type || media_type}/${createSlug(
        item.id,
        item.title || item.name
      )}`}
      className="flex-shrink-0 w-48"
      draggable={false}
    >
      <div className="bg-gray-800/40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer group">
        <div className="relative">
          {item.poster_path ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-64 object-cover"
                loading="lazy"
                onError={handleImageError}
                draggable={false}
              />
              <div className="w-full h-64 bg-gray-700 items-center justify-center text-gray-400 text-xs hidden">
                No Image
              </div>
            </>
          ) : (
            <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
          <RatingBadge rating={item.vote_average} />
        </div>
        <div className="p-3">
          <h3 className="font-semibold truncate text-sm text-white hover:text-red-400 transition-colors">
            {item.title || item.name}
          </h3>
        </div>
      </div>
    </Link>
  );
});

MediaItem.displayName = "MediaItem";

function MediaRow({ title, fetchData, media_type }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });

  // Memoized fetch function to prevent unnecessary re-renders
  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      if (data?.results) {
        setMedia(data.results.slice(0, 10));
      }
    } catch (error) {
      console.error("Error loading media:", error);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };

    // Prevent text selection during drag
    document.body.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !scrollContainerRef.current) return;

      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - dragStartRef.current.x) * 2;
      scrollContainerRef.current.scrollLeft =
        dragStartRef.current.scrollLeft - walk;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  }, []);

  // Touch drag handlers for mobile
  const handleTouchStart = useCallback((e) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging || !scrollContainerRef.current) return;

      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - dragStartRef.current.x) * 1.5;
      scrollContainerRef.current.scrollLeft =
        dragStartRef.current.scrollLeft - walk;
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Scroll buttons
  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  }, []);

  // Don't render the row if there's an error or no media
  if (!loading && media.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 transition-opacity duration-500 ease-in-out opacity-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        {/* Scroll buttons - only show if not loading and has media */}
        {!loading && media.length > 0 && (
          <div className="hidden md:flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-gray-800/60 hover:bg-gray-700/60 rounded-full text-white transition-colors"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-gray-800/60 hover:bg-gray-700/60 rounded-full text-white transition-colors"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className={`flex overflow-x-auto space-x-4 pb-4 media-row scrollbar-hide ${
              isDragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {media.map((item) => (
              <MediaItem key={item.id} item={item} media_type={media_type} />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .media-row {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
}

export default memo(MediaRow);
