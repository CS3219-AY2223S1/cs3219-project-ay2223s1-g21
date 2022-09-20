import {
  Container,
  Title,
  Instruction,
  ExampleTitle,
  Example,
  Constraint
} from "./DescriptionElements";
import InnerHtmlAdder from "../../components/InnerHtmlAdder";
import { Question } from "./Data.js";
import "./markup.css";

export default function Description() {
  return (
    <Container>
      <Title>{Question.title}</Title>
      <Instruction>
        <InnerHtmlAdder innerHtml={Question.instruction} />
      </Instruction>

      {Question.examples.map((example, i) => {
        return (
          <>
            <ExampleTitle>Example {i + 1}</ExampleTitle>
            <Example>
              <strong>Input:</strong> {example.input} <br />
              <strong>Output:</strong> {example.output}
            </Example>
          </>
        );
      })}
      <ExampleTitle>Constraints:</ExampleTitle>
      {Question.constraints.map((constraint, i) => {
        return <Constraint>{constraint}</Constraint>
      })}
    </Container>
  );
}
