import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Home from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import MatchingPage from "./pages/Matching/Matching";

function App() {
  const { isLoading } = useSelector((state) => state.authReducer);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route
            path="/change_password"
            element={<PrivateRoute component={ChangePasswordPage} />}
          />
          <Route path="/matching" element={<PrivateRoute component={MatchingPage} />} />
          <Route path="*" element={<PrivateRoute component={Home} />} />
        </Routes>
      </Router>
      {isLoading && <LoadingScreen />}
    </div>
  );
}

export default App;
