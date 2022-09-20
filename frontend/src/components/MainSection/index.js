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
import { useDispatch } from "react-redux";
import { setDifficulty } from "../../redux/actions/matching";
import { useNavigate } from "react-router-dom";

const MainSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [curDifficulty, setCurDifficulty] = useState("");


  const handleChooseDifficulty = (difficulty) => {
    if (difficulty === curDifficulty) {
      setCurDifficulty("");  
    } else {
      setCurDifficulty(difficulty);
    }
  }

  const handleOnClick = () => {
    if(curDifficulty === "") {
      return
    } else {
      dispatch(setDifficulty(curDifficulty));
      navigate("/matching");
    }
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
        <Button onClick={() => handleOnClick()}>
          Match 
        </Button>
      </MainContent>
    </MainContainer>
  );
};

export default MainSection;
