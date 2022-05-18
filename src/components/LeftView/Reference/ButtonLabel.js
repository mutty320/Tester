import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const LabelText = styled.div`
  z-index: 1;
  position: absolute;
  border: 1px solid black;
  border-radius: 4px;
  padding: 0 4px;
  background: white;
  font-size: .8rem;

  ${({$top}) => $top && `top: ${$top}px`};
  ${({$left}) => $left && `left: ${$left}px`};
  ${({$maxWidth}) => $maxWidth && `max-width: ${$maxWidth}px`};
`;

const ButtonLabel = ({
  label,
  top,
  left,
  maxWidth
}) => {
  return (
    <Container>
      <LabelText
        $top={top}
        $left={left}
        $maxWidth={maxWidth}
      >
        { label || 'ButtonLabel' }
      </LabelText>
    </Container>
  )
}

export default ButtonLabel;
