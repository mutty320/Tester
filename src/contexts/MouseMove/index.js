import { useEffect, useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';

const MouseMove = () => {
    const [mouseTrigger, setMouseTrigger] = useState();

    const handleMouseMove = useCallback(() => {
        setMouseTrigger(prev => !prev);
    }, []);
    
    useEffect(() => {
        // attach the event listener
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            // remove the event listener
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
  return {
      mouseTrigger,
  }
}

export default createContainer(MouseMove);