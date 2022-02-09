import ReactPlayer from "react-player";
import React, { useState, useEffect } from "react";

const Camera = (props) => {

    const [isVisibale, setisVisibale] = useState(props.camera.visibility); //we will use the state to know if to display the camera
    
    useEffect(() => {
        setisVisibale(props.camera.visibility)
    }, [props.camera.visibility])
   // setisVisibale(props.display)
    return(
        <div>
            {
                isVisibale &&
                    <ReactPlayer  width = {props.camera.width} controls url = {props.camera.url} type='video/mp4' />
            }
        </div>
    )
}


export default Camera;
