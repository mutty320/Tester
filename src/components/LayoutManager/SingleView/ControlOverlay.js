import React from 'react'
import styled from 'styled-components';
import { VideoRef } from '../../../contexts';

import ExitButton from './ExitButton';
import PanModeIndicator from './PanModeIndicator';
import VideoControls from './VideoControls';

const Container = styled.div`
    position: relative;
`;

const ControlOverlay = ({
    children,
    onClose,
}) => {
  const { panMode } = VideoRef.useContainer();

  return (
    <Container>
        <PanModeIndicator />
        <ExitButton
            onSubmit={() =>onClose()}
        />
        { !panMode && <VideoControls /> }
        { children }
    </Container>
  )
}

export default ControlOverlay