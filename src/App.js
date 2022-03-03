import React, { useEffect, useState } from "react";
import "./App.css";

// context imports
import KeyCode from './contexts/KeyCode';
import MouseMove from './contexts/MouseMove';
import SelectedCamera from './contexts/SelectedCamera';

// component imports
import Grid from "./components/Grid";
import TreeView from "./components/TreeView";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fileData = require("./components/config"); //now f is an object holding array of objects
console.log(fileData);


//once weve popelated the arr each item is a group that holdes:
// 1.Camera_group- (group id) which will b the main banner
// 2.camera_items- an array of all the items belonging to that group so we can iterat it for the dropdown

// console.log(CameraGroups.length);
// for (let i in CameraGroups) {
//   for (let x in CameraGroups[i].camera_items)
//     console.log(i + " " + x + " " + CameraGroups[i].camera_items[x].name);
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//================================================
const App = () => {

  const [cameraGroups, setCameraGroups] = useState([]);

    useEffect(() => {
      const tempCameraGroups = [];
      for (let i in fileData.GROUPS) tempCameraGroups.push(fileData.GROUPS[i]);
      setCameraGroups(tempCameraGroups);
    }, []);

    return (
      <KeyCode.Provider>
        <MouseMove.Provider>
          <SelectedCamera.Provider>
            <div className="container" style={{marginTop: '5rem', display: 'flex'}}>
              {
                cameraGroups.length > 0 &&
                <>
                  <TreeView
                    CameraGroups={cameraGroups}
                    />
                  <div>
                    <div className="container">
                      <Grid cameras={cameraGroups} />
                    </div>
                  </div>
                </>
              }
            </div>
          </SelectedCamera.Provider>
        </MouseMove.Provider>
      </KeyCode.Provider>
    );
}

export default App;
