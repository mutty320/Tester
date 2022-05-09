import { useState } from 'react';
import { createContainer } from 'unstated-next';

const VideoRef = () => {
  const [videoRef, setVideoRef] = useState();
  const [panMode, setPanMode] = useState();
  const [videoPlaying, setVideoPlaying] = useState();

  const togglePlay = () => {
    if (videoPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  return {
    videoRef,
    setVideoRef,
    panMode,
    setPanMode,

    playVideo,
    pauseVideo,
    togglePlay,
    videoPlaying
  };
};

export default createContainer(VideoRef);
