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
  width: 130px;
  margin: 10px;
`;

const ToggleButton = styled(Button)`
  font-size: .7rem !important;
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
          <ToggleButton variant="contained"
            onClick={() => {
              setPanMode(prev => !prev);
            }}
          >Toggle Mode</ToggleButton>
        </ToggleButtonContainer>
      </ModeContainer>
      <ControllerReference />
    </Container>
  )
}

export default Reference;
