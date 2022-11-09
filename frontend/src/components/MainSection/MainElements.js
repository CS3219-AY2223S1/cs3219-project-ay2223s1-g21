import styled from "styled-components";

export const MainContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 1007px;
  position: relative;
  z-index: 1;
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
  }
  @media screen and (max-width: 481px) {
    height: 800px;
  }
`;

export const BgContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const MainContent = styled.div`
  width: 380px;
  height: 480px;
  position: relative;
  margin: 6% auto;
  backdrop-filter: blur(8.5px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background: rgba(255, 255, 255, 0.15);
  padding: 5px;
  overflow: hidden;
  border-radius: 5px;
`;

export const DifficultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: fit-content;
  width: 100%;
`


export const Difficulty = styled.div`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: ${({difficulty, state}) => (difficulty === state ? '0 0 0 0.2rem #b9abe0': '0 8px 32px 0 rgba(31, 38, 135, 0.37)')};
  backdrop-filter: ${({difficulty, state}) => (difficulty === state ? 'blur(12rem)': '')};
  border-radius: 2rem;
  width: 80%;
  height: 1rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
  cursor: pointer;
  color: #fff;
`

export const Title = styled.h2`
  margin: 3rem 0 2rem 0;
  color: #fff;
  text-align: center;
`;

export const VideoBg = styled.img`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;


export const Button = styled.button`
  width: 60%;
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
`