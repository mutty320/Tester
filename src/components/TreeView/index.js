import React, { useEffect } from 'react'
import "smart-webcomponents-react/source/styles/smart.default.css";
import styled from 'styled-components';
import SelectedCamera from '../../contexts/SelectedCamera';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CameraItem from './CameraItem';

const Container = styled.div`
    border: 1px solid;
    padding: 10px;
    border-radius: 10px;
    margin-right: 25px;
`;

const GroupsTitle = styled.h4`
    text-align: center;
    margin: 4px;
    line-height: 25px;
    margin-bottom: 10px;
`;

const CameraTreeView = ({
    CameraGroups,
}) => {

    const { setCamera, cameraId } = SelectedCamera.useContainer();

    useEffect(() => {
        console.log("cameraId: ", cameraId);
    }, [cameraId]);

  return (
      <Container>
          <GroupsTitle>Camera Groups</GroupsTitle>
          <TreeView
              aria-label="camera groups navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                  width: 200,
                  flexGrow: 1,
                  maxWidth: 600,
                  overflowY: "auto",
              }}
          >
              {CameraGroups.map((group) => {
                  return (
                      <TreeItem
                          nodeId={`${group.Camera_group}`}
                          label={group.Camera_group}
                          key={group.Camera_group}
                      >
                          {group.camera_items.map((camera) => (

                              <CameraItem
                                name={camera.name}
                                onSubmit={() => setCamera(camera.id)}
                                key={camera.id}
                              />
                          ))}
                      </TreeItem>
                  );
              })}
          </TreeView>
      </Container>
  );
}

export default CameraTreeView