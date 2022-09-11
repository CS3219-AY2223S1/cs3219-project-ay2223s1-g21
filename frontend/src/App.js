import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Home from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/PasswordReset";

function App() {
  const { isLoading } = useSelector((state) => state.authReducer);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/passwordReset" element={< ResetPassword />} />
          <Route path="/forget_password" element={< ForgetPassword />} />
          <Route path="/home" element={<PrivateRoute component={Home} fromUrl={"/home"}/>} />
          <Route path="/change_password" element={<PrivateRoute component={ChangePasswordPage} fromUrl={"/change_password"}/>} />
          <Route path="/profile" element={<PrivateRoute component={Profile} fromUrl={"/profile"}/>} /> 
          <Route path="*" element={<PrivateRoute component={Home} fromUrl={"*"}/>} /> 
        </Routes>
      </Router>
      {isLoading && <LoadingScreen />}
    </div>
  );
}

export default App;
