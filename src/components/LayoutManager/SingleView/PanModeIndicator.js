import React, { useEffect } from 'react';
import styled from 'styled-components';
import { VideoRef } from '../../../contexts';

const Container = styled.div`
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 0;
  color: #3cc2ff;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`

`;

const PanModeIndicator = () => {
  const { panMode } = VideoRef.useContainer();

  useEffect(() => {}, []);

  return <Container>
    <Text>
      {panMode ? 'Pan/Zoom Mode' : 'Playback Mode'}
    </Text>
  </Container>;
};

export default PanModeIndicator;
