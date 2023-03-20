import React from 'react';

import {
    Box,
    Text,
  } from "@chakra-ui/react";
import { Container } from 'react-bootstrap';

const ProblemStatement = () => {
  const tableData = [
    { id: 1, name: 'You have been given an array of positive integers A1,A2,...,An with legnth N and you have to print an array of same legnth(N) where the values in the new array are the sum of every number in the array, except the number at that index.', price: 'Select' },
    { id: 2, name: 'You have been given an array of positive integers A1,A2,...,An with legnth N and you have to print an array of same legnth(N) where the values in the new array are the sum of every number in the array, except the number at that index.', price: 'Select' },
    { id: 3, name: 'You have been given an array of positive integers A1,A2,...,An with legnth N and you have to print an array of same legnth(N) where the values in the new array are the sum of every number in the array, except the number at that index.', price: 'Select' },
  ];

  const background = {
    
  }

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '70%',
    border: "5px solid #9840db",
    padding: "100px",
  };

  const thStyle = {
    border: '2px solid #9840db',
    padding: '8px',
    textAlign: 'center',
    color: "white",
  };

  const tdStyle = {
    border: '2px solid #9840db',
    padding: '8px',
    textAlign: 'left',
    color: "white",
  };

  return (
    <Container style={background}>
    <center>
        <Box
                    d='flex'
                    justifyContent= 'flex-start'
                    p={'3'}
                    bg={'#9840db'}
                    w='100%'
                    mt={''}
                    mb ='50px'
                    borderRadius={'10px'}
                    borderWidth="3"

                >
                    <Text fontSize='3xl' fontFamily="Work sans" color="white">
                       Welcome to your Competetive Coding Journey.
                    </Text>
                </Box>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Sr No.</th>
          <th style={thStyle}>Problem Statement</th>
          <th style={thStyle}>Selection</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.id}>
            <td style={tdStyle}>{row.id}</td>
            <td style={tdStyle}>{row.name}</td>
            <td style={tdStyle}>{row.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </center>
    </Container>
  );
};

export default ProblemStatement;

