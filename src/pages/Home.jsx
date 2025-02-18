import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="flex-start" 
      alignItems="center"
      pl={6} 
    >
      <Flex direction="column" align="flex-start">
        <Text
          fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }} 
          fontWeight="bold"
          color="black"
          letterSpacing="wider"
          lineHeight="shorter"
        >
          Bienvenida
        </Text>
        <Text
          fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }} 
          fontWeight="bold"
          color="black"
          letterSpacing="wider"
          lineHeight="shorter"
        >
          a mi Tienda 🍷
        </Text>
        <Text
          fontSize={{ base: "md", sm: "lg", md: "2xl" }} 
          color="gray"
          mt={2} 
        >
          Encuentra los mejores productos para tu casa!!
        </Text>
      </Flex>
    </Box>
  );
};

export default Home;