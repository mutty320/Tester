import React, { useEffect } from "react";
import styled from 'styled-components';
import ReactPlayer from "react-player";

import OverLay from './OverLay';
import KeyCode from "../../contexts/KeyCode";

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: 2px solid #181C1E;
  background: black;

  ${({hover}) => hover && `
    border-color: orange
  `};


  ${({selectControl}) => selectControl && `
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

  useEffect(() => {
    if (selectControl) {
      switch (keyCode) {
        case 'Enter':
          onClick();
          break;
      
        default:
          break;
      }
    } else if (onClose) { // single view
      if (keyCode === 'Escape') {
        onClose();
      }
    }
  }, [trigger])

  return (
    <>
      {
        camera && 
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
            <ReactPlayer
              config={{
                file: {
                  attributes: {
                    style: {
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    },
                  },
                },
              }}
              width='100%'
              height='100%'
              controls={controls}
              url={camera.url}
              type="video/mp4"
              muted={defaultPlay}
              // playing={defaultPlay}
            />
          </OverLay>
        </Container>
      }
    </>
  );
};

export default Camera;
