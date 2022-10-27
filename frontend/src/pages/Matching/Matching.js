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
import { setIsLoading } from "../../redux/actions/auth";
import { handleLogoutAccount } from "../../services/user_service";
import { setLogout } from "../../redux/actions/auth";
import { handleCheckAvaliabilty } from "../../services/collab_service";

export default function MatchingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAvaliable, setIsAvaiable] = useState(null);
  const [cancelTimer, setCancelTimer] = useState(3);
  const [matchTimer, setmatchTimer] = useState(30);
  const [foundMatch, setFoundMatch] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnect] = useState(false);
  const { userId, userEmail, jwtToken } = useSelector(
    (state) => state.authReducer
  );
  const { difficulty } = useSelector((state) => state.matchingReducer);
  const timerCreator = (setter) =>
    setInterval(() => {
      setter((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 1000);

  const LOGIN_ERROR_MSG = "You are not authenticated. Please log in again.";
  const MATCH_ERROR_MSG = "Please try again. Some error occurred. ";
  const ALREADY_IN_ROOM_ERROR_MSG =
    "You are in another session. Please exit before finding a new match";

  const handleLogout = () => {
    dispatch(setIsLoading(true));
    handleLogoutAccount().then((res) => {
      dispatch(setIsLoading(false));
      dispatch(setLogout());
    });
  };

  const closeDialog = () => {
    if (feedbackMessage === LOGIN_ERROR_MSG) {
      handleLogout();
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    handleCheckAvaliabilty(userId).then((response) => {
      const { avaliability } = response.data;
      if (!avaliability) {
        setFeedbackMessage(ALREADY_IN_ROOM_ERROR_MSG);
      } else {
        setIsAvaiable(avaliability);
      }
    });
  }, []);

  useEffect(() => {
    if (isAvaliable) {
      const socket = io(
          process.env.REACT_APP_MATCHING_SERVER_URL, 
        );
      setSocket(socket);

      let cancelMatchTimer;
      if (socket) {
        socket.emit("connection");
        socket.on("connectionSuccess", (message) => {
          setIsConnect(true);
          cancelMatchTimer = timerCreator(setCancelTimer);
        });
      }

      return () => {
        socket.close();
        clearInterval(cancelMatchTimer);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [isAvaliable]);

  useEffect(() => {
    let normalMatchTimer;
    if (isConnected && !cancelTimer) {
      normalMatchTimer = timerCreator(setmatchTimer);
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
        setFeedbackMessage(MATCH_ERROR_MSG + " " + res.message);
      });
    }
    return () => {
      clearInterval(normalMatchTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, cancelTimer, userId, userEmail]);

  return (
    <>
      {isConnected && !cancelTimer ? (
        <MatchingScreen matchTimer={matchTimer} foundMatch={foundMatch} />
      ) : (
        <LoadingScreen />
      )}
      <Dialog open={feedbackMessage}>
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
