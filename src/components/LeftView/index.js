import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import ControlledTreeView from './ControlledTreeView';

const Container = styled.div`
  ${({highlight}) => highlight && 'border: 3px solid #31fe39'};
  transition: ease-in-out 200ms;
`;

const LeftView = ({ 
  cameraGroups
}) => {
  const [highlight, setHighlight] = useState();

  useEffect(() => {
    setTimeout(() => {
      setHighlight();
    }, 2000)
  }, [highlight])
  return (
    <Container
      highlight={highlight}
    >
      <ControlledTreeView 
        cameraGroups={cameraGroups}
        setHighlight={setHighlight}
      />
    </Container>
  )
}

export default LeftView;
