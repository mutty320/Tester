import { useState } from "react";
import { createContainer } from "unstated-next";

const VideoRef = () => {
    const [videoRef, setVideoRef] = useState();

    return {
      videoRef,
      setVideoRef,
    };
};

export default createContainer(VideoRef);
