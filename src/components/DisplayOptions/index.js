import React from 'react'
import styled from 'styled-components';
import Button from './Button';
import { LayoutSize } from '../Grid';

import _2x2_svg from '../../assets/svg/_2x2.svg';
import _3x3_svg from '../../assets/svg/_3x3.svg';
import _4x4_svg from '../../assets/svg/_4x4.svg';

const Container = styled.div`
    border: 1px solid black;
    display: flex;
    justify-content: center;
`;

const DisplayOptions = ({
  onSubmit,
  currLayout,
}) => {
  return (
    <Container>
        <Button
          svg={_2x2_svg}
          onSubmit={() => onSubmit(LayoutSize._2x2, true)}
          active={currLayout === LayoutSize._2x2}
        />
        <Button
          svg={_3x3_svg}
          onSubmit={() => onSubmit(LayoutSize._3x3, true)}
          width='53'
          active={currLayout === LayoutSize._3x3}
        />
        <Button
          svg={_4x4_svg}
          onSubmit={() => onSubmit(LayoutSize._4x4, true)}
          width='52'
          active={currLayout === LayoutSize._4x4}
        />
    </Container>
  )
}

export default DisplayOptions