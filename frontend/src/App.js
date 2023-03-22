import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import ProblemStatement from "./pages/ProblemStatement";
import Home from "./components/Home";
import NavBar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route path="/" component={Homepage} exact />
      <Route path="/home" component={Home} />
      <Route path="/joinroom" component={JoinRoom} />
      <Route path="/createroom" component={CreateRoom} />
      <Route path="/problems" component={ProblemStatement} />
    </div>
  );
}

export default App;
