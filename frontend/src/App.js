import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Home from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";
import LoginPage from "./pages/LoginPage";


function App() {
  const isLoading = useSelector(state => state.authReducer.isLoading);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/change_password" element={<ChangePasswordPage />} />
        </Routes>
      </Router>
      {isLoading && <LoadingScreen />}
    </div>
  );
}

export default App;
