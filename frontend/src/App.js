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
import Editor from "./components/editor";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Homepage} exact />
      <Route path="/home" component={Home} />
      <Route path="/joinroom" component={JoinRoom} />
      <Route path="/createroom" component={CreateRoom} />
      <Route path="/problems" component={ProblemStatement} />
      <Route path="/editor" component={Editor} />
    </div>
  );
}

export default App;
