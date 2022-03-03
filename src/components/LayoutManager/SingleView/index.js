import React, { useEffect } from 'react'
import { Camera } from "../../Camera";
import styled from 'styled-components';

const Container = styled.div`
    width: 40rem;
`;

const SingleView = ({
    camera
}) => {
    useEffect(() => {
        console.log(camera);
    }, [camera])
  return (
    <Container>
        <Camera
            camera={camera}
        />
    </Container>
  )
}

export default SingleView


