import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Camera, EmptyCamera } from "../Camera";
import PageArrows from '../PageArrows';
import { start, Mapper, ACTION } from '../../Hid';
import KeyCode from '../../contexts/KeyCode';
import MouseMove from '../../contexts/MouseMove';

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

  const [defaultHoverDisabled, setDefaultHoverDisabled] = useState();
  const [hoverId, setHoverId] = useState();
  const [camerasList, setCamerasList] = useState([]);
  const [visibleListLength, setVisibleListLength] = useState();

  const { mouseTrigger, enable } = MouseMove.useContainer();

  useEffect(() => {
    setDefaultHoverDisabled(false);
  }, [mouseTrigger])

  const navigate = (direction) => {
    setDefaultHoverDisabled(true);  // disable mouse hover (since when calling this function were using the keyboard to navigate)
    enable(true); // enable mouse move
    console.log('direction: ', direction);

    let currentHoverId = hoverId;
    if (!hoverId) {
      currentHoverId = 1;
    }

    // current hover = hoverId
    // if hoverId undefined then current hover = 1 (or page item: 1)
    let result;

    switch (direction) {
      case 'up':
        result = currentHoverId - Math.sqrt(currLayout);
        break;
      case 'down':
        result = currentHoverId + Math.sqrt(currLayout);
        break;
      case 'right':
        result = currentHoverId + 1;
        break;
      case 'left':
        result = currentHoverId - 1;
        break;
      default:
        result = 0;
    }
    if (result > 0 && result <= visibleListLength) { // do it based on visible length
      setHoverId(result);
    }
    console.log(result);
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
    map.register(ACTION.FRONT, ()=>navigate('up'))
    map.register(ACTION.BACK, ()=>navigate('down'))
    map.register(ACTION.RIGHT, () => navigate('right'))
    map.register(ACTION.LEFT, () => navigate('left'))

    start(map);
    
  }, []);
  
  // get the camerasGrid from the prop
  useEffect(() => {
    setCamerasList(camerasGrid);

    // set visibility count, we want to set it also when currLayout changes
    let visibleCount = 0;
    camerasGrid.forEach(camera => {
      if (camera.visibility) {
        visibleCount++;
      }
    })
    setVisibleListLength(visibleCount);
  }, [camerasGrid, currLayout])

  const { keyCode, trigger } = KeyCode.useContainer();

  const setHovered = (id) => {
    if(id) {
      const tempCameras = camerasList.map(item => { 
        if (item.id === id) {
          return {...item, hover: true }
        } else if (item.hover) { // reset other hovers to false
          return {...item, hover: false}
        } else {
          return item
        }
      })
      setCamerasList(tempCameras);
    }
  }

  useEffect(() => {

    switch (keyCode) {
      case 'ArrowUp': navigate('up');
        break;
      case 'ArrowDown': navigate('down');
        break;
      case 'ArrowLeft': navigate('left');
        break;
      case 'ArrowRight': navigate('right');
        break;
      default:
        console.log('not an arrow key')
    }

    if (keyCode === 'e') { // enable
      setDefaultHoverDisabled(false);
    }
  }, [trigger])

  useEffect(() => {
    setHovered(hoverId)
  }, [hoverId])

    const buildLayoutView = () => {

        const visibleList = camerasList.filter(camera => camera.visibility)
        const emptyCameraList = []
        if (visibleList.length < currLayout)
        {
          // console.log('length is different. len: ', visibleList.length, 'currentLayout: ', currLayout);
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
                  onMouseOver={() => {
                    if (!defaultHoverDisabled) {
                      setHoverId(camera.id)
                    }
                  }}
                >
                    <Camera
                      camera={camera}
                    />
                </div>
            )
        )
    };

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