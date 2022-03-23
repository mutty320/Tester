import React, { useEffect } from 'react'
import styled from 'styled-components';

import SelectedCamera from '../../../contexts/SelectedCamera';

import { Camera } from "../../Camera";
import ControlOverlay from './ControlOverlay';

const Container = styled.div`
    width: 60rem;
`;

const SingleView = ({
    camera,
    event,
}) => {
  const { setCamera } = SelectedCamera.useContainer();

  const closeView = () => {
    setCamera(-1) // in order to show layout view.
  }

    useEffect(() => {
        console.log(camera);
    }, [camera])
  return (
    <Container>
        <ControlOverlay
            onClose={() => closeView()} 
        >
            <Camera
                camera={camera}
                controls
                onClose={closeView}
                event={event}
            />
        </ControlOverlay>
    </Container>
  )
}

export default SingleView


