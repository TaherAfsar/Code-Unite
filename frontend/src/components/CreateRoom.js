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
  
  const CreateRoom = () => {
    const [name, setUserName] = useState(false)
    return (
        <center>
            <Container maxW={'xl'} centerContent>
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
                        Create Room
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
  
                        <FormControl id='Name'>
                  <FormLabel>
                      Room Name:
                  </FormLabel>
                  <Input
                      placeholder='Enter Your UserName'
                      onChange={(e) => setUserName(e.target.value)}
                  />
              </FormControl>
              <br/>
              <FormControl id='Name'>
                  <FormLabel>
                      Set Room Limit:
                  </FormLabel>
                  <Input
                      placeholder='Enter Number of users to enter the room'
                      onChange={(e) => setUserName(e.target.value)}
                  />
              </FormControl>
              <br/>
              <FormControl id='Name'>
                  <FormLabel>
                      Room password:
                  </FormLabel>
                  <Input
                      placeholder='Enter the password to your room'
                      onChange={(e) => setUserName(e.target.value)}
                  />
              </FormControl>
  
              <Button id='submit'
              backgroundColor={'#1c1d1f'}
              color = '#9840db'
              width={'50%'}
              style = {{ marginTop: 20}}>
                  Create
              </Button>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </center>
    )
  };
  
  export default CreateRoom;
  