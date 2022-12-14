import styled from "styled-components";

export const FAQContainer = styled.div`
  height: 1100px;
  background: #010606;
  padding: 5%;
  
  @media screen and (max-width: 450px) and (max-height: 900px) {
    height: 1000px;
  }
`;

export const FAQH1 = styled.h1`
  font-size: 3rem;
  color: #fff;

  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 450px) and (max-height: 900px) {
    margin-top: 0;
  }
`;

export const BlockContainer = styled.div`
  display: flex;
  with: 100vw;
  height: 60%;
  justify-content: center;
  align-items: center;
`

export const FAQWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

export const FAQSet = styled.div`
  background-color: #203042;
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  box-shadow: 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  grid-area: qns;
  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;

export const Question = styled.div`
  color: #fff;
  font-size: 1;
  display: flex;
  justify-content: space-between;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  padding-top: 10px;
  flex-grow: 1;
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const OpenIcon = styled.div`
  font-size: 1rem;
`;

export const Answer = styled.p`
  height: ${({ isOpen, index }) => (isOpen === index ? "auto" : "0")};
  flex-grow: ${({ isOpen, index }) => (isOpen === index ? "0" : "1")};
  overflow: hidden;
  margin-top: 1rem;
  color: #29e3c1;
  font-size: ${({ isOpen, index }) => (isOpen === index ? "0.9rem" : "0")};
  border-left-style: solid;
  border-left-color: #8fc468;
  padding-left: 0.4rem;
  background-color: #0e182e;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.2s ease-in-out;
  padding: ${({ isOpen, index }) => (isOpen === index ? "0.5rem" : "0")};
  vertical-align: center;
  cursor: pointer;
`;

export const Image = styled.img`
  margin-right: 5%;
`;