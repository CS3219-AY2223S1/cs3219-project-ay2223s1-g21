import styled from "styled-components";

export const Container = styled.div`
  height: 90%;
  width: 100%;
  background: #171a1b;
  overflow: auto;
  padding-left: 10px;
`;

export const Title = styled.div`
  font-size: 17px;
  color: #dbdbdb;
  font-weight: 600;
  margin-bottom: 10px;
  border-bottom: 1px solid #444a4d;
  padding: 1em 0px;
  width: 90%;
`;

export const Instruction = styled.div`
  font-size: 14px;
  color: #dbdbdb;
  margin-bottom: 10px;
  padding: 1em 0px;
  width: 90%;
`;

export const Example = styled.div`
  white-space: pre-wrap;
  background: #343942;
  padding: 10px 15px;
  color: #c9c2a1;
  line-height: 1.6;
  font-size: 13px;
  border-radius: 3px;
  width: 80%;
  margin-top: 0;
  margin-bottom: 1em;
  overflow: auto;
`;

export const ExampleTitle = styled.div`
  font-weight: 700;
  margin-bottom: 1em;
  margin-top: 0;
  color: #dbdbdb;
`;

export const Constraint = styled.li`
  color: #dbdbdb;
  font-size: 13px;
`;
