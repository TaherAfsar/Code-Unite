import axios from "axios";
import React from "react";
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProblemStatement = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const userD = JSON.parse(localStorage.getItem("username"));
  console.log(userD)
  const room_id = userD.roomId;
  // console.log(room_id);
  const handleSelect = (id) => {
    console.log(userD);
    if (
      window.confirm("Are you sure you want to select this statement") === true
    ) {
      const data = {
        roomId: room_id, // Replace with your actual room ID
        problem_id: id, // Pass the ID of the selected problem
      };

      axios
        .post("/api/problem/select", data)                  //set problem for the room 
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      navigate("/room/" + room_id);
    } else {

      navigate("/problems");
    }
  };
  useEffect(() => {
    fetch("/api/problem/fetch")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(data,"77777777777777777777");
  const tableStyle = {
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
    border: "1px solid white",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const thStyle = {
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#9840db",
    color: "white",
    fontWeight: "bold",
    border: "1px solid white",
  };

  const tdStyle = {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: "#1c1d1f",
    color: "white",
    border: "1px solid white",
  };

  return (
    <Box bg="#1c1d1f" minH="100vh">
      <Container maxW="container.lg" py="4">
        <Box
          d="flex"
          justifyContent="flex-start"
          bg={"#9840db"}
          w="100%"
          mb="4"
          borderRadius={"10px"}
          borderWidth="3"
          p="4"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
          textAlign={{ base: "left", md: "center" }}
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="white">
            Welcome to your Competitive Coding Journey.
          </Text>
        </Box>
        <Box style={tableStyle}>
          <Box as="table" w="100%" borderSpacing="0">
            <Box as="thead" bg="#9840db">
              <Box as="tr" display={{ base: "none", md: "table-row" }}>
                <Box as="th" style={thStyle}>
                  Title
                </Box>
                <Box as="th" style={thStyle}>
                  Problem Statement
                </Box>
                <Box as="th" style={thStyle}>
                  Difficulty
                </Box>
                <Box as="th" style={thStyle}>
Action
</Box>
</Box>
</Box>
<Box as="tbody">
{data.map((item) => (
<Box as="tr" key={item.id}>
<Box as="td" style={tdStyle}>
{item.title}
</Box>
<Box as="td" style={tdStyle}>
{item.problem}
</Box>
<Box as="td" style={tdStyle}>
{item.difficulty}
</Box>
<Box as="td" style={tdStyle}>
<Button
colorScheme="purple"
onClick={() => handleSelect(item.id)}
>
Select
</Button>
</Box>
</Box>
))}
</Box>
</Box>
</Box>
</Container>
</Box>
);
};

export default ProblemStatement;