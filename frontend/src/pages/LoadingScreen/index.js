import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";  

export default function LoadingScreen() {
  
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        style={{zIndex: '9999'}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
