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

export default function CollaborationPage() {
  const separatorRef = useRef(null);
  const questionRef = useRef(null);
  const embeddedEditorRef = useRef(null);

  useEffect(() => {
    
    const resizableEditorEle = embeddedEditorRef.current;
    const resizerEle = separatorRef.current;
    const editorEleStyles = window.getComputedStyle(resizableEditorEle);
    let width = parseInt(editorEleStyles.width, 10);
    let x = 0;

    // Right resize
    const onMouseMoveRightResize = (event) => {
      event.preventDefault();
      const dx = x - event.clientX;
      x = event.clientX;
      width = width + dx;
   
      resizableEditorEle.style.width = `${width}px`;
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
          style={{ marginRight: "30px" }}
        >
          Exit Session
        </Button>
      </FooterContainer>
    </PgContainer>
  );
}
