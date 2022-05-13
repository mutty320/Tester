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

const Align = styled.div`
  width: 100%;
  height: 10px;
  position: absolute;
  z-index: 10;
  bottom: 20px;
  margin: 0 auto;
`;

const Timeline = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background: white;
`;

const Bar = styled.div`
  height: 100%;
  width: ${({$progress}) => $progress ? $progress : 0}%;
  background: #2e88ff;
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
    <>
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
      <Align>
        <Timeline>
          <Bar
            $progress={videoRef.current ? ((videoRef.current.currentTime/videoRef.current.duration)*100) : 0}
          >
          </Bar>
        </Timeline>
      </Align>
    </>
  );
};

export default VideoControls;
