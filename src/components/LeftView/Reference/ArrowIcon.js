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

`;

const Arrow = styled(ArrowDownwardIcon)`
  transition: ease-in-out 200ms;
  ${({ dir }) => dir && `transform: rotate(${getRotation(dir)}deg);`};
  ${({ highlight }) => highlight && 'color: #59afff !important;'};
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

const ArrowIcon = ({ top, left, dir, line, rotation, highlight, children }) => {
  return (
    <Container>
      <Position $top={top} $left={left}>
        {line ? (
          <Line rotation={rotation} />
        ) : children ? (
          // <ArrowSvg src={svg} />
          children
        ) : (
          <Arrow dir={dir} highlight={highlight} />
        )}
      </Position>
    </Container>
  );
};

export default ArrowIcon;
