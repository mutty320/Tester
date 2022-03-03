import React, { useEffect } from 'react'
import "smart-webcomponents-react/source/styles/smart.default.css";
import styled from 'styled-components';
import SelectedCamera from '../../contexts/SelectedCamera';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

const Container = styled.div`
    border: 1px solid;
    padding: 10px;
    border-radius: 10px;
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
                  height: 350,
                  width: 200,
                  flexGrow: 1,
                  maxWidth: 600,
                  overflowY: "auto",
              }}
            //   multiSelect
              onNodeSelect={(event, nodeId) => {
                console.log(nodeId);
                const nodeIdInt = parseInt(nodeId);
                
                if (!isNaN(nodeIdInt)) {
                    setCamera(nodeIdInt);
                }
              }}
          >
              {CameraGroups.map((group) => {
                  return (
                      <TreeItem
                          nodeId={`${group.Camera_group}`}
                          label={group.Camera_group}
                      >
                          {group.camera_items.map((camera) => (
                              <TreeItem
                                  nodeId={`${camera.id}`}
                                  label={camera.name}
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