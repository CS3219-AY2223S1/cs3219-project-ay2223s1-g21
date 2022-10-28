import styled from "styled-components";
import backgroundImg from "../../assets/background.jpg";

export const Container = styled.div`
  height: 100vh;
`;

/* add before styles */

export const Background = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${backgroundImg});
  background-position: center;
  background-size: cover;
  position: absolute;
`;

export const GrpContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 50%;
  height: 70%;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

export const HistoryContainer = styled.div`
  overflow: hidden;
  border-radius: 5px;
  transition: 0.5s;
  width: 90%;
  position: absolute;
  left: 200%;
  transform: translateX(-50%);
`;

export const Profile = styled.div`
  width: 380px;
  height: 480px;
  backdrop-filter: blur(8.5px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.30);
  background: rgba(255, 255, 255, 0.04);
  padding: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.5s;
`;

export const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  transform: translateX(135%);
  margin-top: 15%;
`;

export const ProfileDescription = styled.div`
  transform: translateY(100%);
  margin-left: 15%;
  color: #fff;
  font-size: 20px;
  font-family: "Open Sans";
`;

export const Divider = styled.div`
  width: 80%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15%;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  backdrop-filter: blur(25px);
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  display: flex;
  width: 90%;
  right: 1rem;
  justify-content: space-between;
`;

export const TransitionButtonContainer = styled.div`
  position: absolute;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;
