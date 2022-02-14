import ReactPlayer from "react-player";
import React from "react";

import { Accordion, AccordionItem } from "smart-webcomponents-react/accordion";
import "smart-webcomponents-react/source/styles/smart.default.css";
import ReactDOM from "react-dom";
import {
  MultilineTextBox,
  ListItem,
  ListItemsGroup,
} from "smart-webcomponents-react/multilinetextbox";
import { Tree, TreeItem, TreeItemsGroup } from "smart-webcomponents-react/tree";
import "./App.css";

import Grid from "./components/Grid";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fileData = require("./components/config"); //now f is an object holding array of objects
console.log(fileData);

const CameraGroups = [];
for (let i in fileData.GROUPS) CameraGroups.push(fileData.GROUPS[i]);
//once weve popelated the arr each item is a group that holdes:
// 1.Camera_group- (group id) which will b the main banner
// 2.camera_items- an array of all the items belonging to that group so we can iterat it for the dropdown

console.log(CameraGroups.length);
for (let i in CameraGroups) {
  for (let x in CameraGroups[i].camera_items)
    console.log(i + " " + x + " " + CameraGroups[i].camera_items[x].name);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     {/* <ReactPlayer controls url = 'https://www.youtube.com/watch?v=7sDY4m8KNLc&t=64s'/>*/}
//================================================
class App extends React.Component {
  handleDragStart(event) {
    if (event.detail.items[0].label === "Communities") {
      event.preventDefault();
    }
  }

  handleDragEnd(event) {
    if (event.detail.items[0].label === "Financial services") {
      event.preventDefault();
      return;
    }
    if (!event.detail.container.closest("smart-tree")) {
      const textBox = event.detail.target.closest("smart-multiline-text-box");
      if (textBox) {
        textBox.value = event.detail.items[0].label;
      }
    }
  }

  init() {}

  componentDidMount() {}

  render() {
    return (
      <div>
        <br />
        <br />
        <Tree
          id="tree1"
          className="animation"
          allowDrag
          allowDrop
          onDragStart={this.handleDragStart.bind(this)}
          onDragEnd={this.handleDragEnd.bind(this)}
        >
          <TreeItem style={{ color: "red" }}>Groups</TreeItem>

          {/* ///////////////////////////////////////////////////////////// */}

          {CameraGroups.map((group) => {
            return (
              <TreeItemsGroup
                key={group.Camera_group}
                style={{ color: "blue" }}
              >
                {group.Camera_group}

                {group.camera_items.map((item) => (
                  <TreeItem key={item.id}>
                    {" "}
                    <a href="https://www.youtube.com/watch?v=7sDY4m8KNLc&t=64s">
                      {item.name}
                    </a>
                  </TreeItem>
                ))}
              </TreeItemsGroup>
            );
          })}

          {/*/////////////////////////////////////////////////////////////////////// */}

          <TreeItemsGroup expanded>
            Support
            <TreeItem>Support home</TreeItem>
            <TreeItem>Customer Service</TreeItem>
            <TreeItem>Knowledge base</TreeItem>
            <TreeItem>Support home</TreeItem>
          </TreeItemsGroup>
        </Tree>

        <br />
        <br />

        {/* <ReactPlayer controls url ="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/> */}

        <div>
          <div class="container">
            <Grid cameras={CameraGroups} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
export default App;
