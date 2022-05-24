import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

// context imports
import { KeyCode, MouseMove, SelectedCamera, VideoRef, useDeviceConnection, ActiveView, Controller } from './contexts';

// component imports
import Grid from './components/Grid';
import DeviceUI from './components/DeviceUI';
import LeftView from './components/LeftView';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fileData = require('./components/config'); //now f is an object holding array of objects
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

const GridContainer = styled.div`
  ${({layoutHovered}) => layoutHovered && 'border: 3px solid #31fe39'};
  transition: ease-in-out 200ms;
`;

const App = () => {
  const [cameraGroups, setCameraGroups] = useState([]);
  const [layoutHovered, setLayoutHovered] = useState();

  useEffect(() => {
    const tempCameraGroups = [];
    for (let i in fileData.GROUPS) tempCameraGroups.push(fileData.GROUPS[i]);
    setCameraGroups(tempCameraGroups);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLayoutHovered();
    }, 2000)
    console.log(`layoutHovered: ${layoutHovered}`);
  }, [layoutHovered])

  return (
    <KeyCode.Provider>
      <MouseMove.Provider>
        <SelectedCamera.Provider>
          <VideoRef.Provider>
            <useDeviceConnection.Provider>
              <ActiveView.Provider>
                <Controller.Provider>
                  <DeviceUI />
                  <div
                    className="container"
                    style={{ marginTop: '5rem', display: 'flex' }}
                  >
                    {cameraGroups.length > 0 && (
                      <>
                        <LeftView
                          cameraGroups={cameraGroups}
                        />
                        <GridContainer
                          layoutHovered={layoutHovered}
                        >
                          <Grid cameras={cameraGroups} setLayoutHovered={setLayoutHovered} />
                        </GridContainer>
                      </>
                    )}
                  </div>
                </Controller.Provider>
              </ActiveView.Provider>
            </useDeviceConnection.Provider>
          </VideoRef.Provider>
        </SelectedCamera.Provider>
      </MouseMove.Provider>
    </KeyCode.Provider>
  );
};

export default App;
