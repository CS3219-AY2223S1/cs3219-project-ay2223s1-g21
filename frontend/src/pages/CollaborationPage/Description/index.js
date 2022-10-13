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
// import { question } from "./Data.js";
import { useSelector } from "react-redux";
import "./markup.css";

export default function Description() {
  const { question } = useSelector((state) => state.collabReducer);

  return (
    <Container>
      <Title>
        {question.title}
        <Difficulty difficulty={question?.difficulty && question.difficulty}>
          {question?.difficulty && question.difficulty}
        </Difficulty>
      </Title>
      <Instruction>
        <InnerHtmlAdder innerHtml={question.instruction} />
      </Instruction>

      {question.examples.map((example, i) => {
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
      <ExampleTitle>Constraints:</ExampleTitle>
      {question.constraints.map((constraint, i) => {
        return (
          <Constraint>
            <InnerHtmlAdder innerHtml={constraint} />
          </Constraint>
        );
      })}
    </Container>
  );
}
