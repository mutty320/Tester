import ReactPlayer from "react-player";
import React from "react";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: 2px solid #181C1E;
  background: black;

  ${({defaultHoverDisabled}) => !defaultHoverDisabled ?
  `
    &:hover {
      border: 2px solid orange;
    }
  ` : ''
  }
`;

const Camera = ({
  camera,
  hover,
  defaultHoverDisabled,
}) => {
  return (
    <Container
      hover={hover}
      defaultHoverDisabled={defaultHoverDisabled}
    >
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
        controls
        url={camera.url}
        type="video/mp4"
      />
    </Container>
  );
};

export default Camera;
