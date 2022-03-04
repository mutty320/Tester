import React, { useEffect } from 'react'
import styled from 'styled-components';

import { Camera } from "../../Camera";
import ControlOverlay from './ControlOverlay';

const Container = styled.div`
    width: 60rem;
`;

const SingleView = ({
    camera,
    setShowSingleView,
}) => {
    useEffect(() => {
        console.log(camera);
    }, [camera])
  return (
    <Container>
        <ControlOverlay
            onClose={() => setShowSingleView(false)}
        >
            <Camera
                camera={camera}
                controls
            />
        </ControlOverlay>
    </Container>
  )
}

export default SingleView


