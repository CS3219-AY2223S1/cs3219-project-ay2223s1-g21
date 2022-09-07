import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage/SignupPage";
import MatchingPage from "./pages/Matching/Matching";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/signup" />}
          ></Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route element={() => <div>404</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
