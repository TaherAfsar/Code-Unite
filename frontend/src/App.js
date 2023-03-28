import { Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import ProblemStatement from "./pages/ProblemStatement";
import Home from "./components/Home";
import NavBar from "./components/navbar";
import Editor from "./components/editor";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={<Home/>}  />
      <Route path="/login" element={<Homepage/>}  />
      {/* <Route path="/home" element={<Home/>} /> */}
      <Route path="/joinroom" element={<JoinRoom/>} />
      <Route path="/createroom" element={<CreateRoom/>} />
      <Route path="/problems" element={<ProblemStatement/>} />
      <Route path="/room/:userId" element={<Editor/>} />
      <Route path="/editor" element={<Editor/>} />
      </Routes>
    </div>
  );
}

export default App;
