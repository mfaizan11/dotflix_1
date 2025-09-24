import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  return (
    <div className="mt-8">
      <video
        ref={videoRef}
        id="video-player"
        controls
        autoPlay
        style={{ width: "100%", maxHeight: "500px", background: "#000" }}
      />
    </div>
  );
}

export default VideoPlayer;