import { useState, useEffect } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import AceEditor from "react-ace";
import { socket_global } from "../utils/sockets.js";
import { useLocation } from "react-router-dom";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://api.jdoodle.com/v1/execute";

const defaultCode = 'print("hello world");';

const Editor = () => {
  const [problemStatement, setProblemStatement] = useState(
    "Get Connected to CodeUnite"
  );
  const [problemId, setProblemId] = useState("");
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState("python3");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();
  const location = useLocation();
  const currentUrl = location.pathname;
  const roomId = currentUrl.substring(6);
  console.log(roomId);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const onChangeEditor = (e) => {
    setCode(e);
    socket_global.emit("editor", e);
  };
  const onChangeInput = (e) => {
    setInput(e);
    console.log(input);
  };
  useEffect(() => {
    socket_global.on("editor", (msg) => {
      setCode(msg);
    });
  });
  const handleReset = () => {
    setCode(defaultCode);
    setConsoleLogs([]);
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
  fetch(`${PROXY_URL}http://localhost:5000/api/editor/problemId`, {
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
      setProblemId(data.problem_id); // assuming you have a state variable named problemId
    })
    .catch((error) => console.error(error));

  const handleExecute = async () => {
    setConsoleLogs([]);

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
      }

      //  else if (language === "java") {
      //   program = {
      //     ...program,
      //     stdin: input,
      //     versionIndex: "3",
      //     script: `public class Main { public static void main(String[] args) { ${code} } }`,
      //   };
      // }
      else if (language === "nodejs") {
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

      const response = await fetch(`${PROXY_URL}${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
      });

      const data = await response.json();

      setConsoleLogs([data.output]);
    } catch (error) {
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

  return (
    <Box>
      <Box
        d="flex"
        justifyContent="flex-start"
        p={"3"}
        bg={"#9840db"}
        w="100%"
        m="70px 0 15px 0"
        borderRadius={"10px"}
        borderWidth="3"
      >
        <Text fontSize="3xl" fontFamily="Work sans" color="white">
          {problemStatement}
        </Text>
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
              {consoleLogs.map((log, index) => (
                <Text key={index}>{log}</Text>
              ))}
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Editor;
