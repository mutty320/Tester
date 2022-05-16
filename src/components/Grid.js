// import ReactPlayer from "react-player";
import React, { useState, useEffect } from "react";
import DisplayOptions from './DisplayOptions';
import LayoutManager from './LayoutManager';

export const LayoutSize = {
  _2x2: 4,
  _3x3: 9,
  _4x4: 16,
}

const Grid = (props) => {
  const [camerasGrid, setCamerasGrid] = useState([]);
  const [largestLayout, setLargestLayout] = useState(4); //for updating the visibility property
  const [currLayout, setCurrLayout] = useState(4); //for updating the className dynamically
  const [hideDisplayOptions, setHideDisplayOptions] = useState();


  const setAmountVisibility = (amount, visibility) => {
    setCurrLayout(amount);
    const tempCameras = [];
    for (let index = 0; index < camerasGrid.length; index++) {
      const element = camerasGrid[index];
      element.visibility = index <= amount - 1 ? visibility : !visibility;

      tempCameras.push(element);
    }
    setCamerasGrid(tempCameras);
  };

  // const setAmountVisibility = (amount, visibility) => {
  //   setCurrLayout(amount);

  //   const tempLargestLayout = Math.min(Math.max(largestLayout, amount), camerasGrid.length) // largestLayout cannot be greater than total cameras
    
  //   setCamerasGrid((prevVisibility) => {
  //     const tempCameras = prevVisibility;
      
  //     for (let index = 0; index < tempLargestLayout; index++) {
  //       let element = camerasGrid[index];
  //       element.visibility = index <= amount - 1 ? visibility : !visibility;
        
  //       tempCameras[index] = element;
  //     }
      
  //     return tempCameras;
  //   });

  //   setLargestLayout(tempLargestLayout);
  // };

  useEffect(() => {
    console.log("currentLayout: ", currLayout);
  
    console.log('camerasGrid: ', camerasGrid);
  });

  useEffect(() => {
    let tempCameras = [];
    let counter = 0;
    for (let i in props.cameras) {
      for (let x in props.cameras[i].camera_items) {
        tempCameras.push({
          id: props.cameras[i].camera_items[x].id,
          width: "390px",
          //controls
          url: props.cameras[i].camera_items[x].video,
          visibility: counter < 4,
          hover: false
        });
        counter++;
      }
    }

    setCamerasGrid(tempCameras);

    console.log(camerasGrid);
  }, []);

  useEffect(() => {
    console.log(camerasGrid);
  }, [camerasGrid]);

  // const setInitialLayout = () => {
  //   let temp = [];

  //   for (let i = 0; i < initialLayout; i++) temp.push(camerasToDisplay[i]);

  //   return temp;
  // };

  // const [currArray, setGridSize] = useState(setInitialLayout()); //we will use the state for the grid size variable

  // const setGrid = (size) => {
  //   setGridSize(() => {
  //     console.log(size);

  //     let temp = [];

  //     for (let i = 0; i < size; i++) temp.push(camerasToDisplay[i]);

  //     return temp;
  //   });
  // };

  const setSingleView = (value) => { // value is true or false
    setHideDisplayOptions(value)
  }

  return (
    <>
      <div className="container">
          <LayoutManager
            camerasGrid={camerasGrid}
            currLayout={currLayout}
            setSingleView={setSingleView}
            setAmountVisibility={setAmountVisibility}
          />
      </div>
      {
        !hideDisplayOptions
        &&
        <DisplayOptions
          onSubmit={setAmountVisibility}
          currLayout={currLayout}
        />
      }
    </>
  );
};

export default Grid;
