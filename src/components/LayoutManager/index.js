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
import KeyCode from '../../contexts/KeyCode';
import MouseMove from '../../contexts/MouseMove';
import SelectedCamera from '../../contexts/SelectedCamera';

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

  const { cameraId, setCamera } = SelectedCamera.useContainer();
  
  const map = new Mapper();
  useEffect(() => {

  map.register(ACTION.FIRST, () => {
      console.log("First");
  });
  map.register(ACTION.SECOND, () => {
      console.log("SECOND");
  });
  map.register(ACTION.THIRD, () => {
      console.log("THIRD");
  });
  map.register(ACTION.FOURTH, () => {
      console.log("FOURTH");
  });
  map.register(ACTION.FIFTH, () => {
      console.log("FIFTH");
  });
  map.register(ACTION.SIXTH, () => {
      console.log("SIXTH");
  });
  map.register(ACTION.SEVENTH, () => {
      console.log("SEVENTH");
  });
  map.register(ACTION.EIGHTH, () => {
      console.log("EIGHTH");
  });
  map.register(ACTION.NINTH, () => {
      console.log("NINTH");
  });
  map.register(ACTION.TENTH, () => {
      console.log("TENTH");
  });
  map.register(ACTION.RIGHT_BUTTON_ON_STICK, () => {
      console.log("RIGHT_BUTTON_ON_STICK");
  });
  map.register(ACTION.LEFT_BUTTON_ON_STICK, () => {
      console.log("LEFT_BUTTON_ON_STICK");
  });
  map.register(ACTION.ROTATE_RIGHT, () => {
      console.log("ROTATE_RIGHT");
  });
  map.register(ACTION.ROTATE_LEFT, () => {
      console.log("ROTATE_LEFT");
  });
  map.register(ACTION.FRONT, (value) => {
    navigate("up", value);
  });
  map.register(ACTION.BACK, (value) => {
    navigate("down", value);
  });
  map.register(ACTION.RIGHT, (value) => {
    navigate("right", value);
  });
  map.register(ACTION.LEFT, (value) => {
    navigate("left", value);
  });
  map.register(ACTION.NOTHING, () => {
    setLastDirection(null);
    setLastMoveTime(0);
  });

  start(map);
  }, [map])

  const { mouseTrigger } = MouseMove.useContainer();

  useEffect(() => {
    setDefaultHoverDisabled(false);
  }, [mouseTrigger])

  const navigate = (direction, value, keyboard=false) => {
    setDefaultHoverDisabled(true);  // disable mouse hover (since when calling this function were using the keyboard to navigate)

    // if hoverId undefined then current hover = 1 (or page item: 1)
    let currentHoverId = hoverId;
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
  }
  
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

    const buildLayoutView = useCallback(() => {

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
    }, [camerasList, currLayout, defaultHoverDisabled, setCamera, mouseTrigger]);

  return (
      <>
          { showSingleView ? (
              <SingleView
                camera={getCamera(cameraId)}
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