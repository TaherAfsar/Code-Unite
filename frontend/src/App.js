import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
// import ProblemStatement from "./components/ProblemStatement";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/joinroom" component={JoinRoom} />
      <Route path="/createroom" component={CreateRoom} />
      {/* <Route path="/problems" component={ProblemStatement} /> */}
      <Home />
    </div>
  );
}

export default App;
