import React from 'react'
import styled from 'styled-components';
import { Camera, EmptyCamera } from "../Camera";

const Row = styled.div`

`;

const ScreenManager = ({
    camerasGrid,
    currLayout,
}) => {

    const buildScreensView = () => {
        
        return camerasGrid.filter(camera => camera.visibility).map(
            (
              camera //camera is an object
            ) => (
                <div
                className={`col-lg-${12/Math.sqrt(currLayout)} p-0`}
                key={camera.id}
                >
                    <Camera camera={camera} />
                </div>
            )
        )
    }

  return (
    <Row className="row">
        {
          buildScreensView()
        }
    </Row>
  )
}

export default ScreenManager