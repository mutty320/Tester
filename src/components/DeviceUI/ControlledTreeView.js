import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Connection from './Connection';
import ConnectionLabel from './Connection/ConnectionLabel';
import { useDeviceConnection } from '../../contexts';

export default function ControlledTreeView() {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const { deviceConnected } = useDeviceConnection.useContainer();

  // React.useEffect(() => {
  //   console.log(expanded);
  // }, [expanded]);

  React.useEffect(() => {
    // open Connection view
    if(!deviceConnected)
      openConnectionView();
  }, [deviceConnected])

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const closeConnectionView = () => {
    setExpanded((prevExpanded) => {
      return prevExpanded.filter(nodeId => nodeId === '2');
    })
  }

  const openConnectionView = () => {
    setExpanded((prevExpanded) =>
      prevExpanded.indexOf('1') === -1 ? ['1', ...prevExpanded] : prevExpanded
    );
  }

  // todo: On blur should close TreeView
  return (
    <Box sx={{ flexGrow: 1, minWidth: 300, overflowY: 'auto' }}>
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
        <TreeItem nodeId="1" label={<ConnectionLabel />}>
          <Connection
            CloseView={closeConnectionView}
          />
        </TreeItem>
      </TreeView>
    </Box>
  );
}
