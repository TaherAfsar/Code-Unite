import React, { useState } from "react";
import AceEditor from "react-ace";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-csharp";

import "ace-builds/src-noconflict/theme-monokai";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("javascript");
  const [output, setOutput] = useState("");

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const executeCode = () => {
    try {
      const result = eval(code);
      setOutput(result.toString());
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <Box
      mt={8}
      maxW="800px"
      mx="auto"
      bg="white"
      p={6}
      borderRadius="md"
      boxShadow="md"
    >
      <FormControl>
        <FormLabel htmlFor="language">Language</FormLabel>
        <Select
          id="language"
          value={mode}
          onChange={(e) => handleModeChange(e.target.value)}
        >
          <option value="c_cpp">C++</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="csharp">C#</option>
        </Select>
      </FormControl>
      <AceEditor
        mode={mode}
        theme="monokai"
        onChange={(newCode) => setCode(newCode)}
        value={code}
        height="600px"
        width="100%"
      />
      <Button mt={4} onClick={executeCode}>
        Run
      </Button>
      <Textarea mt={4} value={output} readOnly />
    </Box>
  );
}

export default CodeEditor;
