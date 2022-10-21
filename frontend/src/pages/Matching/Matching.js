import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoomId } from "../../redux/actions/matching";
import MatchingScreen from "./MatchingScreen";
import LoadingScreen from "./LoadingScreen";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function MatchingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelTimer, setCancelTimer] = useState(10);
  const [matchTimer, setmatchTimer] = useState(30);
  const [foundMatch, setFoundMatch] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
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

  const LOGIN_ERROR_MSG = "You are not authenticated. Please log in again.";
  const MATCH_ERROR_MSG = "Some error occurred. Please try again.";

  useEffect(() => {
    if (isConnected && !cancelTimer) {
      socket.emit("findMatch", {
        email: userEmail,
        difficulty: difficulty,
        jwtToken: jwtToken,
        userId: userId,
      });

      socket.on("unauthorized", (res) => {
        setFeedbackMessage(LOGIN_ERROR_MSG);
      });

      socket.on("matchSuccess", async (res) => {
        const { interviewId } = res.data;
        console.log("Match Found");
        setFoundMatch(true);
        dispatch(setRoomId(interviewId));
        await new Promise((r) => setTimeout(r, 2000));
        navigate(`/collab/${interviewId}`);
      });

      socket.on("badRequest", (res) => {
        console.log("BAD REQUEST", res);
        setFeedbackMessage(MATCH_ERROR_MSG);
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
    jwtToken,
    socket,
    userEmail,
    userId,
    dispatch,
    difficulty,
    navigate,
  ]);

  useEffect(() => {
    if (!matchTimer) {
      socket.emit("cancelMatch", {
        email: userEmail,
        difficulty: difficulty,
        jwtToken: jwtToken,
        userId: userId,
      });
    }
  }, [matchTimer, difficulty, jwtToken, userId, socket, userEmail]);

  const closeDialog = () => {
    if (feedbackMessage === MATCH_ERROR_MSG) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {isConnected && !cancelTimer ? (
        <MatchingScreen matchTimer={matchTimer} foundMatch={foundMatch} />
      ) : (
        <LoadingScreen />
      )}
      <Dialog open={feedbackMessage} onClose={closeDialog}>
        <DialogTitle>Bad Request</DialogTitle>
        <DialogContent>
          <DialogContentText>{feedbackMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
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
