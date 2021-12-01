import React, { useRef } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
    width: 480,
    height: 640,
    facingMode: "environment",
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    return (
        <div>
            <Webcam
                ref={webcamRef}
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
        </div>
    )
}

export default WebcamCapture
