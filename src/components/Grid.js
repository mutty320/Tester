import ReactPlayer from "react-player";
import React, { useState, useEffect } from "react";
import { BsFillGrid3X3GapFill, BsGridFill } from "react-icons/bs";

import { MdOutlineGrid4X4 } from "react-icons/md";

import { FaForward, FaBackward, FaPlay, FaPause } from "react-icons/fa";
import Camera from "./Camera";

const Grid = (props) => {
  
  const [camerasGrid, setCamerasGrid] = useState([]);
  const [currLayout, setCurrLayout] = useState(4);
  
  // let camerasToDisplay = [];
  // camerasToDisplay.push(
  //   <Camera
  //     width={"200px"}
  //     controls
  //     url={props.cameras[i].camera_items[x].video}
  //     type={"video/mp4"}
  //   />
  // );

  // const setAmountVisibility = (amount, visibility) => {
  //   const tempCameras = [];
  //   for (let index = 0; index < camerasGrid.length; index++) {
  //     const element = camerasGrid[index];
  //     element.visibility = index <= (amount - 1) ? visibility : !visibility;

  //     tempCameras.push(element);
  //   }
  //   setCamerasGrid(tempCameras);
  // };

  const setAmountVisibility = (amount, visibility) => {
    setCurrLayout((prevlLayout) => {
      return Math.max(prevlLayout, amount);
    });
    setCamerasGrid((prevVisibility) => {
      const tempCameras = [...prevVisibility];

      for (let index = 0; index < currLayout; index++) {
        let element = camerasGrid[index];
        element.visibility = index <= (amount - 1) ? visibility : !visibility;

        tempCameras[index] = element;
      }

      return tempCameras;
    });
  };

  useEffect(() => {
    let tempCameras = [];
    let counter = 0;
    for (let i in props.cameras) {
      for (let x in props.cameras[i].camera_items) {
        tempCameras.push({
          id: props.cameras[i].camera_items[x].id,
          width: "200px",
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

  {
    /* <li>{<ReactPlayer width="200px"controls url={camera} type="video/mp4" />}</li> */
  }

  return (
    <div>
      {camerasGrid.map(
        (
          camera //camera is an object
        ) => (
          <Camera key={camera.id} camera={camera} />
        )
      )}

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
            onClick={() => setAmountVisibility(10, true)}
          >
            <MdOutlineGrid4X4 size="2em" color="#310080" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
