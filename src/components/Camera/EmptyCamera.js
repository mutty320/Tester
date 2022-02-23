import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    aspect-ratio: 2/1.2;
    background: #343434;
    border: 1px solid #181C1E;
    color: #737373;
    padding: 5px;
`;

const EmptyCamera = ({
    classNameProp,
}) => {
  return (
    <Container className={classNameProp}>EmptyCamera</Container>
  )
}

export default EmptyCamera