import React, { useState } from 'react';
import styled from 'styled-components';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VideoRef from '../../../../contexts/VideoRef';

const Container = styled.div`
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

const VideoControls = () => {
  const { videoRef } = VideoRef.useContainer();
  const [videoPlaying, setVideoPlaying] = useState();

  const handlePlayVideo = () => {
    // console.log(videoRef.current);
    videoRef.current.play();
    setVideoPlaying(true);
  };

  const handlePauseVideo = () => {
    videoRef.current.pause();
    setVideoPlaying(false);
  };

  return (
    <Container>
      {videoPlaying ? (
        <PauseIconStyled onClick={handlePauseVideo} />
      ) : (
        <PlayIcon onClick={handlePlayVideo} />
      )}
    </Container>
  );
};

export default VideoControls;
