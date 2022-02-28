import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Camera, EmptyCamera } from "../Camera";
import PageArrows from '../PageArrows';
import { start, Mapper, ACTION } from '../../Hid';

const Row = styled.div`

`;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const LayoutManager = ({
    camerasGrid,
    currLayout,
}) => {

  const navigate = (direction) => {
    console.log(direction);
  }

  useEffect(() => {

    const map = new Mapper();
    
    map.register(ACTION.FIRST, ()=> {console.log("First")})
    map.register(ACTION.SECOND, ()=>{console.log("SECOND")})
    map.register(ACTION.THIRD, ()=>{console.log("THIRD")})
    map.register(ACTION.FOURTH, ()=>{console.log("FOURTH")})
    map.register(ACTION.FIFTH, ()=>{console.log("FIFTH")})
    map.register(ACTION.SIXTH, ()=>{console.log("SIXTH")})
    map.register(ACTION.SEVENTH, ()=>{console.log("SEVENTH")})
    map.register(ACTION.EIGHTH, ()=>{console.log("EIGHTH")})
    map.register(ACTION.NINTH, ()=>{console.log("NINTH")})
    map.register(ACTION.TENTH, ()=>{console.log("TENTH")})
    map.register(ACTION.RIGHT_BUTTON_ON_STICK, ()=>{console.log("RIGHT_BUTTON_ON_STICK")})
    map.register(ACTION.LEFT_BUTTON_ON_STICK, ()=>{console.log("LEFT_BUTTON_ON_STICK")})
    map.register(ACTION.ROTATE_RIGHT, ()=>{console.log("ROTATE_RIGHT")})
    map.register(ACTION.ROTATE_LEFT, ()=>{console.log("ROTATE_LEFT")})
    map.register(ACTION.FRONT, ()=>{console.log("PUSHED FRONT")})
    map.register(ACTION.BACK, ()=>{console.log("PUSHED BACK")})
    map.register(ACTION.RIGHT, () => navigate('right'))
    map.register(ACTION.LEFT, () => navigate('left'))

    start(map);
    
  }, []);

    const buildLayoutView = () => {

        const visibleList = camerasGrid.filter(camera => camera.visibility)
        const emptyCameraList = []
        if (visibleList.length < currLayout)
        {
          console.log('length is different. len: ', visibleList.length, 'currentLayout: ', currLayout);
          // append currentLayout - length amount of EmptyCameras
          for(let i = 0; i < (currLayout - visibleList.length); i++){
            emptyCameraList.push({
              id: i,
              empty: true,
            })
          }
        }

        const CameraList = [...visibleList, ...emptyCameraList]

        const className = `col-lg-${12/Math.sqrt(currLayout)}`;
        
        return CameraList.map(
            (
              camera, //camera is an object
              index,
            ) => (
              camera.empty ?
                <EmptyCamera key={index} classNameProp={className} />
              :
                <div
                className={`${className} p-0`}
                key={index}
                >
                    <Camera camera={camera} />
                </div>
            )
        )
    }

  return (
    <Container>
      <PageArrows onSubmit={() => console.log('Left clicked')} />
      <Row className="row">
          {
            buildLayoutView()
          }
      </Row>
      <PageArrows onSubmit={() => console.log('Right clicked')} right />
    </Container>
  )
}

export default LayoutManager