import {
  PgContainer,
  ContentContainer,
  QuestionContainer,
  MiddleSeparator,
  HeaderContainer,
  MenuItems,
  Logo,
  Item,
  FooterContainer,
} from "./CollabElements";
import EmbeddedEditor from "./EmbeddedEditor";
import QuestionSection from "./QuestionSection";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { addResponseMessage, dropMessages, Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsCodeRunning,
  setTab,
  setCodeExecutionResult,
  setQuestion,
  resetCollabPg,
} from "../../redux/actions/collab";
import { setIsLoading, setLogout } from "../../redux/actions/auth";
import { updateHistory } from "../../services/user_service";
import {
  getCompilationResult,
  requestCompilation,
} from "../../services/compile_service";
import io from "socket.io-client";
import { connect, disconnect } from "./store";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";
import { useSyncedStore } from "@syncedstore/react";
import { store } from "./store";

export default function CollaborationPage() {
  const navigate = useNavigate();
  const separatorRef = useRef(null);
  const questionRef = useRef(null);
  const embeddedEditorRef = useRef(null);
  const voiceChatRef = useRef(null);
  const dispatch = useDispatch();
  const { isCodeRunning } = useSelector(
    (state) => state.collabReducer
  );
  const { userId, jwtToken } = useSelector((state) => state.authReducer);
  const { roomId, difficulty } = useSelector((state) => state.matchingReducer);
  const [peer, setPeer] = useState(false);
  const [ioSocket, setIoSocket] = useState(null);

  const submitCompileRequest = async (curMode, curCode) => {
    if (!isCodeRunning) {
      dispatch(setTab("Result"));
      dispatch(setIsCodeRunning(true));
      requestCompilation(curMode.toUpperCase(), curCode)
        .then((res) => {
          getCompilationResult(res.data.resultUrl)
            .then((res) => {
              dispatch(setCodeExecutionResult(res.data));
              dispatch(setIsCodeRunning(false));
            })
            .catch((err) => {
              dispatch(setCodeExecutionResult(err.response.data.message));
              dispatch(setIsCodeRunning(false));
            });
        })
        .catch((err) => {
          dispatch(setCodeExecutionResult(err.response.data.message));
          dispatch(setIsCodeRunning(false));
        });
    }
  };

  const submitCompileReqCallback = useCallback(submitCompileRequest, [
    dispatch,
    isCodeRunning,
  ]);

  useEffect(() => {
    const onCtrlEnterKeyDown = (event) => {
      if (event.keyCode === 13 && event.ctrlKey) {
        submitCompileReqCallback(state.collab["lang-" + roomId], state.collab["code-" + roomId]);
      }
    };

    document.addEventListener("keydown", onCtrlEnterKeyDown);
    return () => {
      document.removeEventListener("keydown", onCtrlEnterKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCompileReqCallback]);

  useEffect(() => {
    // draggable event listeners
    const resizableEditorEle = embeddedEditorRef.current;
    const editorEleStyles = window.getComputedStyle(resizableEditorEle);
    const resizerEle = separatorRef.current;
    const questionEle = questionRef.current;
    let qWidth = parseInt(window.getComputedStyle(questionEle).width, 10);
    let width = parseInt(editorEleStyles.width, 10);
    let x = 0;

    // Right resize
    const onMouseMoveRightResize = (event) => {
      dispatch(setIsLoading(true))
      event.preventDefault();
      const dx = 1.5 * (x - event.clientX);
      width = width + dx;
      qWidth = qWidth - dx;
      questionEle.style.width = `${qWidth}px`;
      resizableEditorEle.style.width = `${width}px`;
      x = event.clientX;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Add event listeners
    resizerEle.addEventListener("mousedown", onMouseDownRightResize);

    // Socket io method
    const socket = io(process.env.REACT_APP_COLLAB_SERVER_URL, {
      transports: ["websocket"],
    });
    socket.on("connectionSuccess", () => {
      setIoSocket(socket);
    });

    const peer = new Peer(`${roomId}-${userId}`);
    console.log("Peer Id :", peer.id);
    setPeer(peer);

    connect();
    return () => {
      resizerEle.removeEventListener("mousedown", onMouseDownRightResize);

      //socket io cleanup
      console.log("Disconnect Socket");
      socket.close();
      peer.destroy();
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = useSyncedStore(store);
  
  const handleLogout = () => {
    dispatch(setIsLoading(true));
    dispatch(setIsLoading(false));
    dispatch(setLogout());
  };

  useEffect(() => {
    dispatch(setIsLoading(true))
    if (ioSocket && !ioSocket.connected) {
      disconnect();
      navigate("/home");
    }
    if (ioSocket && peer) {
      ioSocket.emit("joinRoom", { roomId, userId, difficulty });

      peer.on("connection", () => {
        console.log("Someone is connecting to me");
      });

      peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on("stream", (remoteStream) => {
              console.log("Got stream", remoteStream);
              voiceChatRef.current.srcObject = remoteStream;
              voiceChatRef.current.play();
            });
          })
          .catch((err) => {
            console.error("Failed to get local stream", err);
          });
      });

      ioSocket.on("joinSuccessFirst", () => {
        ioSocket.emit("TriggerFetchQn", { roomId, difficulty });
      });

      ioSocket.on("joinSuccess", () => {
        ioSocket.emit("startCall", {
          peerid: peer.id,
          roomId: roomId,
        });
      });

      ioSocket.on("recieveQn", (question) => {
        console.log("Recieved Question");
        dispatch(setQuestion(JSON.parse(question)));
        updateHistory(userId, jwtToken, question);
        dispatch(setIsLoading(false))
      });

      ioSocket.on("callPeer", (peerId) => {
        if (peerId !== peer.id) {
          navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((stream) => {
              console.log("New Call Request", peerId);
              const call = peer.call(peerId, stream);
              call.on("stream", (remoteStream) => {
                console.log("Got stream", remoteStream);
                voiceChatRef.current.srcObject = remoteStream;
                voiceChatRef.current.play();
              });
            });
        }
      });

      ioSocket.on("alreadyInRoom", () => {
        console.log("Already in Room");
        disconnect();
        navigate("/home");
      });

      ioSocket.on("newChatMsg", (data) => {
        console.log("Received new chat message", data);
        const { userId: id, newMessage } = data;
        if (id && id !== userId) {
          addResponseMessage(newMessage);
        }
      });

      ioSocket.on("leaveRoom", () => {
        alert("A participant has left the room");
      });

      ioSocket.on("badRequest", () => {
        navigate("/home");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ioSocket, peer]);

  const handleNewUserMessage = (newMessage) => {
    ioSocket.emit("sendChatMsg", { roomId, userId, newMessage });
  };

  const handleExitSession = () => {
    ioSocket.emit("exitRoom", { roomId });
    dropMessages();
    dispatch(resetCollabPg());
    navigate("/home");
  };

  const handleNewQuestion = () => {
    dispatch(setIsLoading(true))
    ioSocket.emit("TriggerFetchQn", { roomId, difficulty });
  };

  return (
    <PgContainer>
      <HeaderContainer>
        <Logo>PeerPrep</Logo>
        <MenuItems>
          <Item onClick={handleLogout}>Logout</Item>
        </MenuItems>
      </HeaderContainer>
      <ContentContainer>
        <QuestionContainer ref={questionRef}>
          <QuestionSection />
        </QuestionContainer>
        <MiddleSeparator ref={separatorRef} />
        <EmbeddedEditor editorRef={embeddedEditorRef} />
      </ContentContainer>
      <FooterContainer>
        <Button
          variant="outlined"
          color="error"
          onClick={handleExitSession}
          style={{ marginLeft: "30px" }}
        >
          Exit Session
        </Button>
        <Button
          variant="outlined"
        
          onClick={handleNewQuestion}
          style={{ marginLeft: "30px" }}
        >
          New Question
        </Button>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          subtitle="Chat here"
          emojis={true}
          senderPlaceHolder={"Type your message here..."}
        />
      </FooterContainer>
      <audio ref={voiceChatRef}></audio>
    </PgContainer>
  );
}
