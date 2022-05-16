import React from 'react'
import styled from 'styled-components';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Container = styled.div`
  display: flex;
  padding: 2px;
  gap: 4px;
`;

const CameraIcon = styled(CameraAltIcon)`
  width: 20px !important;
`;

const Button = styled.div`
  cursor: pointer;
`;

const CameraItem = ({ 
  name,
  onSubmit,
 }) => (
  <Container>
    <CameraIcon />
    <Button
      onClick={onSubmit}
    >
      { name || "Camera"}
    </Button>
  </Container>
)

export default CameraItem