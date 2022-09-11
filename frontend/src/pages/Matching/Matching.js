import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Page from "../layout/Page";
import { contentBox, progressBox, progressTextBox } from "./styles";
import { Button } from "@mui/material";
import io from 'socket.io-client';

export default function MatchingPage() {
  const [progress, setProgress] = useState(30);
  const [isTimeout, setTimeOut] = useState(false);
  const [socket , setSocket] = useState(null);
  const [isConnected , setIsConnect] = useState(false);

  useEffect(() => {
    const socket = io(`http://localhost:${process.env.REACT_APP_MATCHING_PORT}`)
    setSocket(socket);
    return () => { socket.emit("disconnect"); socket.close()};
  }, [setSocket]);

  useEffect(() => {
    if(socket) {
      socket.emit("connection");
      socket.on("connectionSuccess", (message) => {
        setIsConnect(true);
      })
    }
  }, [socket])

  useEffect(() => {
    if(isConnected) {
      const emailAddrs = ["John", "Emily", "Alex"]
      const e = emailAddrs[Math.floor(Math.random() * 3)];

      socket.emit("findMatch", {email: e, difficulty: "hard"})
      socket.on("matchSuccess", (res) => {
        const {interviewId} = res.data
        window.location.href = `/room/${interviewId}`;
      })
      socket.on("matchFailed", (res) => {
        console.log("Failure to find a match");
        setTimeOut(true)
      });
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isConnected])

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
