import React from "react";
import { ChakraProvider, Stack, Box, Container, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./routes/Routes";
import { CartProvider } from "./context/CartContext";



const App = () => {
  return (
    <ChakraProvider>
      <CartProvider> 
        <Stack
          bgGradient="linear(to-r, #e7e4d2, #dfd1f0, #d5ebf0)"
          minHeight="100vh"
          display="flex"
          flexDirection="column"
        >
          <VStack as="main" flex="1">
            <Container maxW="container.xl">
              <Header />
              <Routes />
            </Container>
          </VStack>
          <Box as="footer" mt="auto" bg="white" borderTop="1px solid black">
            <Footer />
          </Box>
        </Stack>
      </CartProvider>
    </ChakraProvider>
  );
};

export default App;