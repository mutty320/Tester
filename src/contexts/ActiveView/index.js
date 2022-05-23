import { useState } from "react";
import { createContainer } from "unstated-next";

export const ViewLabel = {
  LEFT: 'left',
  LAYOUT: 'layout'
}

const ActiveView = () => {
  const [active, setActive] = useState(ViewLabel.LAYOUT);
  const [previousToggle, setPreviousToggle] = useState();

  const toggleActiveView = () => {

    // toggle can't happen more than once in a second
    const currentTime = Date.now();
    const timeElapsed = currentTime - previousToggle;

    if (!previousToggle || timeElapsed >= 1000) {

      // toggle
      setActive(prevActive => {
        return prevActive === ViewLabel.LAYOUT? ViewLabel.LEFT : ViewLabel.LAYOUT
      })

      // reset previousToggle
      setPreviousToggle();
    } else {
      setPreviousToggle(Date.now());
    }

  }

  return {
    toggleActiveView,
    setActive,
    active,
  };
};

export default createContainer(ActiveView);
