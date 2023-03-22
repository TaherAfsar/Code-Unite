import { Box, Flex, Spacer, Stack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Box bg="#9840db" color="white" px="4" mb="10">
      <Flex h="16" alignItems="center">
        <Box>
          <Image alt="My Logo" h="8" />
        </Box>
        <Spacer />
        <Stack direction="row" spacing="4">
          <Link to="/joinroom">Join Room</Link>
          <Link to="/createroom">Create Room</Link>
          {/* <Link to="/contact">Contact</Link> */}
        </Stack>
      </Flex>
    </Box>
  );
}

export default NavBar;
