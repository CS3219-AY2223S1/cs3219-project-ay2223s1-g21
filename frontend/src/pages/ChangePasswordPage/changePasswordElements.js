import styled from "styled-components"
import backgroundImg from "../../assets/background.jpg";

export const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImg});
  background-position: center;
  background-size: cover;
  position: absolute;
`

export const BackButton = styled.button`
  width: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: auto;
  background: rgba(255,255,255,0.15);
  border: 0;
  outline: none;
  border-radius: 30px;
  color: #fff;
  transform: translateY(200%);

  &:hover {
    box-shadow: '0 0 0 0.2rem #b9abe0';
  }
`

export const Form = styled.div`
  width: 380px;
  height: 450px;
  position: relative;
  margin: 6% auto;
  backdrop-filter: blur(8.5px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background: rgba(255, 255, 255, 0.15);
  padding: 5px;
  overflow: hidden;
`

export const ChangePasswordForm = styled.div`
  width: 380px;
  height: 480px;
  position: relative;
  margin: 10% auto;
  backdrop-filter: blur(8.5px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background: rgba(255, 255, 255, 0.15);
  padding: 5px;
  overflow: hidden;
`

export const TextField = styled.input`
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  /* border-left: 0;
  border-top: 0;
  border-right: 0; */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background: rgba(255, 255, 255, 0.15);
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  backdrop-filter: blur(12rem);
  padding: 1rem;
`

export const SubmitButton = styled.button`
  width: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: auto;
  background: linear-gradient(to bottom, #00ffff 0%, #0099cc 65%);
  border: 0;
  outline: none;
  border-radius: 30px;
  color: #fff;
  transform: translateY(150%);
`

export const FormTitle = styled.h2`
  color: #fff;
  text-align: center;
`

export const FormGrp = styled.form`
  transform: translateY(15%);
  position: absolute;
  width: 280px;
  height: fit-content;
  transition: .5s;
  left: 50px;
`