import './App.css';
import { Grid } from '@mui/material';
import WebcamCapture from "./WebcamCapture";


function App() {

  // const imgRef = useRef(null);
  // const canvasRef = useRef(null);

  // function onResults(results){
  //   canvasRef.current.width = imgRef.current.width;
  //   canvasRef.current.height = imgRef.current.height;

  //   console.log(imgRef);
  //   console.log(canvasRef);
  //   if (results.multiHandLandmarks) {
  //     for (const landmarks of results.multiHandLandmarks) {
  //       if (landmarks[14].x !== "undefined") {
  //         landmark_x = (landmarks[14].x + landmarks[13].x)/2;
  //         landmark_y = (landmarks[14].y + landmarks[13].y)/2;
  //         //landmark_z = (landmarks[14].z + landmarks[13].z)/2;
  //         //scale = landmarks[13].y - landmarks[14].y;
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   const hands = new Hands({
  //     locateFile:(file) =>{
  //       return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  //     }
  //   });

  //   hands.setOptions({
  //     maxNumHands: 2,
  //     modelComplexity: 1,
  //     minDetectionConfidence: 0.5,
  //     minTrackingConfidence: 0.5,
  //   });

  //   hands.onResults(onResults);

  //   hands.send({image: imgRef.current});
  // });


  return (
    <Grid container direction="column">
      <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={4}></Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={4}>
              {/* <img ref={imgRef} src="woman_hand.jpeg" style={{width:"480px", height:"640px", position:"absolute"}} alt="hand"/>
              <Canvas style={{width:"480px", height:"640px", position:"absolute"}} ref={canvasRef}>
                <Suspense fallback={null}>
                <Model position={[0,0,-3]}></Model>
                </Suspense>
              </Canvas> */}
              <WebcamCapture></WebcamCapture>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={4}></Grid>
      </Grid>
    </Grid>
  );
}

export default App;
