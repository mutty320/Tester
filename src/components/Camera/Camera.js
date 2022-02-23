import ReactPlayer from "react-player";
import React from "react";

const Camera = ({
  camera
}) => {
  return (
    <ReactPlayer
      config={{
        file: {
          attributes: {
            style: { objectFit: "cover", width: "100%", height: "100%"},
          },
        },
      }}
      width='100%'
      height='100%'
      controls
      url={camera.url}
      type="video/mp4"
    />
  );
};

export default Camera;
