import React, {
  forwardRef,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { zoomableContext } from 'react-zoomable-media';
import styled from 'styled-components';
import { SelectedCamera, VideoRef } from '../../../contexts';

const VideoElement = styled.video`
  object-fit: cover;
  width: 100%;
`;

const Video = forwardRef(
  ({ controls, url, onLoadedMetadata, defaultPlay, event }, ref) => {
    const context = useContext(zoomableContext);
    const { videoRef, panMode, setPanMode, togglePlay } = VideoRef.useContainer();

    const [initialClick, setInitialClick] = useState(); // time of initialClick
    const { setCamera } = SelectedCamera.useContainer();

    useEffect(() => {
      // by default pan mode is off
      setPanMode(false);
    }, [setPanMode]);

    useEffect(() => {
      if (event) {

        switch (event.type) {
          case 'SECOND':
            // toggle pan mode
            setPanMode(prev => !prev);
            break;
          case 'LEFT_BUTTON_ON_STICK':
            // toggle video play
            togglePlay();
            break;
          case 'RIGHT_BUTTON_ON_STICK':

            // toggle pan mode
            setPanMode(prev => !prev);

            // if initial click has a value
            if (initialClick) {
              // check if the second click is within 50 -> 500 milliseconds
              const currentTime = Date.now();
              const timeElapsed = currentTime - initialClick;
              console.log('current time: ' + currentTime + ', timeElapsed: ' + timeElapsed)
              if (timeElapsed > 50 && timeElapsed <= 500 ) {
                // close single view
                setCamera(-1);
              } else {
                // reset
                setInitialClick();
              }
            } else {
              setInitialClick(Date.now())
            }
            break;
          default:
            break;
        }

        if (!panMode) {
          switch (event.type) {
            case 'right':
              if (videoRef.current)
                videoRef.current.currentTime += event.value/1000;
              break;
            case 'left':
              if (videoRef.current)
                videoRef.current.currentTime -= event.value/1000;
              break;
            default:
              break;
          }
        } else {
          switch (event.type) {
            case 'up':
              context.panContent('up');
              break;
            case 'down':
              context.panContent('down');
              break;
            case 'right':
              context.panContent('right');
              break;
            case 'left':
              context.panContent('left');
              break;
            case 'ROTATE_RIGHT':
              context.zoomIn();
              break;
            case 'ROTATE_LEFT':
              context.zoomOut();
              break;
            default:
              break;
          }
        }
      }
    }, [event]);

    return (
      <VideoElement
        ref={ref}
        onLoadedMetadata={onLoadedMetadata}
        controls={controls}
        src={url}
      />
    );
  }
);

export default Video;
