import React, { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const videoConstraints = {
    facingMode: "environment",
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const capture = useCallback(() => {
        const imageSource = webcamRef.current.getScreenshot();
        console.log(imageSource);
        setImage(imageSource);
    }, [webcamRef])
    
    return (
        <div className="webcamCapture">
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon
                className="webcamCapture__button"
                onClick = {capture}
                fontSize = "large"
            />
            <img src={image}></img>
        </div>
    )
}

export default WebcamCapture
