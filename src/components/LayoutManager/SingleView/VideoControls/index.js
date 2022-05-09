import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';

import { VideoRef, KeyCode } from '../../../../contexts';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  position: absolute;
  color: white;
  bottom: 0;
  width: 100%;
  text-align: center;
  z-index: 10;
  padding-bottom: 40px;
`;

// const Align = styled.div`

// `;

const PlayIcon = styled(PlayArrowIcon)`
  :hover {
    cursor: pointer;
  }
`;

const PauseIconStyled = styled(PauseIcon)`
  :hover {
    cursor: pointer;
  }
`;

const FastForwardIconStyled = styled(FastForwardIcon)`
  :hover {
    cursor: pointer;
  }
`;

const FastRewindIconStyled = styled(FastRewindIcon)`
  :hover {
    cursor: pointer;
  }
`;

const VideoControls = () => {
  const {
    videoRef,
    playVideo,
    pauseVideo,
    togglePlay,
    videoPlaying } = VideoRef.useContainer();
  const { keyCode, trigger } = KeyCode.useContainer();

  const [videoTime, setVideoTime] = useState();

  useEffect(() => {
    switch (keyCode) {
      case 'ArrowRight':
        handleFastForward();
        break;
      case 'ArrowLeft':
        handleFastRewind();
        break;
      case ' ':
        togglePlay();
        break;
      default:
        break;
    }
  }, [trigger]);

  useEffect(() => {
    if (videoRef.current) {
      setVideoTime(videoRef.current.currentTime);
    }
  }, [videoRef.current?.currentTime, videoRef]);


  const handleFastRewind = () => {
    videoRef.current.currentTime -= 5;
  };

  const handleFastForward = () => {
    if (videoRef.current.duration < videoRef.current.currentTime + 5) {
      videoRef.current.currentTime = videoRef.current.duration - .1; // There was a weird issue not showing the last frame of the video.
    } else {
      videoRef.current.currentTime += 5;
    }
  };

  return (
    <Container>
      <FastRewindIconStyled onClick={handleFastRewind} />
      {videoPlaying ? (
        <PauseIconStyled onClick={pauseVideo} />
      ) : (
        <PlayIcon onClick={playVideo} />
      )}
      <FastForwardIconStyled onClick={handleFastForward} />
      <div>{videoTime && parseInt(videoTime)}</div>
    </Container>
  );
};

export default VideoControls;
