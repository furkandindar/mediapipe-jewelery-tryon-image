import './App.css';
import {Hands} from "@mediapipe/hands";
import {useRef, useEffect, Suspense} from "react";
import {useLoader, useFrame, Canvas} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { Grid } from '@mui/material';


const Model = () => {
  const glb = useLoader(GLTFLoader, "./Ring.glb");
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.position.x = (landmark_x - 0.5)*10;
    ref.current.position.y = -(landmark_y - 0.5)*7.5;
  })

  return (
    <>
      <primitive ref={ref} object={glb.scene} scale={5}></primitive>
    </>
  );

};

var landmark_x = -100;
var landmark_y = -100;
imgSource = "https://thumbs.dreamstime.com/b/back-side-woman-hand-showing-five-count-36194782.jpg";

function App() {

  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  function onResults(results){
    console.log(results);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        if (landmarks[14].x !== "undefined") {
          landmark_x = (landmarks[14].x + landmarks[13].x)/2;
          landmark_y = (landmarks[14].y + landmarks[13].y)/2;
          //landmark_z = (landmarks[14].z + landmarks[13].z)/2;
          //scale = landmarks[13].y - landmarks[14].y;
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

    hands.onResults(onResults);

    hands.send({image: imgRef.current});
  });


  return (
    // <>
    //   <img ref={imgRef} src="./woman_hand.jpeg" alt="hand"/>
    //   <Canvas ref={canvasRef}>
    //     <Suspense fallback={null}>
    //     <Model position={[0,0,-3]}></Model>
    //     </Suspense>
    //   </Canvas>
    // </>
    <Grid container direction="column">
      <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid item xs={0} sm={2} md={3} lg={3} xl={4}></Grid>
        <Grid item xs={12} sm={8} md={6} lg={6} xl={4}><img ref={imgRef} src={imgSource} alt="hand"/></Grid>
        <Grid item item xs={0} sm={2} md={3} lg={3} xl={4}></Grid>
      </Grid>
    </Grid>
  );
}

export default App;