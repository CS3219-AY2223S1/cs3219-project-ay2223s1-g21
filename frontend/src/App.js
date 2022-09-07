import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate replace to="/home" />}></Route>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
