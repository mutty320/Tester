import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDeviceConnection } from '../../../contexts';

const Container = styled.div``;

const ConnectionStatusContainer = styled.div`
  border: 2px solid;
  border-color: ${({$deviceConnected}) => $deviceConnected ? '#03BE15' : 'gray'};
  margin: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
`;

const ControllerTitle = styled.div``;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  background: ${({$deviceConnected}) => $deviceConnected ? '#03BE15' : 'gray' };
  border-radius: 6px;
`;

const ConnectionStatus = styled.div`
  margin-left: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const Connection = ({
  CloseView
}) => {
  const { deviceConnected, ConnectionInstance } = useDeviceConnection.useContainer();
  const [deviceStateChanged, setDeviceStateChanged] = useState();

  useEffect(() => {
    // only close Connection View (delayed) if user connected to device
    if (deviceConnected && deviceStateChanged) {
      setTimeout(() => {
        CloseView();
      }, 3000);
    }
    // device was initially disconnected when component mounted (Connection view opened)
    if (!deviceConnected) {
      setDeviceStateChanged(true);
    }
  }, [deviceConnected, CloseView, deviceStateChanged]);

  return (
    <Container>
      <ConnectionStatusContainer
        $deviceConnected={deviceConnected}
      >
        <StatusIndicator
          $deviceConnected={deviceConnected}
        />
        <ControllerTitle>Controller</ControllerTitle>
        <ConnectionStatus>{deviceConnected ? "Connected" : "Not Connected"}</ConnectionStatus>
      </ConnectionStatusContainer>
      {!deviceConnected && (
        <ButtonContainer>
          <Button variant="contained" onClick={ConnectionInstance.connect}>
            Connect
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default Connection;
