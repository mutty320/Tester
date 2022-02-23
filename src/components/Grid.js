// import ReactPlayer from "react-player";
import React, { useState, useEffect } from "react";
// import { BsFillGrid3X3GapFill, BsGridFill } from "react-icons/bs";

// import { MdOutlineGrid4X4 } from "react-icons/md";

import { FaForward, FaBackward, FaPlay, FaPause } from "react-icons/fa";
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


  // const setAmountVisibility = (amount, visibility) => {
  //   setCurrLayout(amount);
  //   const tempCameras = [];
  //   for (let index = 0; index < camerasGrid.length; index++) {
  //     const element = camerasGrid[index];
  //     element.visibility = index <= amount - 1 ? visibility : !visibility;

  //     tempCameras.push(element);
  //   }
  //   setCamerasGrid(tempCameras);
  // };

  const setAmountVisibility = (amount, visibility) => {
    setCurrLayout(amount);
    //currLayout = amount;
    // setLargestLayout((prevlLayout) => {
    //   return Math.max(prevlLayout, amount);
    // });
    // console.log(largestLayout);

    const tempLargestLayout = Math.min(Math.max(largestLayout, amount), camerasGrid.length) // largestLayout cannot be greater than total cameras
    
    setCamerasGrid((prevVisibility) => {
      const tempCameras = prevVisibility;
      
      for (let index = 0; index < tempLargestLayout; index++) {
        let element = camerasGrid[index];
        element.visibility = index <= amount - 1 ? visibility : !visibility;
        
        tempCameras[index] = element;
      }
      
      return tempCameras;
    });

    setLargestLayout(tempLargestLayout);
  };

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

  return (
    <div>
      <LayoutManager
        camerasGrid={camerasGrid}
        currLayout={currLayout}
      />
      <div className="row">
        <div
          className="btn-toolbar mb-3"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary">
              <FaBackward size="2em" color="black" />
            </button>
            <button type="button" className="btn btn-secondary">
              <FaPlay size="2em" color="black" />
            </button>
            <button type="button" className="btn btn-secondary">
              <FaPause size="2em" color="black" />
            </button>
            <button type="button" className="btn btn-secondary">
              <FaForward size="2em" color="black" />
            </button>
          </div>
        </div>
        <DisplayOptions
          onSubmit={setAmountVisibility}
          currLayout={currLayout}
        />
        {/* <div
          className="btn-toolbar mb-3"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAmountVisibility(LayoutSize._2x2, true)}
            >
              <BsGridFill size="2em" color="red" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAmountVisibility(LayoutSize._3x3, true)}
            >
              <BsFillGrid3X3GapFill size="2em" color="blue" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAmountVisibility(LayoutSize._4x4, true)}
            >
              <MdOutlineGrid4X4 size="2em" color="#310080" />
            </button>
          </div>
        </div>*/}
      </div> 
    </div>
  );
};

export default Grid;
