import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  IconButton,
  Input,
  Select,
  Stack,
  useToast,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ButtonGroup } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { MdRefresh } from "react-icons/md";
import AceEditor from "react-ace";
import { socket_global } from "../utils/sockets.js";
import { useLocation } from "react-router-dom";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import API from "../utils/axiosInstance.js";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://api.jdoodle.com/v1/execute";

const defaultCode = 'print("hello world");';

const Editor = () => {
  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const [problemStatement, setProblemStatement] = useState([]);
  const [problemId, setProblemId] = useState("");
  const [language, setLanguage] = useState("python3");
  const [consoleLogs, setConsoleLogs] = useState("");
  const [input, setInput] = useState("");
  const toast = useToast();
  const location = useLocation();
  const currentUrl = location.pathname;
  const roomId = currentUrl.substring(6);
  const [code, setCode] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [ruser, setRuser] = useState("");
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const copyRoomId = () => {
    onCopy();
    setValue(roomId);
  };
  useEffect(() => {
    socket_global.on("remove", (val, id) => {
      console.log(val + id);
      console.log(89789798);
      if (id == roomId && val == userName) {
        const name = val;
        axios
          .post("http://43.204.63.149:5000/api/room/removeuser", {
            roomId,
            name,
          })
          .then(function (response) {});
        navigate("/joinroom");
      }
    });
  }, [ruser]);

  const user = JSON.parse(localStorage.getItem("username"));
  var userName;
  if (user) {
    userName = user.userName;
  }

  useEffect(() => {
    axios
      .get(`http://43.204.63.149:5000/api/room/members/${roomId}`)
      .then(function (response) {
        // console.log(response.data)
        setUsers(response.data);
        console.log(users);
      });
  }, []);

  useEffect(() => {
    fetch(`http://43.204.63.149:5000/api/room/code/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCode(data[0].code);
      })
      .catch((error) => console.error(error));
  }, []);

  const [output, setOutput] = useState("");
  const leaveroom = async () => {
    const name = userName;
    const data = await axios.post("/api/room/removeuser", { roomId, name });
    navigate("/createroom");
    console.log(data);
  };
  const removeUser = (event) => {
    const user = event.target.value;
    console.log(user);
    socket_global.emit("remove", user, roomId);
    setRuser(user);
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const onChangeEditor = (e) => {
    const code = e;
    axios
      .post("/api/room/code", { roomId, code })
      .then(function (response) {
        console.log(response.data.code);
      })
      .catch(function (error) {
        console.log(error);
      });
    socket_global.emit("editor", e, roomId);
  };
  const onChangeInput = (e) => {
    setInput(e);
  };

  useEffect(() => {
    socket_global.on("editor", (msg, id) => {
      if (id == roomId) {
        setCode(msg);
      }
    });
  });
  const handleReset = () => {
    setCode('print("hello world");');
    setConsoleLogs("");
  };

  const submit = () => {
    // let output = problemStatement[7].substring(6);
    console.log(consoleLogs);
    if (
      consoleLogs.trim() == output &&
      problemStatement[1] != localStorage.getItem("problem")
    ) {
      // Get points and then update it
      let username;
      username = userName;
      console.log(username);

      axios
        .post("/api/editor/getPoints", { username })
        .then(function (response) {
          let currentPoints = response.data.points;
          console.log("Current points: ", currentPoints);
          localStorage.setItem("problem", problemStatement[1]);
          // Calculate new points
          let newPoints = currentPoints + 10; // Update points as required
          console.log("New points: ", newPoints);

          // Update points for the user
          axios
            .post("/api/editor/updatePoints", {
              username,
              points: newPoints,
            })
            .then(function (response) {
              console.log("Points updated successfully");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      toast({
        title: "Accepted and points increased",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "bottom",
      });

      console.log("true");
    } else {
      toast({
        title: "Rejected",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // fetch(`${PROXY_URL}"http://localhost:5000/api/editor/problemId"`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: { id: roomId },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  useEffect(() => {
    //Runs on every render
    fetch(`http://43.204.63.149:5000/api/editor/problemId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: roomId,
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        setProblemId(data.problem_id);
        console.log("problemId:");
        if (data.problem_id != "") {
          fetch(
            `http://43.204.63.149:5000/api/problem/fetch/${data.problem_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(Object.values(data), "-----------------");
              setProblemStatement(Object.values(data));
              setInput(Object.values(data)[7].replace("Input", ""));
              setOutput(Object.values(data)[8].replace("Output", ""));
              // console.log(Object.values(data), "00000");
            })
            .catch((error) => console.error(error));
        }
        console.log(data.problem_id);
      })
      .catch((error) => console.error("---------------------------" + error));
  }, []);

  const handleExecute = async () => {
    setConsoleLogs("");
    try {
      let program = {
        script: code,
        language: language,
        versionIndex: "0",
        clientId: "5715b31dddb014988ed4e6b8f1409111",
        clientSecret:
          "d5568ed6f786da78557ab96e073907847f007e721bb0f53effd40b4870caaa84",
      };

      if (language === "python3") {
        program = {
          ...program,
          stdin: input,
        };
      } else if (language === "java") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "3",
          script: { code },
        };
      } else if (language === "nodejs") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "2",
        };
      } else if (language === "ruby") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "3",
        };
      } else if (language === "c") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "0",
        };
      } else if (language === "cpp") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "4",
        };
      } else if (language === "csharp") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "1",
        };
      } else if (language === "swift") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "3",
        };
      } else if (language === "php") {
        program = {
          ...program,
          stdin: input,
          versionIndex: "3",
        };
      }

      // const response = await fetch(`${PROXY_URL}${API_URL}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",           //Accept request from everyone
      //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      //   },
      //   body: JSON.stringify(program),
      // });

      // const data = await response.json();
      // setConsoleLogs([data.output]);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      //  axios.post(
      //   "http://localhost:5000/api/editor/execute/",
      //   program
      //     ).then((response)=>{console.log(response.data.output)}).catch((error)=>{console.log(error)})

      const data = await axios.post(
        "http://43.204.63.149:5000/api/editor/execute/",
        program,
        config
      );
      //  console.log(data.data.output)

      setConsoleLogs(data.data.output);
    } catch (error) {
      console.log(
        "-------------------------------------------------------------------------------"
      );
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to execute the code.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (user != null) {
    return (
      <Box>
        <Box
          d="flex"
          justifyContent="flex-start"
          p="3"
          bg="#9840db"
          w="100%"
          m="70px 0 15px 0"
          borderRadius="10px"
          borderWidth="3"
        >
          <Box w="100%" pr="5">
            <Text
              fontSize="2xl"
              fontFamily="Work sans"
              color="white"
              fontWeight="bold"
            ></Text>
            <Text fontSize="lg" fontFamily="Work sans" color="white" mt="2">
              Difficulty: {problemStatement[4]}
            </Text>
            <Text fontSize="lg" fontFamily="Work sans" color="white" mt="2">
              Title: {problemStatement[2]}
            </Text>
            <Text fontSize="lg" fontFamily="Work sans" color="white" mt="2">
              Problem Statement: {problemStatement[3]}
            </Text>
            <Text fontSize="lg" fontFamily="Work sans" color="white" mt="2">
              Input: {problemStatement[5]}
            </Text>
            <Text fontSize="lg" fontFamily="Work sans" color="white" mt="2">
              Output: <Text color="green.200">{output}</Text>
            </Text>
            <Text fontSize="lg" fontFamily="Work sans" color="white" mt="2">
              Output Format: {problemStatement[6]}
            </Text>

            <Text fontSize="lg" fontFamily="Work sans" color="white" mt="4">
              Testcases: <Text color="green.200">{input}</Text>
            </Text>
          </Box>
        </Box>

        <Box w="100%" p="4" backgroundColor={"#9840db"}>
          <Flex direction={["column", "row"]}>
            <Stack w={["100%", "50%"]} p="2">
              <Flex mb="2">
                <Text mr="2">Language:</Text>
                <Select value={language} onChange={handleLanguageChange}>
                  <option value="python3">Python 3</option>
                  <option value="java">Java</option>
                  <option value="nodejs">JavaScript</option>
                  <option value="ruby">Ruby</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                  <option value="csharp">C#</option>
                  <option value="swift">Swift</option>
                  <option value="php">Php</option>
                </Select>

                <Button
                  colorScheme="red"
                  onClick={copyRoomId}
                  width={"8xl"}
                  ml="3"
                  p="3"
                  maxWidth={"fit-content"}
                >
                  <Text fontSize="xs">
                    {hasCopied ? "Copied!" : "Copy room id"}
                  </Text>
                </Button>
                <Button
                  colorScheme="red"
                  onClick={leaveroom}
                  ml="3"
                  width={"8xl"}
                >
                  Leave room
                </Button>
              </Flex>
              <AceEditor
                mode="python"
                theme="monokai"
                onChange={onChangeEditor}
                value={code}
                width="100%"
                height="400px"
                name="editor"
                editorProps={{ $blockScrolling: true }}
              />
              <Flex mt="4">
                <Button onClick={handleExecute}>Run</Button>
                <IconButton
                  ml="2"
                  aria-label="Reset Code"
                  icon={<MdRefresh />}
                  onClick={handleReset}
                />
                <Button colorScheme="teal" ml="2" onClick={submit}>
                  {" "}
                  Submit
                </Button>
              </Flex>
            </Stack>
            <Stack w={["100%", "50%"]} p="2">
              <Text mb="2">Input</Text>
              <AceEditor
                mode="python"
                theme="monokai"
                onChange={onChangeInput}
                value={input}
                width="75%"
                height="200px"
                name="editor"
                editorProps={{ $blockScrolling: true }}
              />
              <Text mb="2">Output</Text>
              <Box
                borderWidth="1px"
                borderRadius="md"
                p="2"
                h="200px"
                w="75%"
                overflowY="scroll"
              >
                <Text>{consoleLogs}</Text>
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Box>
    );
  } else {
    navigate("/login");
    alert("You are not logged in! or you don't have access to this room");
  }
};

export default Editor;
