import { Button } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import { VideoRef } from '../../../contexts';
import ControllerReference from './ControllerReference';

const Container = styled.div`

`;

const ModeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CurrentMode = styled.div`

`;

const ToggleButtonContainer = styled.div`

`;

const Reference = () => {

  const { panMode, setPanMode } = VideoRef.useContainer();

  return (
    <Container>
      <ModeContainer>
        <CurrentMode>
          {'Mode: ' + (panMode ? 'Pan/Zoom' : 'Playback')}
        </CurrentMode>
        <ToggleButtonContainer>
          <Button variant="contained"
            onClick={() => {
              setPanMode(prev => !prev);
            }}
          >Toggle Mode</Button>
        </ToggleButtonContainer>
      </ModeContainer>
      <ControllerReference />
    </Container>
  )
}

export default Reference