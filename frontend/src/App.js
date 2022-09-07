import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                    <Route path="/signup" element={<SignupPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
