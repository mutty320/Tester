import ReactPlayer from "react-player";
import React, { useState, useEffect } from "react";
import { BsFillGrid3X3GapFill, BsGridFill } from "react-icons/bs";

import { MdOutlineGrid4X4 } from "react-icons/md";

import { FaForward, FaBackward, FaPlay, FaPause } from "react-icons/fa";
import Camera from "./Camera";

const Grid = (props) => {
  const initialLayout = 4;
  let camerasToDisplay = [];
  
  const [camerasGrid, setCamerasGrid] = useState([]);

  // camerasToDisplay.push(
  //   <Camera
  //     width={"200px"}  
  //     controls
  //     url={props.cameras[i].camera_items[x].video}
  //     type={"video/mp4"}
  //   />
  // );

  const setAmountVisibility = (amount, visibility) => {
    const tempCameras = []
    for (let index = 0; index < camerasGrid.length; index++) {
      const element = camerasGrid[index];
      element.visibility = (index <= ( amount-1 ) ? visibility : !visibility)

      tempCameras.push(element)
    }
    setCamerasGrid(tempCameras)
  }
  
  useEffect(() => {
    let tempCameras = [];
    let counter = 0;
    for (let i in props.cameras) {
      for (let x in props.cameras[i].camera_items)
      {
        tempCameras.push(
          {
            id: props.cameras[i].camera_items[x].id,
            width: '200px',
            controls: true,
            url: props.cameras[i].camera_items[x].video,
            visibility: (counter < 4),
          }
          );
          counter++;
      }
    }

    setCamerasGrid(tempCameras);  
    
    console.log(camerasGrid);
    
  }, []);

  useEffect(()=>{
    console.log(camerasGrid);
  },[camerasGrid])

  const setInitialLayout = () => {
    let temp = [];

    for (let i = 0; i < initialLayout; i++) temp.push(camerasToDisplay[i]);

    return temp;
  };

  const [currArray, setGridSize] = useState(setInitialLayout()); //we will use the state for the grid size variable

  // const p = () => { //dont use! couses an infint loop! every time u re render then the state is changed over and over
  //   setGridSize(()=>{
  //   let temp = [];

  //   for (let i = 0; i < 4; i++) temp.push(camerasToDisplay[i]);

  //   return temp})
  // };
  // p()

  const set2= (size) => {
   for(let i in camerasToDisplay)
    camerasToDisplay[i].setisVisibale(true)
  }

  const setGrid = (size) => {
    setGridSize(() => {
      console.log(size);
      let temp = [];

      for (let i = 0; i < size; i++) temp.push(camerasToDisplay[i]);

      return temp;
    });
  };

  {
    /* <li>{<ReactPlayer width="200px"controls url={camera} type="video/mp4" />}</li> */
  }

  return (
    <div>
      {camerasGrid.map((camera) => ( //{camera} reallay is a camera component
        <Camera key={camera.id} camera={camera}/>
      ))}

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
      <div
        className="btn-toolbar mb-3"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAmountVisibility(4, true)}
          >
            <BsGridFill size="2em" color="red" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAmountVisibility(9, true)}
          >
            <BsFillGrid3X3GapFill size="2em" color="blue" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setGrid(4)}
          >
            <MdOutlineGrid4X4 size="2em" color="#310080" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
