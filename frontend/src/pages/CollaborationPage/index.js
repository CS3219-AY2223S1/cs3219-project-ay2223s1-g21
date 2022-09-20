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
import Button from '@mui/material/Button';

export default function CollaborationPage() {
  return (
    <PgContainer>
      <HeaderContainer>
        <Logo>PeerPrep</Logo>
        <MenuItems>
          <Item>Logout</Item>
        </MenuItems>
      </HeaderContainer>
      <ContentContainer>
        <QuestionContainer>
          <QuestionSection />
        </QuestionContainer>
        <MiddleSeparator />
        <EmbeddedEditor />
      </ContentContainer>
      <FooterContainer>
        <Button variant="outlined" color="error" style={{marginRight: "30px"}}>
          Exit Session
        </Button>
      </FooterContainer>
    </PgContainer>
  );
}
