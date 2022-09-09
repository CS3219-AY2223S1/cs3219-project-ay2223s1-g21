import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate replace to="/login" />} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/home" element={<Home />} />
                    <Route path="/change_password" element={<ChangePasswordPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
