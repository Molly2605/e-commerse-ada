import React from "react";
import { Box, Container, Text, Link, Flex } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="black" color="white" py={10}>
      <Container maxW="container.xl" textAlign="center">
        <Text>2025 Ecommerce para ADA IT Woman</Text>
        <Text mt={2}>
          Hecho por Molly{" "}
          <Flex align="center" display="inline-flex">
            ❤️
            <Link href="https://github.com/Molly2605" color="white" fontWeight="bold" isExternal ml={2}>
              <FaGithub size={24} />
            </Link>
          </Flex>
        </Text>
        <Text mt={2}>
          <Link href="https://github.com/Molly2605/e-commerse-ada" color="white" fontWeight="bold" isExternal>
            Repositorio en Github
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;