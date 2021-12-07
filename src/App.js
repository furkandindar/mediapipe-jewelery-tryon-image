import './App.css';
import { Grid, Box } from '@mui/material';
import WebcamCapture from "./WebcamCapture";


function App() {

  return (
        <Grid container style={{overflowX:"hidden"}}>
          <Grid item xs={12} sm={12} lg={6} xl={4}>
            <WebcamCapture/>
          </Grid>
        </Grid>
  );
}

export default App;
