import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ isAudioPlaying }) => {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.play();
  //   }
  // }, [isAudioPlaying]);

  return (
  <div className="relative rounded-lg overflow-hidden sticky top-4">
    <video
      className="w-full"
      autoPlay
      loop
      muted
      key={isAudioPlaying ? "playing" : "stopped"}
      src={isAudioPlaying ? "/l2.mp4" : "/lisa.mp4"}
    />
    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-blue-500/30 to-transparent pointer-events-none" />
  </div>
);
};

export default VideoPlayer;

