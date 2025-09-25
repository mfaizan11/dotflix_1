import React from "react";

const RatingBadge = ({ rating }) => {
  // We don't want to show the badge if the rating is 0 or not available
  if (!rating || rating === 0) {
    return null;
  }

  // Format rating to one decimal place, e.g., 7.7
  const ratingFormatted = rating.toFixed(1);

  // SVG circle properties
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  // Calculate the progress offset
  const offset = circumference - (rating / 10) * circumference;

  // Determine the color of the ring based on the rating value
  const getRingColor = () => {
    if (rating >= 7) return "stroke-green-500"; // Good
    if (rating >= 5) return "stroke-yellow-500"; // Average
    return "stroke-red-500"; // Bad
  };

  return (
    <div
      className="absolute bottom-2 left-2 w-10 h-10 z-10"
      title={`Rating: ${ratingFormatted}`}
    >
      <svg className="w-full h-full" viewBox="0 0 50 50">
        {/* Background of the circle */}
        <circle
          className="stroke-transparent"
          cx="25"
          cy="25"
          r={radius}
          strokeWidth="5"
          fill="rgba(0, 0, 0, 0.8)"
        />
        {/* Progress ring */}
        <circle
          className={`transform -rotate-90 origin-center ${getRingColor()}`}
          cx="25"
          cy="25"
          r={radius}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {/* Text in the center */}
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
        {ratingFormatted}
      </div>
    </div>
  );
};

export default RatingBadge;
