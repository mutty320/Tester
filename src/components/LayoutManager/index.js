import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Camera, EmptyCamera } from "../Camera";
import PageArrows from '../PageArrows';

const Row = styled.div`

`;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const LayoutManager = ({
    camerasGrid,
    currLayout,
}) => {


    const buildLayoutView = () => {

        const visibleList = camerasGrid.filter(camera => camera.visibility)
        const emptyCameraList = []
        if (visibleList.length < currLayout)
        {
          console.log('length is different. len: ', visibleList.length, 'currentLayout: ', currLayout);
          // append currentLayout - length amount of EmptyCameras
          for(let i = 0; i < (currLayout - visibleList.length); i++){
            emptyCameraList.push({
              id: i,
              empty: true,
            })
          }
        }

        const CameraList = [...visibleList, ...emptyCameraList]

        const className = `col-lg-${12/Math.sqrt(currLayout)}`;
        
        return CameraList.map(
            (
              camera, //camera is an object
              index,
            ) => (
              camera.empty ?
                <EmptyCamera key={index} classNameProp={className} />
              :
                <div
                className={`${className} p-0`}
                key={index}
                >
                    <Camera camera={camera} />
                </div>
            )
        )
    }

  return (
    <Container>
      <PageArrows onSubmit={() => console.log('Left clicked')} />
      <Row className="row">
          {
            buildLayoutView()
          }
      </Row>
      <PageArrows onSubmit={() => console.log('Right clicked')} right />
    </Container>
  )
}

export default LayoutManager