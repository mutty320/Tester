import { useEffect, useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';

const MouseMove = () => {
    const [mouseTrigger, setMouseTrigger] = useState();

    const handleMouseMove = useCallback(() => {
        setMouseTrigger(prev => !prev);
    }, []);

    const enable = (bool) => {
        if (bool) {
            // attach the event listener
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            // remove the event listener
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }
    
    useEffect(() => {
        return () => {
            // remove the event listener
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
  return {
      enable,
      mouseTrigger,
  }
}

export default createContainer(MouseMove);