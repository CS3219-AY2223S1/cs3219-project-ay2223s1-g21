import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Page from "../layout/Page";
import { contentBox, progressBox, progressTextBox } from "./styles";
import { URL_CANCEL_MATCH } from "../../configs";
import axios from "axios";
import { Button } from "@mui/material";

export default function MatchingPage() {
  const [progress, setProgress] = useState(3);
  const [isTimeout, setTimeOut] = useState(false);

  const cancelMatchRequest = async () => {
    await axios.post(URL_CANCEL_MATCH, {}).finally(() => {
      setTimeOut(true);
    });
  };

  useEffect(() => {
    if (!progress) cancelMatchRequest();
  }, [progress]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const loadingScreen = (
    <Box sx={contentBox}>
      <Box sx={progressBox}>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            display: "flex",
            color: "#308fe8",
            animationDuration: "550ms",
          }}
          size={300}
          thickness={2}
        />
        <Box sx={progressTextBox}>
          <Typography variant="h2" component="div" color="text.secondary">
            {`${progress}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          paddingTop: "10%",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {"Finding a match , please wait"}
        </Typography>
      </Box>
    </Box>
  );

  const timeOutScreen = (
    <Box sx={contentBox}>
      <Typography variant="h6" sx={{ textAlign: "center" }} color="white">
        {"Unfortunately , no match has been found"}
      </Typography>
      <Button
        variant="contained"
        sx={{ margin: "auto" }}
        disableElevation
        onClick={() => {
          window.location.href = "/signup";
        }}
      >
        Disable elevation
      </Button>
    </Box>
  );

  return (
    <Page>
      {!isTimeout && loadingScreen}
      {isTimeout && timeOutScreen}
    </Page>
  );
}
