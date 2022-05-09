import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

// component imports
import { Camera, EmptyCamera } from "../Camera";
import PageArrows from '../PageArrows';
import SingleView from './SingleView';
import { LayoutSize } from '../Grid';

// hid controller library
import { start, Mapper, ACTION } from '../../Hid';

// context imports
import { KeyCode, MouseMove, SelectedCamera } from '../../contexts'

const Row = styled.div`

`;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

function mapNumber(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

const LayoutManager = ({
    camerasGrid,
    currLayout,
    setSingleView,
    setAmountVisibility,
}) => {

  const [defaultHoverDisabled, setDefaultHoverDisabled] = useState();
  const [lastDirection, setLastDirection] = useState(null);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [hoverId, setHoverId] = useState();
  const [actualHoverId, setActualHoverId] = useState();
  const [camerasList, setCamerasList] = useState([]);
  const [visibleListLength, setVisibleListLength] = useState();
  const [showSingleView, setShowSingleView] = useState();
  const [playBackEvent, setPlayBackEvent] = useState();

  const { cameraId, setCamera } = SelectedCamera.useContainer();
  
  useEffect(() => {
    const map = new Mapper();

    map.register(ACTION.BUTTONS.FIRST, () => {
        console.log("YAY! WORKING! First");
        // close single view
        setCamera(-1);
    });
    map.register(ACTION.BUTTONS.SECOND, () => {
        console.log("YAY! WORKING! SECOND");
        setPlayBackEvent({ type: "SECOND" });
    });
    map.register(ACTION.BUTTONS.THIRD, () => {
        console.log("YAY! WORKING! THIRD");
    });
    map.register(ACTION.BUTTONS.FOURTH, () => {
        console.log("YAY! WORKING! FOURTH");
    });
    map.register(ACTION.BUTTONS.FIFTH, () => {
        console.log("YAY! WORKING! FIFTH");
    });
    map.register(ACTION.BUTTONS.SIXTH, () => {
        console.log("YAY! WORKING! SIXTH");
    });
    map.register(ACTION.BUTTONS.SEVENTH, () => {
        console.log("YAY! WORKING! SEVENTH");
    });
    map.register(ACTION.BUTTONS.EIGHTH, () => {
        console.log("YAY! WORKING! EIGHTH");
    });
    map.register(ACTION.BUTTONS.NINTH, () => {
        console.log("YAY! WORKING! NINTH");
    });
    map.register(ACTION.BUTTONS.TENTH, () => {
        console.log("YAY! WORKING! TENTH");
    });
    map.register(ACTION.BUTTONS.RIGHT_BUTTON_ON_STICK, () => {
        console.log("RIGHT_BUTTON_ON_STICK");
        setPlayBackEvent({ type: "RIGHT_BUTTON_ON_STICK" });
        // close single view
        // setCamera(-1);
        console.log("RIGHT_BUTTON_ON_STICK")
    });
    map.register(ACTION.BUTTONS.LEFT_BUTTON_ON_STICK, () => {
        console.log("LEFT_BUTTON_ON_STICK");
        setPlayBackEvent({ type: "LEFT_BUTTON_ON_STICK" });
        // select video
        setCamera(hoverId)
    });
    map.register(ACTION.MOVEMENT.ROTATE_RIGHT, () => {
        console.log("ROTATE_RIGHT");
        setPlayBackEvent({type: "ROTATE_RIGHT", value: map.value});
        // setCamera(hoverId);
    });
    map.register(ACTION.MOVEMENT.ROTATE_LEFT, () => {
        console.log("ROTATE_LEFT");
        setPlayBackEvent({type: "ROTATE_LEFT", value: map.value});
    });
    map.register(ACTION.MOVEMENT.FRONT, () => {
      navigate("up", map.value);
      setPlayBackEvent({type: "up", value: map.value});
      // console.log(map.value);
    });
    map.register(ACTION.MOVEMENT.BACK, () => {
      // console.log(map.value);
      navigate("down", map.value);
      setPlayBackEvent({type: "down", value: map.value});
    });
    map.register(ACTION.MOVEMENT.RIGHT, () => {
      // console.log(map.value);
      navigate("right", map.value);
      setPlayBackEvent({type: "right", value: map.value});
    });
    map.register(ACTION.MOVEMENT.LEFT, () => {
      // console.log(map.value);
      navigate("left", map.value);
      setPlayBackEvent({type: "left", value: map.value});
    });
    map.register(ACTION.NOTHING, () => {
      setLastDirection(null);
      setLastMoveTime(0);
    });

    start(map);
  }, [hoverId])

  const { mouseTrigger } = MouseMove.useContainer();

  useEffect(() => {
    setDefaultHoverDisabled(false);
  }, [mouseTrigger])

  const navigate = (direction, value, keyboard=false) => {
    setDefaultHoverDisabled(true);  // disable mouse hover (since when calling this function were using the keyboard to navigate)

    // if hoverId undefined then current hover = 1 (or page item: 1)
    let currentHoverId = hoverId; // avoiding set state async
    if (!hoverId) {
      currentHoverId = 1;
    }

    
    if (!keyboard) { // indicating that navigate was called by controller
      if (direction === lastDirection && (!value || value <= 100)) {
        return
      }
      
      if (lastMoveTime && Date.now() - lastMoveTime < mapNumber(value, 0, 255, 350, 150)) {
        return;
      }
      
      setLastDirection(direction);
      setLastMoveTime(Date.now());
    }

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
    if (result > 0 && result <= visibleListLength) { // based on visible length
      setHoverId(result);
    }
  };
  
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

    // reset which camera is hovered only if hover id does not exist in current layout
    if (hoverId > currLayout) {
      setHoverId(1);
    } else {
      setHovered(hoverId);
    }

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
      case 'ArrowUp': navigate('up', null, true);
        break;
      case 'ArrowDown': navigate('down', null, true);
        break;
      case 'ArrowLeft': navigate('left', null, true);
        break;
      case 'ArrowRight': navigate('right', null, true);
        break;
      case '2':
        setAmountVisibility(LayoutSize._2x2, true)
        break;
      case '3':
        setAmountVisibility(LayoutSize._3x3, true)
        break;
      case '4':
        setAmountVisibility(LayoutSize._4x4, true)
        break;
      default:
        console.log('not an arrow key')
    }

    if (keyCode === 'e') { // enable
      setDefaultHoverDisabled(false);
    }
  }, [trigger])

  const getCamera = (id) => {
    let cameraMatch;
    camerasList.forEach((camera) => {
      if (camera.id === id) {
        cameraMatch = camera;
      }
    });
    return cameraMatch;
  }

  useEffect(() => {
    // if the camera id is set
    if (cameraId !== -1 && cameraId) {
      setShowSingleView(true);      
    } else {
      setShowSingleView(false);
    }
  }, [cameraId])

  useEffect(() => {
    setSingleView(showSingleView)
  }, [showSingleView])

  useEffect(() => {
    setHovered(hoverId)
  }, [hoverId])

  useEffect(() => {
    if (!defaultHoverDisabled) {
      setHoverId(actualHoverId)
    }
  }, [actualHoverId, defaultHoverDisabled])

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
                    setActualHoverId(camera.id)
                  }}
                >
                    <Camera
                      camera={camera}
                      selectControl
                      defaultPlay
                      onClick={() => {
                        setCamera(camera.id)
                      }}
                    />
                </div>
            )
        )
    };

  return (
      <>
          { showSingleView ? (
              <SingleView
                camera={getCamera(cameraId)}
                event={playBackEvent}
              />
          ) : (
              <Container>
                  <PageArrows onSubmit={() => console.log("Left clicked")} />
                  <Row className="row">
                    {
                      buildLayoutView()
                    }
                  </Row>
                  <PageArrows
                      onSubmit={() => console.log("Right clicked")}
                      right
                  />
              </Container>
          )}
      </>
  );
}

export default LayoutManager