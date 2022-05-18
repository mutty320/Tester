import React from 'react'
import styled from 'styled-components';
import ControlledTreeView from './ControlledTreeView';

const Container = styled.div`

`;

const LeftView = ({ 
  cameraGroups
}) => {
  return (
    <Container>
      <ControlledTreeView 
        cameraGroups={cameraGroups}
      />
    </Container>
  )
}

export default LeftView;
