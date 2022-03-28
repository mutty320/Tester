import React, { forwardRef, useContext, useEffect, useState, useRef } from 'react';
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
  defaultPlay,
  event,
}, ref) => {
  const context = useContext(zoomableContext);

  useEffect(() => {
    if (event) {

      switch (event.type) {
        case 'up':
          context.handleKeydown( { custom: true, direction: 'up' } )
          break;
        case 'down':
          context.handleKeydown( { custom: true, direction: 'down'});
          break;
        case 'right':
          context.handleKeydown( { custom: true, direction: 'right'});
          break;
        case 'left':
          context.handleKeydown( { custom: true, direction: 'left'});
          break;
        case 'ROTATE_RIGHT':
          context.zoomIn();
          break;
        case 'ROTATE_LEFT':
          context.zoomOut();
          break;
        default:
          break;
      }
    }
  }, [event])
  
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
