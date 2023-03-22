import { Box, Flex, Spacer, Stack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import profileIcon4 from "../assets/profileIcon4.png";

function NavBar() {
  return (
    <Box bg="#9840db" color="#1c1d1f" px="2" mb="10">
      <Flex h="20" alignItems="center">
        <Box>
          {/* <Image src={'../src/assets/logo.jpeg'} alt="My Logo" h="8" /> */}
          {/* <img src="../src/assets/logo.jpeg" alt="react logo" style={{ width: '400px', }}/> */}
          <Link to= "/Home">
            <Image width={250} height={'195px'} alt='logo' src={logo1} mt='30px' ml= '10px'/>
            </Link>
        </Box>
        <Spacer />
        <Stack direction="row" spacing="7" fontWeight={'bold'} >
          <Link to="/joinroom">Join Room</Link>
          <Link to="/createroom">Create Room</Link>
          <Link to="../pages/">
          <Image width={'50px'} height={'50px'} alt='logo' src={profileIcon4} mt = '-15px'/>
          </Link>
          {/* <Link to="/contact">Contact</Link> */}
        </Stack>
      </Flex>
    </Box>
  );
}

export default NavBar;
