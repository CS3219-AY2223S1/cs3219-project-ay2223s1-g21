import styled from "styled-components";


export const EditorContainer = styled.div`
  height: 100%;
  flex: 1 1 1;
  max-width: 80%;
  min-width: 20%;
`;

export const Bar = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background #1b1d1e;
    height: 50px;
`;

export const BarItem = styled.div`
  text-overflow: ellipsis;
  position: relative;
  background: #1b1d1e;
  flex: 1 1 140px;
  margin: 10px;
  display: flex;
  justify-content: center;
  border: 1px solid #c9c2a1;
  border-radius: 10px;
  align-items: center;
  color: #517179;
  cursor: pointer;
  font-size: 15px;
  max-width: 100px;
  color: #c9c2a1;
  text-align: center;

  &:hover {
    background-color: #272822;
  }
`;
