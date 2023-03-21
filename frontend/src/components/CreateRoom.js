import { Box, Container, Text, TabPanels, Tabs } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CreateRoom = () => {
  //   const [name, setUserName] = useState(false);
  // states
  const [roomLimit, setRoomLimit] = useState("");
  const [roomName, setRoomName] = useState("");
  // const[roomId, setRoomId] = useState('')
  const [roomPassword, setRoomPassword] = useState("");
  const userName = localStorage.getItem("username");
  console.log(userName);
  //   const setUserNameEventHandler = (e) => {
  //     setUserName(e.target.value);
  //   };
  const history = useHistory();
  const formSubmitEventHandler = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        "/api/room/room",
        {
          userName,
          roomName,
          password: roomPassword,
          roomLimit,
        },
        config
      )
      .then((res) => {
        console.log(res);

        if (res.data.error) {
          alert("Looks like some error occured");
        } else {
          const userData = {
            UserName: res.data.members[0].name,
            UserId: res.data.members[0].userId,
            RoomName: res.data.roomName,
            RoomId: res.data.roomId,
          };

          localStorage.setItem("user", JSON.stringify(userData));

          // console.log("room is created!!!!!!!!!");
          // alert(`Room is created & Room ID is ${res.data.roomId}`);
          history.push("/room/".concat(res.data.roomId));
        }
      })
      .catch((err) => {
        alert("Looks like some error occured");
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
            Create Room
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
              <form>
                <FormControl id="Name">
                  <FormLabel>Room Name:</FormLabel>
                  <Input
                    placeholder="Enter Your UserName"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel>Set Room Limit:</FormLabel>
                  <Input
                    placeholder="Enter Number of users to enter the room"
                    value={roomLimit}
                    onChange={(e) => setRoomLimit(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel>Room password:</FormLabel>
                  <Input
                    placeholder="Enter the password to your room"
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  onClick={formSubmitEventHandler}
                  id="submit"
                  backgroundColor={"#1c1d1f"}
                  color="#9840db"
                  width={"50%"}
                  style={{ marginTop: 20 }}
                >
                  Create
                </Button>
              </form>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </center>
  );
};

export default CreateRoom;
