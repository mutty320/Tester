import React from 'react';
import styled from 'styled-components';
import ArrowIcon from './ArrowIcon';
import ButtonLabel from './ButtonLabel';

import Rotate_Right from '../../../assets/svg/ReferenceArrows/Rotate_Right.svg';
import Rotate_Left from '../../../assets/svg/ReferenceArrows/Rotate_Left.svg';
import { VideoRef } from '../../../contexts';

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
`;

const ControllerButton = (id) => {
  return <ButtonContainer></ButtonContainer>;
};

const ControllerReference = () => {
  const { panMode } = VideoRef.useContainer();
  return (
    <Container>
      {panMode && (
        <>
          <ButtonLabel label="Zoom+" top="0" left="158" />
          <ButtonLabel label="Zoom-" top="0" left="-10" />

          <ButtonLabel label="Up" top="23" left="87" />
          <ButtonLabel label="Down" top="120" left="79" />
        </>
      )}
      <ButtonLabel label={panMode ? "Right" : "Seek +"} top="48" left="162" />
      <ButtonLabel label={panMode ? "Left" : "Seek -" } top="48" left={panMode ? "4" : "-6"} />
      <ButtonLabel label="View 2x2" top="168" left="4" />
      <ButtonLabel label="View 3x3" top="193" left="4" />
      <ButtonLabel label="View 4x4" top="218" left="4" />
      <ButtonLabel
        label="Play/Pause, Select"
        top="122"
        left="-14"
        maxWidth={74}
      />
      <ButtonLabel
        label="Click: Toggle Mode, Double Click: Exit Single View"
        top="122"
        left="144"
        maxWidth={124}
      />
      <ArrowIcon
        top="22"
        left="124"
        svg={Rotate_Right}
        // Rotate Right
      />
      <ArrowIcon
        top="22"
        left="40"
        svg={Rotate_Left}
        // Rotate Left
      />
      <ArrowIcon
        top="7"
        left="88"
        dir="up"
        // Up
      />
      <ArrowIcon
        top="132"
        left="88"
        dir="down"
        // Down
      />
      <ArrowIcon
        top="70"
        left="151"
        dir="right"
        // Right
      />
      <ArrowIcon
        top="70"
        left="25"
        dir="left"
        // Left
      />
      <ArrowIcon
        top="105"
        left="110"
        rotation='45deg'
        line
        // right joystick button line
      />
      <ArrowIcon
        top="105"
        left="50"
        rotation='315deg'
        line
        // Left joystick button line
      />
      <Background>
        <JoyStickOutline>
          <JoyStick>
            <LeftButton />
            <RightButton />
          </JoyStick>
        </JoyStickOutline>
        <ButtonsContainer>
          <Column>
            <ControllerButton />
            <ControllerButton />
            <ControllerButton />
            <ControllerButton />
            <ControllerButton />
          </Column>

          <Column>
            <ControllerButton />
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
