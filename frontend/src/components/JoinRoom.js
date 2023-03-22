import { Box, Container, Text, TabPanels, Tabs } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const formSubmitEventHandler = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = localStorage.getItem("username");

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        "/api/room/joinroom",
        {
          userName,
          roomId,
          password: password,
          // user,
        },
        config
      )
      .then((res) => {
        //console.log(res.data);

        if (res.data.error) {
          alert("Looks like some error occured1");
          console.log(res.data.error);
        } else {
          if (res.data.UserId) {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          //alert(res.data)
          console.log(res.data);
          console.log(roomId);
          history.push("/room/" + roomId);
          // return <Redirect to={`/room/${roomId}`} />;
        }
      })
      .catch((err) => {
        alert("Looks like some error occured2" + `${err.error}`);
        console.log(err);
      });
  };
  return (
    <center>
      <Container maxW={"xl"} centerContent>
        <Box
          d="flex"
          justifyContent="flex-start"
          p={"3"}
          bg={"#9840db"}
          w="100%"
          m="100px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="white">
            Join Room
          </Text>
        </Box>
        <Box
          p={"5"}
          bg={"#9840db"}
          w="100%"
          m="20px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabPanels>
              <FormControl id="Name">
                <FormLabel>Room ID:</FormLabel>
                <Input
                  placeholder="Enter room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </FormControl>
              <FormControl id="Name">
                <FormLabel>Room Password:</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter room Password"
                />
              </FormControl>
              <br />

              <Button
                onClick={formSubmitEventHandler}
                id="submit"
                backgroundColor={"#1c1d1f"}
                color="#9840db"
                width={"50%"}
                style={{ marginTop: 20 }}
              >
                Join
              </Button>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </center>
  );
};

export default JoinRoom;
