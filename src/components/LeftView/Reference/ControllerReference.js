import React from 'react';
import styled from 'styled-components';
import ArrowIcon from './ArrowIcon';
import ButtonLabel from './ButtonLabel';

import RotateRight from '../../../assets/svg/ReferenceArrows/RotateRight';
import RotateLeft from '../../../assets/svg/ReferenceArrows/RotateLeft';
import { Controller, VideoRef } from '../../../contexts';

const Container = styled.div``;

const Background = styled.div`
  width: 200px;
  height: 320px;
  background: #c4c4c4;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const JoyStickOutline = styled.div`
  width: 110px;
  height: 110px;
  border: 1px solid;
  margin: 0 auto;
  border-radius: 60px;
  display: flex;
`;

const JoyStick = styled.div`
  height: 50%;
  width: 50%;
  margin: auto;
  border: 1px solid;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const JoyStickButtons = styled.div`
  width: 24%;
  height: 40%;
  border: 1px solid;
  border-radius: 20px;

  ${({ highlight }) => highlight && 'background: #59afff'};
`;

const LeftButton = styled(JoyStickButtons)`
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
`;

const RightButton = styled(JoyStickButtons)`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const ButtonsContainer = styled.div`
  width: 60px;
  height: 130px;
  border: 1px solid;
  margin: 0 auto;
  border-radius: 12px;
  display: flex;
  justify-content: space-evenly;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ButtonContainer = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid;
  border-radius: 12px;

  ${({ highlight }) => highlight && 'background: #59afff'};
`;

const ControllerButton = ({ highlight }) => {
  return <ButtonContainer highlight={highlight}></ButtonContainer>;
};

const ControllerReference = () => {
  const { panMode } = VideoRef.useContainer();
  const { registeredAction } = Controller.useContainer();
  return (
    <Container>
      {panMode && (
        <>
          <ButtonLabel label="Zoom+" top="0" left="158" highlight={registeredAction === 'rotate_right'} />
          <ButtonLabel label="Zoom-" top="0" left="-10" highlight={registeredAction === 'rotate_left'} />

          <ButtonLabel label="Up" top="23" left="87" highlight={registeredAction === 'up'} />
          <ButtonLabel label="Down" top="120" left="79" highlight={registeredAction === 'down'}/>
        </>
      )}
      <ButtonLabel
        label={panMode ? 'Right' : 'Seek +'}
        top="48"
        left="162"
        highlight={registeredAction === 'right'}
      />
      <ButtonLabel
        label={panMode ? 'Left' : 'Seek -'}
        top="48"
        left={panMode ? '4' : '-6'}
        highlight={registeredAction === 'left'}
      />
      <ButtonLabel label="View 2x2" top="168" left="4" highlight={registeredAction === '1'}/>
      <ButtonLabel label="View 3x3" top="193" left="4" highlight={registeredAction === '3'} />
      <ButtonLabel label="View 4x4" top="218" left="4" highlight={registeredAction === '5'} />
      <ButtonLabel
        label="Play/Pause, Select"
        top="122"
        left="-14"
        maxWidth={74}
        highlight={registeredAction === 'LEFT_BUTTON_ON_STICK'}
      />
      <ButtonLabel
        label="Click: Toggle Mode, Double Click: Exit Single View"
        top="122"
        left="144"
        maxWidth={124}
        highlight={registeredAction === 'RIGHT_BUTTON_ON_STICK'}
        click
      />
      <ButtonLabel
        label="Switch active view"
        top="196"
        left="144"
        maxWidth={74}
        highlight={registeredAction === '2'}
        click
      />
      <ArrowIcon
        top="22"
        left="124"
        // Rotate Right
      >
        <RotateRight fill={registeredAction === 'rotate_right' ? "#59afff" : 'black'} />
      </ArrowIcon>
      <ArrowIcon
        top="22"
        left="40"
        // Rotate Left
      >
        <RotateLeft fill={registeredAction === 'rotate_left' ? "#59afff" : 'black'} />
      </ArrowIcon>
      <ArrowIcon
        top="7"
        left="88"
        dir="up"
        highlight={registeredAction === 'up'}
        // Up
      />
      <ArrowIcon
        top="132"
        left="88"
        dir="down"
        highlight={registeredAction === 'down'}
        // Down
      />
      <ArrowIcon
        top="70"
        left="151"
        dir="right"
        highlight={registeredAction === 'right'}
        // Right
      />
      <ArrowIcon
        top="70"
        left="25"
        dir="left"
        highlight={registeredAction === 'left'}
        // Left
      />
      <ArrowIcon
        top="105"
        left="110"
        rotation="45deg"
        line
        // right joystick button line
      />
      <ArrowIcon
        top="105"
        left="50"
        rotation="315deg"
        line
        // Left joystick button line
      />
      <ArrowIcon
        top="195"
        left="122"
        rotation="33deg"
        line
        // Switch active view line
      />
      <Background>
        <JoyStickOutline>
          <JoyStick>
            <LeftButton highlight={registeredAction === 'LEFT_BUTTON_ON_STICK'}/>
            <RightButton highlight={registeredAction === 'RIGHT_BUTTON_ON_STICK'} />
          </JoyStick>
        </JoyStickOutline>
        <ButtonsContainer>
          <Column>
            <ControllerButton highlight={registeredAction === '1'} />
            <ControllerButton highlight={registeredAction === '3'}/>
            <ControllerButton highlight={registeredAction === '5'}/>
            <ControllerButton />
            <ControllerButton />
          </Column>

          <Column>
            <ControllerButton highlight={registeredAction === '2'} />
            <ControllerButton />
            <ControllerButton />
            <ControllerButton />
            <ControllerButton />
          </Column>
        </ButtonsContainer>
      </Background>
    </Container>
  );
};

export default ControllerReference;
