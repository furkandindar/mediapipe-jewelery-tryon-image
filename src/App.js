import './App.css';
import { Grid, Box } from '@mui/material';
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
        <Grid container>
          <Grid item xs={0} sm={0} md={2} lg={3} xl={4}/>
          <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
            <WebcamCapture/>
          </Grid>
          <Grid item xs={0} sm={0} md={2} lg={3} xl={4}/>
        </Grid>
  );
}

export default App;
