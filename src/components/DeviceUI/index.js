import React from 'react'
import reactDom from 'react-dom';
import styled from 'styled-components';
import ControlledTreeView from './ControlledTreeView';

const Container = styled.div`
  width: fit-content;
  margin: 0 auto;
  background: #ffffffe6;
  pointer-events: auto;
`;

const Align = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  padding: 5px;
  z-index: 10;
  pointer-events: none;
`;

const Title = styled.div`
  text-align: center;
`;

const DeviceUI = () => {
  return reactDom.createPortal(
    <Align>
      <Container>
        <Title>
          HID Device
        </Title>
        <ControlledTreeView />
      </Container>
    </Align>,
    document.getElementById('hid-device')
  )
}

export default DeviceUI 