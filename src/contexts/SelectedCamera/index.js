import { useState } from "react";
import { createContainer } from "unstated-next";

const SelectedCamera = () => {
    const [cameraId, setCameraId] = useState(-1);

    const setCamera = (id) => {
        setCameraId(id);
    }

    return {
        setCamera,
        cameraId,
    };
};

export default createContainer(SelectedCamera);
