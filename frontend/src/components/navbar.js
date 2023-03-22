import { Box, Flex, Spacer, Stack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import profileIcon1 from "../assets/profileIcon1.png";

function NavBar() {
  return (
    <Box bg="#1c1d1f" color="#9840db" px="2" mb="10">
      <Flex h="20" alignItems="center">
        <Box>
          {/* <Image src={'../src/assets/logo.jpeg'} alt="My Logo" h="8" /> */}
          {/* <img src="../src/assets/logo.jpeg" alt="react logo" style={{ width: '400px', }}/> */}
          <Link to="/Home">
            <Image
              width={200}
              height={"150px"}
              alt="logo"
              src={logo}
              mt="30px"
              ml="10px"
            />
          </Link>
        </Box>
        <Spacer />
        <Stack direction="row" spacing="7">
          <Link to="/joinroom">Join Room</Link>
          <Link to="/createroom">Create Room</Link>
          {/* <Link to="../pages/ProblemStatement">Problem Statements</Link> */}
          <Link to="../pages/">
            <Image
              width={"40px"}
              height={"50px"}
              alt="logo"
              src={profileIcon1}
              mt="-25px"
            />
          </Link>
          {/* <Link to="/contact">Contact</Link> */}
        </Stack>
      </Flex>
    </Box>
  );
}

export default NavBar;
