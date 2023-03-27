import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import AceEditor from "react-ace";
import { socket_global } from "../utils/sockets.js";


import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://api.jdoodle.com/v1/execute";

const defaultCode = 'print("hello world");';

const Editor = () => {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState("python3");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const toast = useToast();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const onChangeEditor = (e) => {
    socket_global.emit("editor", e);
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
          stdin: "1",
        };
      } else if (language === "java") {
        program = {
          ...program,
          stdin: "",
          versionIndex: "3",
          script: { code },
        };
      }

      //  else if (language === "java") {
      //   program = {
      //     ...program,
      //     stdin: "",
      //     versionIndex: "3",
      //     script: `public class Main { public static void main(String[] args) { ${code} } }`,
      //   };
      // }
      else if (language === "nodejs") {
        program = {
          ...program,
          stdin: "",
          versionIndex: "2",
        };
      } else if (language === "ruby") {
        program = {
          ...program,
          stdin: "",
          versionIndex: "3",
        };
      } else if (language === "c") {
        program = {
          ...program,
          stdin: "",
          versionIndex: "0",
        };
      } else if (language === "cpp") {
        program = {
          ...program,
          stdin: "",
          versionIndex: "4",
        };
      } else if (language === "csharp") {
        program = {
          ...program,
          stdin: "",
          versionIndex: "1",
        };
      } else if (language === "swift") {
        program = {
          ...program,
          stdin: "",
          versionIndex: "3",
        };
      } else if (language === "php") {
        program = {
          ...program,
          stdin: "",
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
          <Text mb="2">Console Logs:</Text>
          <Box
            borderWidth="1px"
            borderRadius="md"
            p="2"
            h="400px"
            overflowY="scroll"
          >
            {consoleLogs.map((log, index) => (
              <Text key={index}>{log}</Text>
            ))}
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Editor;