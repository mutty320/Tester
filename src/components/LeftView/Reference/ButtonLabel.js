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
  ${({highlight}) => highlight && 'transition: none !important'};
  transition: ease-in-out ${({click}) => click ? '400ms' : '200ms'};
  background: ${({highlight}) => highlight ? '#48ff54' : 'white' };
  font-size: .8rem;

  ${({$top}) => $top && `top: ${$top}px`};
  ${({$left}) => $left && `left: ${$left}px`};
  ${({$maxWidth}) => $maxWidth && `max-width: ${$maxWidth}px`};
`;

const ButtonLabel = ({
  label,
  top,
  left,
  maxWidth,
  highlight,
  click,
}) => {
  return (
    <Container>
      <LabelText
        $top={top}
        $left={left}
        $maxWidth={maxWidth}
        highlight={highlight}
        click={click}
      >
        { label || 'ButtonLabel' }
      </LabelText>
    </Container>
  )
}

export default ButtonLabel;
