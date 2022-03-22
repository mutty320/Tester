import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  ZoomableVideo,
  Zoomable,
} from 'react-zoomable-media';

import OverLay from './OverLay';
import KeyCode from '../../contexts/KeyCode';
import Video from './Video';

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: 2px solid #181c1e;
  background: black;

  ${({ hover }) =>
    hover &&
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
}) => {
  const { keyCode, trigger } = KeyCode.useContainer();
  const ref = useRef();

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
                maxZoom={4}
                moveStep={1}
                wheelZoomRatio={1}
                zoomStep={1}
              >
                <ZoomableVideo
                  render={({ onMediaReady }) => (
                    <Video
                      ref={ref}
                      onLoadedMetadata={() => onMediaReady(ref)}
                      controls={controls}
                      url={camera.url}
                      defaultPlay={defaultPlay}
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
