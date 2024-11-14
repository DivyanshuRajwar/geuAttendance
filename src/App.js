import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Teacher from "./component/Teacher";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App ">
          <Routes>
            <Route path="/*" element={<Teacher />}></Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
