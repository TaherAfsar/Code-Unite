import {
  Box,
  Container,
  Text,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from "@chakra-ui/input";
import React, { useState } from "react"
import { Button } from '@chakra-ui/react';

const Home = () => {
  const [name, setUserName] = useState(false)
  return (
      <center>
          <Container 
           maxW={'xl'} 
           centerContent
           bgImg= "url('../src/components/bg1.png')"
           >
              <Box
                  d='flex'
                  justifyContent= 'flex-start'
                  p={'3'}
                  bg={'#9840db'}
                  w='100%'
                  m='100px 0 15px 0'
                  borderRadius={'10px'}
                  borderWidth="3"
              >
                  <Text fontSize='3xl' fontFamily="Work sans" color="white">
                      Let's get to know CodeUnite more!
                  </Text>
              </Box>
              <Box
                  p={'5'}
                  bg={'#9840db'}
                  w='100%'
                  m='20px 0 15px 0'
                  borderRadius={'10px'}
                  borderWidth="3">
                  <Tabs variant='soft-rounded' colorScheme='purple'>
                      
                      <TabPanels>
                      <Text fontSize='1xl' fontFamily="Work sans" color="white">
                      Moshi Moshi coders! So this page is all about knowing every single bit of CodeUnite.
                  </Text>
                      </TabPanels>
                  </Tabs>
              </Box>
          </Container>
      </center>
  )
};

export default Home;
