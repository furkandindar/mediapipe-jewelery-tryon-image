import './App.css';
import { Grid, Box } from '@mui/material';
import WebcamCapture from "./WebcamCapture";


function App() {

  return (
        <Grid container style={{background:"red", overflow:"hidden"}}>
          <Grid item xs={12} sm={12} lg={6} xl={4} style={{background:"green"}}>
            <WebcamCapture/>
          </Grid>
        </Grid>
  );
}

export default App;
