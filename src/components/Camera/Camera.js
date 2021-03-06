import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  ZoomableVideo,
  Zoomable,
} from 'react-zoomable-media-modified';

import OverLay from './OverLay';
import Video from './Video';

import { KeyCode, VideoRef } from '../../contexts';

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: 2px solid #181c1e;
  background: black;
  
  ${({ hover, controls }) =>
  /* Don't show hovered if in single view (controls) */
  hover && !controls &&
  `
  border-color: orange
  `};

  ${({ selectControl }) =>
    selectControl &&
    `
    &:hover {
        cursor: pointer;
    }
  `}
`;

const Camera = ({
  camera,
  controls,
  selectControl, // for clicking / selecting camera to show single view
  onClick,
  onClose,
  defaultPlay,
  event,
}) => {
  const { keyCode, trigger } = KeyCode.useContainer();
  const { setVideoRef } = VideoRef.useContainer();

  const ref = useRef();

  useEffect(() => {
    if(ref)
      setVideoRef(ref);
  }, [ref, setVideoRef]);

  useEffect(() => {
    if (selectControl) {
      switch (keyCode) {
        case 'Enter':
          onClick();
          break;

        default:
          break;
      }
    } else if (onClose) {
      // single view
      if (keyCode === 'Escape') {
        onClose();
      }
    }
  }, [trigger]);

  return (
    <>
      {camera && (
        <Container
          hover={camera.hover}
          controls={controls}
          selectControl={selectControl}
          onClick={() => {
            if (selectControl) {
              onClick();
            }
          }}
        >
          <OverLay>
            {controls ? (
              <Zoomable
                enable
                maxZoom={6}
                moveStep={10}
                wheelZoomRatio={1}
                zoomStep={0.5}
              >
                <ZoomableVideo
                  render={({ onMediaReady }) => (
                    <Video
                      ref={ref}
                      onLoadedMetadata={() => onMediaReady(ref)}
                      // controls={controls}
                      url={camera.url}
                      defaultPlay={defaultPlay}
                      event={event}
                    />
                  )}
                />
              </Zoomable>
            ) : (
              <Video
                url={camera.url}
                defaultPlay={defaultPlay}
              />
            )}
          </OverLay>
        </Container>
      )}
    </>
  );
};

export default Camera;
