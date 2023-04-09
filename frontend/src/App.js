import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import ProblemStatement from "./pages/ProblemStatement";
import Signout from "./components/authentication/Signout";
import login from "./components/authentication/Login";
import NavBar from "./components/navbar";
import Editor from "./components/editor";
import { Room } from "./components/Room";
import Admin from "./components/Admin";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Homepage />} />
        <Route path="signout" element={<Signout />} />
        <Route path="/joinroom" element={<JoinRoom />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/problems" element={<ProblemStatement />} />
        <Route path="/room/:userId" element={<Room />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
