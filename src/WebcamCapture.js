import React, { useRef } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
    facingMode: "environment",
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    return (
        <div>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
        </div>
    )
}

export default WebcamCapture
