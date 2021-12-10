import React, { useRef, useCallback, useState, useEffect, Suspense } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseIcon from '@mui/icons-material/Close';
import "./WebcamCapture.css";
import {Hands} from "@mediapipe/hands";
import {useLoader, useFrame, Canvas} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls } from "@react-three/drei";
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const Model = ({ position, rotation}) => {
    //
    const glb = useLoader(GLTFLoader, "https://ttb-dev.s3.amazonaws.com/RingTransformed.glb");
    const ref = useRef();
  
    useFrame((state, delta) => {
      //console.log(ref);
      //let position = new Vector3(landmark_x*5, landmark_y*5, landmark_z*5);
      //ref.current.position.set(position);
        ref.current.position.x = (landmark_x - 0.5);
        ref.current.position.y = (0.5 - landmark_y)*0.8;
        ref.current.rotation.z = -(rotateZ) + Math.PI/2;
        if (hand_info === "Left") {
            if (rotateY < 0) {
                ref.current.rotation.y = rotateY + Math.PI/16;
              } else {
                ref.current.rotation.y = rotateY + Math.PI + Math.PI/16;
              }
            } else {
              if (rotateY > 0) {
                ref.current.rotation.y = rotateY - Math.PI/16;
              } else {
                ref.current.rotation.y = rotateY + Math.PI - Math.PI/16;
              }
          }
        //ref.current.rotation.x = rotateX;
        //ref.current.position.z = -0.1;
       //ref.current.position.z = 0;
    //   ref.current.receiveShadow = true;
      //console.log(ref);
    //ref.current.position.x = (landmark_x - 0.5)*10;
    //ref.current.position.y = -(landmark_y - 0.5)*8;
    //   ref.current.scale.x = scale*5;
    //   ref.current.scale.y = scale*5;
    //   ref.current.scale.z = scale*5;
    })

        return (
            <group ref={ref} scale={0.5} position={position} rotation={rotation}>
                <primitive object={glb.scene}></primitive>
            </group>
          );
    
  
  };
  
  var landmark_x = -100;
  var landmark_y = -100;
  var landmark_z = -100;
  var scale = 0.1;
  var rotateZ = 0;
  var rotateY = 0;
  var rotateX = 0;
  var hand_info = null;
  //var renderFlag=false;

const videoConstraints = {
    facingMode: "environment",
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    // const [xPosition, setXPosition] = useState(0);
    // const [yPosition, setYPosition] = useState(0);
    // const [zPosition, setZPosition] = useState(0);

    // const [xRotation, setXRotation] = useState(0);
    // const [yRotation, setYRotation] = useState(0);
    // const [zRotation, setZRotation] = useState(0);

    // const [xScale, setXScale] = useState(5);
    // const [yScale, setYScale] = useState(5);
    // const [zScale, setZScale] = useState(5);

    const capture = useCallback(() => {
        const imageSource = webcamRef.current.getScreenshot();
        setImage(imageSource);
    }, [webcamRef]);

    const resetImg = () => {
        setImage(null);
        //renderFlag=false;
    };

    function onResults(results){
    //console.log("canvas width: "+canvasRef.current.width);
      canvasRef.current.width = imgRef.current.width;
      canvasRef.current.height = imgRef.current.height;
      console.log(canvasRef);
      //canvasRef.current.translate = false;
      
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          if (landmarks[14].x !== "undefined") {
            landmark_x = (landmarks[14].x + landmarks[13].x)/2;
            //renderFlag=true;
            landmark_y = (landmarks[14].y + landmarks[13].y)/2;
            landmark_z = (landmarks[14].z + landmarks[13].z)/2;
            console.log("x: " + landmark_x);
            console.log("y: " + landmark_y);
            console.log("z: " + landmark_z);
            console.log(results.image);
            //landmark_z = (landmarks[14].z + landmarks[13].z)/2;
            scale = landmarks[13].y - landmarks[14].y;
            console.log("scale factor: " + scale);
            // if(image){
            //     setXPosition((landmark_x - 0.5)*10);
            //     setYPosition(-(landmark_y - 0.5)*8);
            // }
            rotateZ = Math.atan((landmarks[14].y - landmarks[13].y)/(landmarks[14].x - landmarks[13].x));
            rotateX = Math.atan((landmarks[14].z - landmarks[0].z)/(landmarks[14].y - landmarks[0].y));
            rotateY = Math.atan((landmarks[9].z - landmarks[13].z)/(landmarks[9].x - landmarks[13].x));

            hand_info = results.multiHandedness[0].label;
            console.log(landmarks[0].z);
          }
        }
      }
    //   setXPosition((landmark_x - 0.5)*10);
    //   setYPosition(-(landmark_y - 0.5)*8);
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
                    mirrored={true}
                />
                <RadioButtonUncheckedIcon
                    className="webcamCapture__CaptureButton"
                    onClick = {capture}
                    fontSize = "large"
                />
            </div>
            <div className={`preview ${image ? "" : "hide"}`}>
                <img ref={imgRef} src={image} alt="hand"></img>
                <Canvas ref={canvasRef} camera={{fov:75, position: [0, 0, 0.5] }}  style={{position:"absolute", width:"640px", height:"480px"}}>
                    <Suspense fallback={<Loader />}>
                    {/* <Model handleClick={() => console.log("clicked on the model")}
                        rotation={[
                            xRotation * Math.PI,
                            yRotation * Math.PI,
                            zRotation * Math.PI
                        ]}
                        position={[xPosition,yPosition,zPosition]}
                        scale={[xScale, yScale, zScale]}
                    ></Model> */}
                    <Model></Model>
                    <OrbitControls ></OrbitControls>
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
