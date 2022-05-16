import React from 'react';
import styled from 'styled-components';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Container = styled.div`
  position: relative;
`;

const getRotation = (dir) => {
  switch (dir) {
    case 'up':
      return 180;
    case 'right':
      return 270;
    case 'left':
      return 90;
    default: // down
      return 0;
  }
};

const ArrowSvg = styled.img`
  /* position: absolute;
  ${({ $top }) => $top && `top: ${$top}px`};
  ${({ $left }) => $left && `left: ${$left}px`}; */
`;

const Arrow = styled(ArrowDownwardIcon)`
  ${({ dir }) => dir && `transform: rotate(${getRotation(dir)}deg);`};
`;

const Position = styled.div`
  position: absolute;
  ${({ $top }) => $top && `top: ${$top}px`};
  ${({ $left }) => $left && `left: ${$left}px`};
`;

const Line = styled.div`
  width: 40px;
  height: 2px;
  background: black;

  ${({ rotation }) => rotation && `transform: rotate(${rotation})`};
`;

const getType = (type) => {
  switch (type) {
    case 'line':
      
      break;
    case 'value':

      break;
    default:
      break;
  }
};

const ArrowIcon = ({ top, left, dir, svg, line, rotation }) => {
  return (
    <Container>
      <Position $top={top} $left={left}>
        {line ? (
          <Line rotation={rotation} />
        ) : svg ? (
          <ArrowSvg src={svg} />
        ) : (
          <Arrow dir={dir} />
        )}
      </Position>
    </Container>
  );
};

export default ArrowIcon;
