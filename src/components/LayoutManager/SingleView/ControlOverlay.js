import React from 'react'
import styled from 'styled-components';

import ExitButton from './ExitButton';
import VideoControls from './VideoControls';

const Container = styled.div`
    position: relative;
`;

const ControlOverlay = ({
    children,
    onClose,
}) => {
  return (
    <Container>
        <ExitButton
            onSubmit={() =>onClose()}
        />
        <VideoControls />
        { children }
    </Container>
  )
}

export default ControlOverlay