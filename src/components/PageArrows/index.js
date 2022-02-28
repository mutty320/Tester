import React from 'react'
import styled from 'styled-components';
import NavArrowSvg from '../../assets/svg/Nav_Arrow.svg';

const Container = styled.div`
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    &:hover{
        background: #a6a6a6;
    }
`;

const SvgImg = styled.img`
    height: 30px;
    ${({right}) => right && 'transform: rotate(180deg)'}
`;

const PageIndicator = styled.p`
    margin: 0;
`;

const PageArrows = ({
    onSubmit,
    right
}) => {
  return (
    <Container onClick={onSubmit}>
        <SvgImg right={right} src={NavArrowSvg} alt="navigation arrow" />
        <PageIndicator>3/3</PageIndicator>
    </Container>
  )
}

export default PageArrows