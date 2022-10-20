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
import { useCallback, useRef } from "react";
import { useEffect } from "react";
import { Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "./chat.css";
import { fetchQuestion } from "../../services/question_service";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestion,
  setIsCodeRunning,
  setTab,
  setCodeExecutionResult,
} from "../../redux/actions/collab";
import { setIsLoading, setLogout } from "../../redux/actions/auth";
import { handleLogoutAccount } from "../../services/user_service";
import {
  getCompilationResult,
  requestCompilation,
} from "../../services/compile_service";

export default function CollaborationPage() {
  const separatorRef = useRef(null);
  const questionRef = useRef(null);
  const embeddedEditorRef = useRef(null);
  const dispatch = useDispatch();
  const { difficulty } = useSelector((state) => state.matchingReducer);
  const { curMode, code, isCodeRunning } = useSelector(
    (state) => state.collabReducer
  );

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
        submitCompileReqCallback(curMode, code);
      }
    };

    document.addEventListener("keydown", onCtrlEnterKeyDown);
    return () => {
      document.removeEventListener("keydown", onCtrlEnterKeyDown);
    };
  }, [code, curMode, submitCompileReqCallback]);

  useEffect(() => {
    // question fetch
    dispatch(setIsLoading(true));
    fetchQuestion(difficulty)
      .then((res) => {
        console.log(res);
        dispatch(setQuestion(res.data[0]));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });

    // draggable event listeners
    const resizableEditorEle = embeddedEditorRef.current;
    const resizerEle = separatorRef.current;
    const questionEle = questionRef.current;
    const editorEleStyles = window.getComputedStyle(resizableEditorEle);
    let qWidth = parseInt(window.getComputedStyle(questionEle).width, 10);
    let width = parseInt(editorEleStyles.width, 10);
    let x = 0;

    // Right resize
    const onMouseMoveRightResize = (event) => {
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

    return () => {
      resizerEle.removeEventListener("mousedown", onMouseDownRightResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    dispatch(setIsLoading(true));
    handleLogoutAccount().then((res) => {
      dispatch(setIsLoading(false));
      dispatch(setLogout());
    });
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
        <Button variant="outlined" color="error" style={{ marginLeft: "30px" }}>
          Exit Session
        </Button>
        <Widget
          // handleNewUserMessage={handleNewUserMessage}
          subtitle="Chat here"
        />
      </FooterContainer>
    </PgContainer>
  );
}
