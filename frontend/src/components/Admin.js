import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const username = JSON.parse(localStorage.getItem("username"));
var userName;
if (username) {
  userName = username.userName;

  if (username.username) {
    userName = username.username;
  } else {
    userName = username.userName;
  }
  console.log(username.userName);
}
const Admin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (userName != "admin") {
      navigate("/login");
    }
    axios.get("/api/problem/adminps").then((response) => {
      setData(response.data);
    });
  });
  const handleSelect = (id) => {
    if (
      window.confirm("Are you sure you want to delete this statement") === true
    ) {
      const data = {
        problem_id: id, // Pass the ID of the selected problem
      };

      axios
        .post("/api/problem/delete", data) //set problem for the room
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      navigate("/admin");
    } else {
    }
  };
  const background = {
    backgroundColor: "#1c1d1f",
    maxHeight: "100%",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "70%",
    border: "5px solid #9840db",
    padding: "100px",
  };

  const thStyle = {
    border: "2px solid #9840db",
    padding: "8px",
    textAlign: "center",
    color: "white",
  };

  const tdStyle = {
    border: "2px solid #9840db",
    padding: "8px",
    textAlign: "center",
    color: "white",
  };

  return (
    <body style={background} marginBottom={"500px"}>
      <center>
        <Button ml="10px" onClick={() => navigate("/addProblem")}>
          Add Problems
        </Button>
        <Box
          d="flex"
          justifyContent="flex-start"
          p={"3"}
          bg={"#9840db"}
          w="50%"
          m="20px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="white">
            Your Problems
          </Text>
        </Box>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Problem Statement</th>
              <th style={thStyle}>Difficulty</th>
              <th style={thStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td style={tdStyle}>{row.title}</td>
                <td style={tdStyle}>{row.problem}</td>
                <td style={tdStyle}>{row.difficulty}</td>
                <td style={tdStyle}>
                  <Button
                    backgroundColor={"#9840db"}
                    color="#1c1d1f"
                    width={"80%"}
                    style={{ marginTop: 20 }}
                    onClick={() => handleSelect(row._id)}
                    leftIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </body>
  );
};

export default Admin;
