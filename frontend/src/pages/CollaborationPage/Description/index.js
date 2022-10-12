import {
  Container,
  Title,
  Instruction,
  ExampleTitle,
  Example,
  Constraint,
  Difficulty
} from "./DescriptionElements";
import InnerHtmlAdder from "../../../components/InnerHtmlAdder";
import { Question } from "../EmbeddedEditor/Data.js";
import "./markup.css";

export default function Description() {
  return (
    <Container>
      <Title>{Question.title} <Difficulty difficulty={Question.difficulty}> {Question.difficulty} </Difficulty></Title>
      <Instruction>
        <InnerHtmlAdder innerHtml={Question.instruction} />
      </Instruction>

      {Question.examples.map((example, i) => {
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
      {Question.constraints.map((constraint, i) => {
        return <Constraint> <InnerHtmlAdder innerHtml={constraint} /></Constraint>
      })}
    </Container>
  );
}
