import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { ACTION, Mapper, start } from "../../Hid";



const Controller = () => {
    const [activeMovement, setActiveMovement] = useState();
    const [activeRotation, setActiveRotation] = useState()

    useEffect(() => { const map = new Mapper();

      map.register(ACTION.BUTTONS.FIRST, () => {
        console.log("YAY! WORKING! FIRST");
      });
      map.register(ACTION.BUTTONS.SECOND, () => {
        console.log("YAY! WORKING! SECOND");
      });
      map.register(ACTION.BUTTONS.THIRD, () => {
        console.log("YAY! WORKING! THIRD");
      });
      map.register(ACTION.BUTTONS.FOURTH, () => {
          console.log("YAY! WORKING! FOURTH");
      });
      map.register(ACTION.BUTTONS.FIFTH, () => {
          console.log("YAY! WORKING! FIFTH");
      });
      map.register(ACTION.BUTTONS.SIXTH, () => {
          console.log("YAY! WORKING! SIXTH");
      });
      map.register(ACTION.BUTTONS.SEVENTH, () => {
          console.log("YAY! WORKING! SEVENTH");
      });
      map.register(ACTION.BUTTONS.EIGHTH, () => {
          console.log("YAY! WORKING! EIGHTH");
      });
      map.register(ACTION.BUTTONS.NINTH, () => {
          console.log("YAY! WORKING! NINTH");
      });
      map.register(ACTION.BUTTONS.TENTH, () => {
          console.log("YAY! WORKING! TENTH");
      });
      map.register(ACTION.BUTTONS.RIGHT_BUTTON_ON_STICK, () => {
          console.log("RIGHT_BUTTON_ON_STICK");
      });
      map.register(ACTION.BUTTONS.LEFT_BUTTON_ON_STICK, () => {
          console.log("LEFT_BUTTON_ON_STICK");
      });
      map.register(ACTION.MOVEMENT.ROTATE_RIGHT, () => {
          console.log("ROTATE_RIGHT");
      });
      map.register(ACTION.MOVEMENT.ROTATE_LEFT, () => {
          console.log("ROTATE_LEFT");
      });
      map.register(ACTION.MOVEMENT.FRONT, () => {
        // console.log(map.value);
      });
      map.register(ACTION.MOVEMENT.BACK, () => {
        // console.log(map.value);
      });
      map.register(ACTION.MOVEMENT.RIGHT, () => {
        // console.log(map.value);
      });
      map.register(ACTION.MOVEMENT.LEFT, () => {
        // console.log(map.value);
      });
      map.register(ACTION.NOTHING, () => {
        
      });
  
      start(map);
    }, [])

    return {

    };
};

export default createContainer(Controller);
