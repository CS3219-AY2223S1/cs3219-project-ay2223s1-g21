import styled from "styled-components";


export const PgContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #171a1b;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #444a4d;
  border-bottom: 1px solid #444a4d;
  background: #1b1d1e;
  height: 80%;
`;

export const QuestionContainer = styled.div`
  flex: 1 1 1;
  height: 100%;
  max-width: 70%;
  width: 50%;
  min-width: 30%;
`;

export const MiddleSeparator = styled.div`
  width: 2%;
  height: 100%;
  cursor: col-resize;
  margin: 0px 15px 0px 15px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
`;

export const Logo = styled.div`
  color: white;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

export const MenuItems = styled.div`
  display: flex;
  align-items: center;
  list-style-type: none;
  text-align: center;
  margin-left: -80px;
`;

export const Item = styled.div`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  border: 1px solid #444a4d;

  &:hover {
    background-color: #272822;
  }
`;

export const FooterContainer = styled.div`
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`