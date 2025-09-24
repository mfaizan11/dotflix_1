import React from "react";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      {/* You can add sections like "Popular Movies", "Top Rated Shows" etc. here */}
      <div className="p-6 md:p-12">
        {/* Example placeholder for more content */}
        <h2 className="text-2xl font-bold text-white mb-4">Discover More</h2>
        {/* Future content grids for popular/trending can be added here */}
      </div>
    </div>
  );
}

export default Home;
