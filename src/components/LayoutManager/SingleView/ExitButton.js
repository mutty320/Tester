import React from 'react'
import styled from 'styled-components';

import { GrClose } from "react-icons/gr";

const Container = styled.div`
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 10px;

    &:hover {
        cursor: pointer;
    }


`;

const ExitIcon = styled(GrClose)`
    width: 30px;
    height: 30px;
    
    path {
        stroke: #dbdbdb;
    }
`;

const ExitButton = ({
    onSubmit,
}) => {
  return (
    <Container
        onClick={() => onSubmit()}
    >
        <ExitIcon />
    </Container>
  )
}

export default ExitButton