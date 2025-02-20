import React from "react";
import { Box, Container, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="black" color="white" py={10}>
      <Container maxW="container.xl" textAlign="center">
        <Text>2025 Ecommerce para ADA IT Woman</Text>
        <Text mt={2}>
          Hecho por Molly ❤️
          <Link href="https://github.com/Molly2605" color="white" fontWeight="bold" isExternal>
            GitHub
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;