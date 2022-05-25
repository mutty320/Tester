import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Reference from './Reference';
import ActiveView, { ViewLabel } from '../../contexts/ActiveView';
import { ACTION, Mapper, start } from '../../Hid';
import { KeyCode, SelectedCamera } from '../../contexts';

// Array.prototype.insert = function ( index, item ) {
//   this.splice( index, 0, item );
// };

const selectableListDefault = ['v1', 'v2'];

export default function ControlledTreeView({ cameraGroups, setHighlight }) {
  const [expanded, setExpanded] = React.useState(['v2']);
  const [selected, setSelected] = React.useState(['1']);
  // const [position, setPosition] = React.useState([0, 0]);
  // const [navLayer, setNavLayer] = React.useState('v');
  const [position, setPosition] = React.useState(0);
  const [selectableList, setSelectableList] = React.useState(selectableListDefault);
  const [rAction, setRAction] = React.useState(); // registered action

  const { active, toggleActiveView } = ActiveView.useContainer();
  const { keyCode, trigger } = KeyCode.useContainer();
  const { setCamera } = SelectedCamera.useContainer();

  React.useEffect(() => {
    if (active === ViewLabel.LEFT) {
      // highlight left view
      setHighlight(true);

      // reset expanded and selectable in case user navigated before with arrow keys or clicks
      setExpanded([]);
      setPosition(0);
      setSelectableList(selectableListDefault);

      const map = new Mapper();
      map.register(ACTION.BUTTONS.SECOND, () => {
        // toggle active view
        toggleActiveView();
        console.log('SECOND_2');
      });
      map.register(ACTION.BUTTONS.LEFT_BUTTON_ON_STICK, () => {
        console.log('LEFT_BUTTON_ON_STICK_2');
        // select();
        setRAction('select');
      });
      map.register(ACTION.MOVEMENT.FRONT, () => {
        console.log(map.value);
        // navigate('up');
        setRAction('up');
      });
      map.register(ACTION.MOVEMENT.BACK, () => {
        console.log(map.value);
        // navigate('down');
        setRAction('down');
      });
      map.register(ACTION.NOTHING, () => {
        setRAction('nothing');
      });


      start(map);
    }
  }, [active, setRAction]);

  React.useEffect(() => {
    console.log(`rAction: ${rAction}`);

    switch(rAction) {
      case 'up':
        navigate('up');
        break;
      case 'down':
        navigate('down');
        break;
      case 'select':
        select();
        break;
      default:
    }
  }, [rAction]);

  React.useEffect(() => {
    switch (keyCode) {
      case 'w':
        navigate('up');
        break;
      case 's':
        navigate('down');
        break;
      case 'd':
        select();
        break;
      case '1':
        toggleActiveView();
        break;
      default:
        break;
    }
  }, [trigger]);

  const isInRange = (value) => value > -1 && value < selectableList.length;

  const navigate = (direction) => {
    let newPos = false;

    if (direction === 'up') {
      if (isInRange(position - 1)) {
        newPos = position - 1;
      }
    } else {
      if (isInRange(position + 1)) {
        newPos = position + 1;
      }
    }
    if (newPos || newPos === 0) {
      setPosition(newPos);
    }
  };

  const hierarchy = {
    v: 1,
    f: 2,
    c: 3,
  };

  const getGreatest = (list) => {
    let greatest = 0; // if list empty
    list.forEach((nodeId) => {
      const val = hierarchy[nodeId.charAt(0)];
      if (val > greatest) greatest = val;
    });
    return greatest;
  };

  const removeGreatest = (list, val) => {
    return list.filter((nodeId) => hierarchy[nodeId.charAt(0)] !== val);
  };

  const removeUntil = (selectableList, level) => {
    let resultArray = selectableList;
    while(getGreatest(resultArray) >= level) {
      // remove layer
      resultArray = removeGreatest(resultArray, getGreatest(resultArray));
    };
    return resultArray;
  }

  const setLists = (selectableList, selectedGroup, position) => {
    // if c's from fx in selectableList then add fx in setExpanded
    setSelectableList(selectableList);

    // build expanded list

    // if selectedGroup not false then add to list of expanded
    if (selectedGroup) {
      const removedV2 = selectableList.filter(nodeId => nodeId !== 'v2'); // we don't want v2 in expanded
      const listOfRemoved = removeUntil(removedV2, 2);
      setExpanded(insertItem(selectedGroup, listOfRemoved, selectableList.indexOf(selectedGroup)));
      // console.log(testArray);
    } else if (position || position === 0) {
      // calling from position: 0 or 1
      const removedV = selectableList.filter(nodeId => (position === 0 ? nodeId !== "v2" : nodeId !== "v1"));
      console.log(`removedV: ${removedV}`);
      // remove layer
      setExpanded((position === 0 ? removeGreatest(removedV, getGreatest(removedV)) : removedV));
    }
  };  

  // get list of cameras e.g. [c1, c2...] in camera group nodeId e.g. "f1"
  const getCameras = (group) => {
    const cameraGroup = cameraGroups.filter((cgroup) => {
      const groupName = cgroup.Camera_group;
      return (
        group ===
        groupName.charAt(0) +
          (!isNaN(groupName.charAt(groupName.length - 2)) // get if second digit
            ? groupName.charAt(groupName.length - 2)
            : '') +
          groupName.charAt(groupName.length - 1)
      );
    });
    const cameraList = cameraGroup[0].camera_items.map(
      (camera) => `c${camera.id}`
    );
    return cameraList;
  };

  // insert subArray into theArray at index
  const insertArray = ( subArray, theArray, index ) => {
    return theArray.slice( 0, index ).concat( subArray ).concat( theArray.slice( index ) );
  };

  const insertItem = ( item, array, index ) => {
    array.splice( index, 0, item );
    return array
  };

  const select = () => {
    // if position === 0 then insert camera groups into visible list
    console.log(cameraGroups);
    if (position === 0) {
      const groupsList = cameraGroups.map((group, index) => `f${index + 1}`);

      let buildList;
      const greatest = getGreatest(selectableList);
      if (greatest === 2 || greatest === 3) {
        buildList = removeUntil(selectableList, 2); // remove f's and c's
      } else {
        buildList = ['v1', ...groupsList, 'v2'];
      }
      setLists(buildList, false, 0);
    } else if (selectableList[position] === 'v2') {
      setLists(["v1", "v2"], false, 1);
      setPosition(1);
    } else if (selectableList[position].charAt(0) === 'f') {
      // clicked on f_
      // get selected hoverId
      const selectedGroupHoverId = selectableList[position];
      // get c's
      const listCs = getCameras(selectedGroupHoverId);
      // get rid off any previous c's
      // insert list of cameras into selectable list after (index) selectedGroupHoverId
      console.log(`position(): ${position}`);

      // if any c's
      const listWithoutC = removeUntil(selectableList, 3);
      // update position if there were previously c's in selectableList
      const newPosition = listWithoutC.indexOf(selectedGroupHoverId);
      setPosition(newPosition);
      const buildList = insertArray(listCs, listWithoutC, newPosition + 1);

      setLists(buildList, selectedGroupHoverId);
      console.log(buildList);
    } else if (selectableList[position].charAt(0) === 'c') {

      const selectedCamera = selectableList[position];
      setCamera(parseInt(selectedCamera.substring(1, selectedCamera.length)))
      toggleActiveView();

      // close lists and reset
      setPosition(0);
      setSelectableList(selectableListDefault);
      setExpanded([]);
    }
  };

  React.useEffect(() => {
    console.log(`position: ${position}`);

    // const selectedNode = [`${getSelectedNodeId()}`];
    const selectedNode = [selectableList[position]];
    // remove c if c exists
    setSelected(selectedNode);
    console.log(`selectedNode: ${selectedNode}`);

    // console.log(IsInGroupsBound(position[1]));
  }, [position, selectableList]);

  React.useEffect(() => {
    console.log(`selected: ${selected}`);
  }, [selected]);

  React.useEffect(() => {
    console.log(`expanded: ${expanded}`);
  }, [expanded]);

  React.useEffect(() => {
    console.log(`selectableList: ${selectableList}`);
  }, [selectableList]);

  const buildExpandedList = () => {
    // only make list of parents
  };

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
        <TreeItem nodeId="v1" label="Camera Groups">
          {cameraGroups.map((group, index) => {
            return (
              <TreeItem
                // nodeId={`${group.Camera_group}`}
                nodeId={`f${index + 1}`}
                label={group.Camera_group}
                key={group.Camera_group}
              >
                {group.camera_items.map((camera) => (
                  //   <CameraItem
                  //     name={camera.name}
                  //     onSubmit={() => setCamera(camera.id)}
                  //     key={camera.id}
                  //   />
                  <TreeItem
                    nodeId={`c${camera.id}`}
                    label={camera.name}
                    onClick={() => setCamera(camera.id)}
                    key={camera.id}
                  />
                ))}
              </TreeItem>
            );
          })}

          {/* <CameraTreeView CameraGroups={cameraGroups} /> */}
        </TreeItem>
        <TreeItem nodeId="v2" label="Reference">
          <Reference />
        </TreeItem>
      </TreeView>
    </Box>
  );
}
