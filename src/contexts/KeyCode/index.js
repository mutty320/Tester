import { useEffect, useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';

const KeyCode = () => {
    const [keyCode, setKeyCode] = useState();
    const [trigger, setTrigger] = useState(false);  // trigger is needed if the same key is pressed twice
    const handleKeyPress = useCallback((event) => {
        console.log(`Key pressed: ${event.key}`);
        setKeyCode(event.key);
        setTrigger(prev => !prev); // toggle trigger
        setTimeout(() => {
          setKeyCode();
        }, 50);
    }, []);
    
    useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
        document.removeEventListener('keydown', handleKeyPress);
    };
    }, [handleKeyPress]);
  return {
    keyCode,
    trigger,
  }
}

export default createContainer(KeyCode);