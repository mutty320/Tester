import React from 'react'
import styled from 'styled-components';
import { useDeviceConnection } from '../../../contexts';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ConnectionText = styled.div`

`;

const ConnectionIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: ${({$deviceConnected}) => $deviceConnected ? '#03BE15' : 'gray' };
  border-radius: 6px;
`;

const ConnectionLabel = () => {
  const { deviceConnected } = useDeviceConnection.useContainer();
  return (
    <Container>
      <ConnectionIndicator
        $deviceConnected={deviceConnected}
      />
      <ConnectionText>
        Connection
      </ConnectionText>
    </Container>
  )
}

export default ConnectionLabel