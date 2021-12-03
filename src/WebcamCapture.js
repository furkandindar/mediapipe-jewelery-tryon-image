import React, { useRef, useCallback, useState, useEffect, Suspense } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseIcon from '@mui/icons-material/Close';
import "./WebcamCapture.css";
import {Hands} from "@mediapipe/hands";
import {useLoader, useFrame, Canvas} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
    const glb = useLoader(GLTFLoader, "https://3dfoodmodel-modelviewer.s3.amazonaws.com/assets/Bolle/Nevada_Blue/BolleNevada_Blue_v1.glb");
    const ref = useRef();
  
    useFrame((state, delta) => {
      //ref.current.position.x = (landmark_x - 0.5)*7.5;
      //ref.current.position.y = -(landmark_y - 0.5)*10;
    })
  
    return (
      <>
        <primitive ref={ref} object={glb.scene} scale={5}></primitive>
      </>
    );
  
  };
  
  var landmark_x = -100;
  var landmark_y = -100;

const videoConstraints = {
    facingMode: "environment",
    width: 720,
    height: 640,
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);
    console.log(imgRef);

    const capture = useCallback(() => {
        const imageSource = webcamRef.current.getScreenshot();
        setImage(imageSource);
        console.log(imgRef);
    }, [webcamRef]);

    const resetImg = useCallback(() => {
        setImage(null);
    }, [webcamRef]);



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
                <img ref={imgRef} src={image}></img>
                {/* <Canvas ref={canvasRef}>
                    <Suspense fallback={null}>
                    <Model position={[0,0,-3]}></Model>
                    </Suspense>
                </Canvas>  */}
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
