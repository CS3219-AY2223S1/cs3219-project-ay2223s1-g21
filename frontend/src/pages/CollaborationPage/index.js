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
import { useRef } from "react";
import { useEffect } from "react";
import {Widget} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import "./chat.css";
import { fetchQuestion } from "../../services/user_service";

export default function CollaborationPage() {
  const separatorRef = useRef(null);
  const questionRef = useRef(null);
  const embeddedEditorRef = useRef(null);

  useEffect(() => {
    // question fetch
    fetchQuestion.then(res => )


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

    // Add mouse down event listener
    
    resizerEle.addEventListener("mousedown", onMouseDownRightResize);
    return () => {
      resizerEle.removeEventListener("mousedown", onMouseDownRightResize);
    };
  }, [])

  return (
    <PgContainer>
      <HeaderContainer>
        <Logo>PeerPrep</Logo>
        <MenuItems>
          <Item>Logout</Item>
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
          style={{ marginLeft: "30px" }}
        >
          Exit Session
        </Button>
        <Widget
          // handleNewUserMessage={this.handleNewUserMessage}
          // handleQuickButtonClicked={this.handleQuickButtonClicked}
          // profileAvatar={'text'}
          // title="Chat"
          subtitle="Chat here"
        />
      </FooterContainer>
    </PgContainer>
  );
}
