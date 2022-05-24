import { useState } from "react";
import { createContainer } from "unstated-next";


const Controller = () => {
    const [registeredAction, setRegisteredAction] = useState('nothing');

    return {
      registeredAction,
      setRegisteredAction
    };
};

export default createContainer(Controller);
