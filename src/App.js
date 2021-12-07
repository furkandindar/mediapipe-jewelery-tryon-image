import './App.css';
import { Grid} from '@mui/material';
import WebcamCapture from "./WebcamCapture";


function App() {

  return (
          <Grid container>
          <Grid item xs={12} sm={12} lg={6} xl={4} style={{overflowX:"hidden", background:"green"}}>
            <WebcamCapture/>
          </Grid>
        </Grid>
  );
}

export default App;
