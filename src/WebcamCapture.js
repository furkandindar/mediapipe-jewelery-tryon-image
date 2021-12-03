import React, { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseIcon from '@mui/icons-material/Close';
import "./WebcamCapture.css";

const videoConstraints = {
    facingMode: "environment",
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const capture = useCallback(() => {
        const imageSource = webcamRef.current.getScreenshot();
        setImage(imageSource);
    }, [webcamRef])

    const resetImg = useCallback(() => {
        setImage(null);
    }, [webcamRef])

    return (
        <div>
            <div className={`webcamCapture ${image ? "hide" : ""}`}>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <RadioButtonUncheckedIcon
                    className="webcamCapture__CaptureButton"
                    onClick = {capture}
                    fontSize = "large"
                />
            </div>
            <div className={`preview ${image ? "" : "hide"}`}>
                <img src={image}></img>
                <CloseIcon 
                    className="webcamCapture__CloseButton"
                    onClick= {resetImg}
                    fontSize= "large"
                />
            </div>
        </div>
    )
    
}

export default WebcamCapture
