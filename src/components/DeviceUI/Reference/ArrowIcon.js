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
  position: absolute;
  ${({ $top }) => $top && `top: ${$top}px`};
  ${({ $left }) => $left && `left: ${$left}px`};
`;

const Arrow = styled(ArrowDownwardIcon)`
  position: absolute;

  ${({ $top }) => $top && `top: ${$top}px`};
  ${({ $left }) => $left && `left: ${$left}px`};

  ${({ dir }) => dir && `transform: rotate(${getRotation(dir)}deg);`};
`;

const Line = styled.div`
  position: absolute;
  width: 40px;
  height: 2px;
  background: black;

  ${({ $top }) => $top && `top: ${$top}px`};
  ${({ $left }) => $left && `left: ${$left}px`};
  ${({rotation }) => rotation && `transform: rotate(${rotation})`};
`;

const ArrowIcon = ({ top, left, dir, svg, line, rotation }) => {
  return (
    <Container>
      {
        line ? (
          <Line $top={top} $left={left} rotation={rotation} />
        ) : (
          svg ? (
            <ArrowSvg $top={top} $left={left} src={svg} />
          ) : (
            <Arrow $top={top} $left={left} dir={dir} />
          )
        )
      }
    </Container>
  );
};

export default ArrowIcon;
