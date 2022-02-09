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

let a = {"data": "key=IAfpK, age=58, key=WNVdi, age=64, key=jp9zt, age=47"}
let b = a.data

let myStr = b.replace(/=/g, ":")

let myStr2 = myStr.replace(/key/g, "\"key\"").replace(/age/g, "\"age\"")
let g = {"data": 0}
g.data = myStr2
//let c = JSON.parse(g)
let arr=[]
//let obj =  b.data


//var ar = obj.split('age=');
//for(var x=0; x<ar.length;x++){
 // console.log(obj.split(/, (?='key')/).map(s => s.split('key ')))
//}


console.log(myStr)
console.log(typeof myStr)
console.log(myStr2)
console.log(g)
console.log(a)
//console.log(c)



console.log(CameraGroups.length);
for (let i in CameraGroups) {
  for (let x in CameraGroups[i].camera_items)
    console.log(i + " " + x + " " + CameraGroups[i].camera_items[x].name);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//unction App() {

// return (
//   <div>
//     <link
//       rel="stylesheet"
//       href="../../source/styles/smart.default.css"
//       type="text/css"
//     />
//     <script
//       type="text/javascript"
//       src="../../source/smart.element.js"
//     ></script>
//     <script
//       type="text/javascript"
//       src="../../source/smart.button.js"
//     ></script>

//     <body>
//       <smart-button>Click Me</smart-button>
//     </body>
//     {/* <ReactPlayer controls url = 'https://www.youtube.com/watch?v=7sDY4m8KNLc&t=64s'/>*/}
//   </div>
// );

//================================================

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

          {/* ////////////////////////////////////////////////////////////////// */}

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
          <div className= "container demo-description"></div>
          <div className="Grid-layout">
            <div className="row">
              <div className="col-4 video"> <Grid cameras={CameraGroups} /></div>
              {/* <div className="col-sm-4 video">
               
              </div>
              <div className="col-sm-4 video"></div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
export default App;
