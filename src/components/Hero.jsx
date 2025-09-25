import React, { useState, useEffect, useCallback } from "react";
import { getTrendingMedia } from "../services/tmbdApi";
import { Link } from "react-router-dom";
import { createSlug } from "../utils/slug";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";
import Loader from "./Loader";

function Hero() {
  const [trending, setTrending] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      const preloadImages = (urls) => {
        urls.forEach((url) => {
          const img = new Image();
          img.src = url;
        });
      };

      const data = await getTrendingMedia();
      if (data?.results) {
        const filtered = data.results
          .filter(
            (item) => item.backdrop_path && item.poster_path && item.overview
          )
          .slice(0, 7);
        setTrending(filtered);

        const backdropUrls = filtered.map(
          (item) => `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
        );
        preloadImages(backdropUrls);
      }
    };

    fetchTrending();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(); // fire once on mount
    emblaApi.on("select", onSelect);

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  if (trending.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="relative h-[90vh] md:h-screen w-full overflow-hidden cursor-grab select-none"
      ref={emblaRef}
    >
      <div className="flex h-full">
        {trending.map((item) => {
          const backdropUrl = `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`;
          const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
          const title = item.title || item.name;
          const slug = createSlug(item.id, title);

          return (
            <div className="flex-[0_0_100%] relative" key={item.id}>
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{ backgroundImage: `url(${backdropUrl})` }}
              >
                <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black via-transparent to-black/30" />
              </div>

              {/* Foreground content */}
              <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-12">
                <div className="flex items-center justify-center gap-8 max-w-6xl w-full">
                  {/* Left side: text */}
                  <div className="max-w-xl text-white space-y-4 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      {title}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-3 select-text">
                      {item.overview}
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <Link
                        to={`/${item.media_type}/${slug}`}
                        className="flex items-center gap-2 px-6 py-3 bg-white/90 text-black font-semibold rounded-lg hover:bg-white transition"
                      >
                        <FaPlay /> Watch Now
                      </Link>
                      <Link
                        to={`/${item.media_type}/${slug}`}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-500/70 text-white font-semibold rounded-lg hover:bg-gray-500/90 transition"
                      >
                        <FaInfoCircle /> More Info
                      </Link>
                    </div>
                  </div>

                  {/* Right side: thumbnail */}
                  <div className="hidden md:block max-w-xs flex-shrink-0">
                    <img
                      src={posterUrl}
                      alt={title}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {trending.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index
                ? "!bg-white"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
