import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    /* border: 1px solid ${({active}) => active ? 'green' : 'blue' }; */
    margin: 5px;
    /* padding: 5px; */
    /* border-radius: 6px; */

    &:hover {
        cursor: pointer;
    }
`;

const Title = styled.div`

`;

const Image = styled.img`
  width: ${({width}) => width || '50' }px;
  ${({active}) => active && 'filter: opacity(0.5);'};
`;

const Button = ({
    title,
    svg,
    onSubmit,
    width,
    active,
}) => {
  return (
    <Container onClick={onSubmit}>
        {
          svg ?
            <Image active={active} src={svg} alt='screen layout' width={width} />
          :
            <Title>{title}</Title>
        }
    </Container>
  )
}

export default Button