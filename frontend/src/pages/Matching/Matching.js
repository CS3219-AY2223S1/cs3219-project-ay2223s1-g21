import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import Page from "../layout/Page";
import { contentBox, progressBox, progressTextBox, timeOutBox } from "./styles";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setRoomId } from "../../redux/actions/matching";

export default function MatchingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelTimer, setCancelTimer] = useState(5);
  const [matchTimer, setmatchTimer] = useState(30);
  const [isTimeout, setTimeOut] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("No match found");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnect] = useState(false);
  const { userId, userEmail, jwtToken } = useSelector(
    (state) => state.authReducer
  );
  const { difficulty } = useSelector((state) => state.matchingReducer);

  useEffect(() => {
    const socket = io(
      `http://localhost:${process.env.REACT_APP_MATCHING_PORT}`
    );
    setSocket(socket);
    return () => {
      socket.emit("cancelMatch", {
        email: userEmail,
        difficulty: difficulty,
        jwtToken: jwtToken,
        userId: userId,
      });
      socket.close();
      console.log("Disconnect Socket");
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("connection");
      socket.on("connectionSuccess", (message) => {
        setIsConnect(true);
        const timer = setInterval(() => {
          setCancelTimer((prevProgress) =>
            prevProgress > 0 ? prevProgress - 1 : 0
          );
        }, 1000);
        return () => {
          clearInterval(timer);
        };
      });
    }
  }, [socket]);

  useEffect(() => {
    if (isConnected && !cancelTimer) {
      socket.emit("findMatch", {
        email: userEmail,
        difficulty: difficulty,
        jwtToken: jwtToken,
        userId: userId,
      });

      socket.on("unauthorized", (res) => {
        navigate("/login");
      });

      socket.on("matchSuccess", (res) => {
        const { interviewId } = res.data;
        console.log("Match Found");
        dispatch(setRoomId(interviewId));
        navigate(`/collab/${interviewId}`);
      });

      socket.on("badRequest", (res) => {
        console.log("BAD REQUEST", res);
        setFeedbackMessage(res.message);
        setTimeOut(true);
      });

      const timer = setInterval(() => {
        setmatchTimer((prevProgress) =>
          prevProgress > 0 ? prevProgress - 1 : 0
        );
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [
    isConnected,
    cancelTimer,
    difficulty,
    jwtToken,
    socket,
    userEmail,
    userId,
  ]);

  useEffect(() => {
    if (!matchTimer) {
      socket.emit("cancelMatch", {
        email: userEmail,
        difficulty: difficulty,
        jwtToken: jwtToken,
        userId: userId,
      });
      setTimeOut(true);
    }
  }, [matchTimer]);

  const returnHomeButton = (text) => (
    <Button
      variant="contained"
      disableElevation
      onClick={() => {
        navigate("/home");
      }}
    >
      {text}
    </Button>
  );

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
          <Typography
            variant={isConnected ? "h2" : "h4"}
            component="div"
            color="white"
          >
            {isConnected
              ? cancelTimer
                ? `${cancelTimer}`
                : `${matchTimer}`
              : "Connecting to the server"}
          </Typography>
        </Box>
      </Box>

      {isConnected ? (
        cancelTimer ? (
          returnHomeButton("Cancel match")
        ) : (
          <Box
            sx={{
              position: "relative",
              paddingTop: "10%",
            }}
          >
            <Typography variant="h6" color="white">
              {"Finding a match , please wait"}
            </Typography>
          </Box>
        )
      ) : (
        <></>
      )}
    </Box>
  );

  const timeOutScreen = (
    <Box sx={timeOutBox}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", width: "250px" }}
        color="white"
      >
        {feedbackMessage}
      </Typography>
      {returnHomeButton("Return to home")}
    </Box>
  );

  return (
    <Page>
      {!isTimeout && loadingScreen}
      {isTimeout && timeOutScreen}
    </Page>
  );
}

export const Button = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: auto;
  background: linear-gradient(to bottom, #00ffff 0%, #0099cc 65%);
  border: 0;
  outline: none;
  border-radius: 30px;
  color: #fff;
  transform: translateY(3rem);
`;
