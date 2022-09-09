import Video from "../../assets/home.gif";
import bg from "../../assets/background.jpg";
import {
  MainContainer,
  BgContainer,
  VideoBg,
  MainContent,
  Difficulty,
  DifficultContainer,
  Title,
  Button
} from "./MainElements";
import { useState } from "react";
import { handleCreateNewAccount, handleLogin } from "../../services/user_service";

const MainSection = () => {
  const [curDifficulty, setCurDifficulty] = useState("");

  const handleChooseDifficulty = (difficulty) => {
    if (difficulty === curDifficulty) {
      setCurDifficulty("");  
    } else {
      setCurDifficulty(difficulty);
    }
  }

  const handleSubmitMatchRequest = () => {
    handleLogin("test", "test");
    handleCreateNewAccount("test233334", "test");
  }

  return (
    <MainContainer id="home">
      <BgContainer>
        {/* <VideoBg src={Video} type="gif" /> */}
        <VideoBg src={bg} type="img" />
      </BgContainer>

      <MainContent>
        <Title> Choose Your Poison </Title>
        <DifficultContainer>
          <Difficulty state="easy" difficulty={curDifficulty} onClick={() => handleChooseDifficulty("easy")}>Easy</Difficulty>
          <Difficulty state="medium" difficulty={curDifficulty} onClick={() => handleChooseDifficulty("medium")}>Medium</Difficulty>
          <Difficulty state="hard" difficulty={curDifficulty} onClick={() => handleChooseDifficulty("hard")}>Hard</Difficulty>
        </DifficultContainer>
        <Button onClick={handleSubmitMatchRequest}>
          Match 
        </Button>
      </MainContent>
    </MainContainer>
  );
};

export default MainSection;
