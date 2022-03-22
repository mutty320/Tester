import React, { forwardRef, useContext, useEffect } from 'react';
import { zoomableContext } from 'react-zoomable-media';
import styled from 'styled-components';

const VideoElement = styled.video`
  object-fit: cover;
  width: 100%;
`;

const Video = forwardRef(({
  controls,
  url,
  onLoadedMetadata,
  defaultPlay
}, ref) => {
  const context = useContext(zoomableContext);

  // useEffect(() => {
  //   if (context) {
  //     (async () => {
  //       context.zoomIn();
  //       context.handlePointerDown({ pageX: 0, pageY: 0, pointerId: 1, preventDefault(){} })
  //       context.handlePointerMove({ pageX: 100, pageY: 100, pointerId: 1, preventDefault(){} })
  //       context.handlePointerUp({ pointerId: 1 });
  //     })();
  //   }
  // }, [])
  
  return (
    <VideoElement
      ref={ref}
      onLoadedMetadata={onLoadedMetadata}
      controls={controls}
      src={url}
    />
  );
});

export default Video;
