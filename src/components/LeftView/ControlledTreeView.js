import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import CameraTreeView from '../TreeView';
import Reference from './Reference';

export default function ControlledTreeView({
  cameraGroups
}) {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState(['1']);

  const handleToggle = (event, nodeIds) => {
    console.log(`expanded: ${nodeIds}`);
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    console.log(`selected: ${nodeIds}`);
    setSelected(nodeIds);
  };

  return (
    <Box sx={{ flexGrow: 1, minWidth: 300, maxHeight: 430, overflowY: 'auto' }}>
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
        <TreeItem nodeId="1" label='Camera Groups'>
          <CameraTreeView CameraGroups={cameraGroups} />
        </TreeItem>
        <TreeItem nodeId="2" label="Reference">
          <Reference />
        </TreeItem>
      </TreeView>
    </Box>
  );
}
