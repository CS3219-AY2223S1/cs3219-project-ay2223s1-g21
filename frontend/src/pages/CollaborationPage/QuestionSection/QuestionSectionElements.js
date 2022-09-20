import styled from "styled-components";

export const Bar = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    -webkit-box-pack: start;
    background #1b1d1e;
`;

export const BarText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  position: relative;
  background: ${({ curSelected, text }) => (curSelected === text ? "#171a1b" : "#1b1d1e")};
  border-bottom: ${({ curSelected, text }) => (curSelected === text ? "none" : "1px solid #444a4d")};
  flex: 0 1 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(55, 71, 79);
  cursor: pointer;
  height: 40px;
  font-size: 15px;
  max-width: 160px;
  color: #7a7e70;
  text-align: center;
`;
