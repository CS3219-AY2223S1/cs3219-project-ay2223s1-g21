import Video from "../../assets/home.gif";
import bg from "../../assets/background.jpg"
import {
  MainContainer,
  BgContainer,
  VideoBg,
  MainContent,
} from "./MainElements";

const MainSection = () => {

  return (
    <MainContainer id="home">
      <BgContainer>
        {/* <VideoBg src={Video} type="gif" /> */}
        <VideoBg src={bg} type="img" />
      </BgContainer>
      <MainContent>
        
      </MainContent>
    </MainContainer>
  );
};

export default MainSection;