import { Container } from "./ResultElements";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { Title } from "../Description/DescriptionElements";

export default function Result() {
  const { isCodeRunning, codeResult } = useSelector(
    (state) => state.collabReducer
  );

  return (
    <Container>
      {isCodeRunning ? (
        <>
          <h2>
            <LinearProgress />
          </h2>
          <div
            style={{
              height: "90%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "grey.500",
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        </>
      ) : (
        <>
          <Title>Execution Result</Title>
          <div
            style={{
              width: "100%",
              height: "80%",
              whiteSpace: "pre-wrap",
              color: "#fff",
            }}
          >
            {codeResult}
          </div>
        </>
      )}
    </Container>
  );
}
