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
            {example.image && (
              <img
                style={{ maxWidth: "85%", margin: "20px 0 20px 0" }}
                src={`data:image/png;base64, ${example.image}`}
                alt="instruction"
              />
            )}
            <Example>
              <strong>Input:</strong> {example.input} <br />
              <strong>Output:</strong> {example.output}
            </Example>
          </div>
        );
      })}
      <ExampleTitle>{question?.difficulty && "Constraints:"}</ExampleTitle>
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
