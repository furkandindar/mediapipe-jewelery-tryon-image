import React, { useRef, useCallback, useState, useEffect, Suspense } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseIcon from '@mui/icons-material/Close';
import "./WebcamCapture.css";
import {Hands} from "@mediapipe/hands";
import {useLoader, useFrame, Canvas, render} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { Environment } from "@react-three/drei";

const Model = () => {
    //
    const glb = useLoader(GLTFLoader, "https://ttb-dev.s3.amazonaws.com/RingTransformed.glb");
    const ref = useRef();
  
    useFrame((state, delta) => {
      ref.current.position.x = (landmark_x - 0.5)*10;
      ref.current.position.y = -(landmark_y - 0.5)*8;
      ref.current.scale.x = scale*33;
      ref.current.scale.y = scale*33;
      ref.current.scale.z = scale*33;
    })

        return (
            <>
              <primitive ref={ref} object={glb.scene} scale={5}></primitive>
            </>
          );
    
  
  };
  
  var landmark_x = -100;
  var landmark_y = -100;
  var scale = 0.1;
  var renderFlag=false;

const videoConstraints = {
    facingMode: "environment",
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
        renderFlag=false;
    }, [webcamRef]);

    function onResults(results){
      canvasRef.current.width = imgRef.current.width;
      canvasRef.current.height = imgRef.current.height;
      console.log(results);

      console.log(imgRef);
      console.log(canvasRef);
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          if (landmarks[14].x !== "undefined") {
            landmark_x = (landmarks[14].x + landmarks[13].x)/2;
            console.log(landmark_x);
            renderFlag=true;
            landmark_y = (landmarks[14].y + landmarks[13].y)/2;
            //landmark_z = (landmarks[14].z + landmarks[13].z)/2;
            scale = landmarks[13].y - landmarks[14].y;
          }
        }
      }
    }

    useEffect(() => {
      const hands = new Hands({
        locateFile:(file) =>{
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      if (image) {
        hands.onResults(onResults);

        hands.send({image: imgRef.current});
      }
    });



    return (
        <div>
            <div className={`webcamCapture ${image ? "hide" : ""}`}>
                <Webcam
                    className="webcam"
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    screenshotQuality={1}
                    forceScreenshotSourceSize={true}
                />
                <RadioButtonUncheckedIcon
                    className="webcamCapture__CaptureButton"
                    onClick = {capture}
                    fontSize = "large"
                />
            </div>
            <div className={`preview ${image ? "" : "hide"}`}>
                <img ref={imgRef} src={image}></img>
                <Canvas ref={canvasRef} style={{width:"640px", height:"480px", position:"absolute"}}>
                    <Suspense fallback={null}>
                    <Model position={[-100,-100,-3]}></Model>
                    <Environment preset="studio"></Environment>
                    </Suspense>
                </Canvas> 
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
