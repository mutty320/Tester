import React from 'react'
import styled from 'styled-components';

import ExitButton from './ExitButton';

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
        { children }
    </Container>
  )
}

export default ControlOverlay