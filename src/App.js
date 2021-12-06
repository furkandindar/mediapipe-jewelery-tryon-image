import './App.css';
import { Grid, Box } from '@mui/material';
import WebcamCapture from "./WebcamCapture";


function App() {

  return (
        <Grid container>
          <Grid item xs={12} sm={12} style={{background:"red"}}>
            <WebcamCapture/>
          </Grid>
        </Grid>
  );
}

export default App;
