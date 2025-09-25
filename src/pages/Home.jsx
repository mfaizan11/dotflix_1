import React from "react";
import { useInView } from "react-intersection-observer";
import Hero from "../components/Hero";
import MediaRow from "../components/MediaRow";
import {
  getTrendingMedia,
  getTopRatedMovies,
  getTopRatedShows,
  getMediaByGenre,
} from "../services/tmbdApi";
import Loader from "../components/Loader";

// Modern LazyLoad component using react-intersection-observer
const LazyLoad = ({ children, height = 340, offset = 200, placeholder }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: `${offset}px 0px`,
  });

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {inView ? children : placeholder}
    </div>
  );
};

// Placeholder for lazy-loaded components
const Placeholder = () => (
  <div className="h-[340px] flex justify-center items-center">
    <Loader />
  </div>
);

function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <div className="p-6 md:p-12">
        <LazyLoad height={340} offset={200} placeholder={<Placeholder />}>
          <MediaRow title="Trending Now" fetchData={getTrendingMedia} />
        </LazyLoad>

        <LazyLoad height={340} offset={200} placeholder={<Placeholder />}>
          <MediaRow
            title="Weekly Top 10 Movies"
            fetchData={getTopRatedMovies}
            media_type="movie"
          />
        </LazyLoad>

        <LazyLoad height={340} offset={200} placeholder={<Placeholder />}>
          <MediaRow
            title="Weekly Top 10 Shows"
            fetchData={getTopRatedShows}
            media_type="tv"
          />
        </LazyLoad>

        <LazyLoad height={340} offset={200} placeholder={<Placeholder />}>
          <MediaRow
            title="Action & Adventure"
            fetchData={() => getMediaByGenre(28)}
            media_type="movie"
          />
        </LazyLoad>

        <LazyLoad height={340} offset={200} placeholder={<Placeholder />}>
          <MediaRow
            title="Comedy"
            fetchData={() => getMediaByGenre(35)}
            media_type="movie"
          />
        </LazyLoad>

        <LazyLoad height={340} offset={200} placeholder={<Placeholder />}>
          <MediaRow
            title="Sci-Fi & Fantasy"
            fetchData={() => getMediaByGenre(878)}
            media_type="movie"
          />
        </LazyLoad>
      </div>
    </div>
  );
}

export default Home;
