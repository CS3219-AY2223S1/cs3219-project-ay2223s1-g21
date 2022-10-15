import { Container } from "./ResultElements";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { Title } from "../Description/DescriptionElements";
import { createTheme, ThemeProvider } from "@mui/material";

export default function Result() {
  const { isCodeRunning, codeResult } = useSelector(
    (state) => state.collabReducer
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#c9c2a1",
      },
    },
  });

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {isCodeRunning ? (
          <>
            <h2>
              <LinearProgress color="primary" />
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
              <CircularProgress color="primary" />
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
      </ThemeProvider>
    </Container>
  );
}
