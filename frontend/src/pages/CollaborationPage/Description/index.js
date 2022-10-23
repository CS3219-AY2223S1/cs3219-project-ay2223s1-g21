import {
  Container,
  Title,
  Instruction,
  ExampleTitle,
  Example,
  Constraint,
  Difficulty,
} from "./DescriptionElements";
import InnerHtmlAdder from "../../../components/InnerHtmlAdder";
import { default_question } from "./Data.js";
import { useSelector } from "react-redux";
import "./markup.css";

export default function Description() {
  const { question } = useSelector((state) => state.matchingReducer);

  const questionToDisplay = question ?? default_question;

  return (
    <Container>
      <Title>
        {questionToDisplay.title}
        <Difficulty
          difficulty={
            questionToDisplay?.difficulty && questionToDisplay.difficulty
          }
        >
          {questionToDisplay?.difficulty && questionToDisplay.difficulty}
        </Difficulty>
      </Title>
      <Instruction>
        <InnerHtmlAdder innerHtml={questionToDisplay.instruction} />
      </Instruction>

      {questionToDisplay.examples.map((example, i) => {
        return (
          <div key={i}>
            <ExampleTitle>Example {i + 1}</ExampleTitle>
            <Example>
              <strong>Input:</strong> {example.input} <br />
              <strong>Output:</strong> {example.output}
            </Example>
          </div>
        );
      })}
      <ExampleTitle>
        {questionToDisplay?.difficulty && "Constraints:"}
      </ExampleTitle>
      {questionToDisplay.constraints.map((constraint, i) => {
        return (
          <Constraint>
            <InnerHtmlAdder innerHtml={constraint} />
          </Constraint>
        );
      })}
    </Container>
  );
}
