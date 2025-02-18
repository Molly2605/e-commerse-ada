import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, FormErrorMessage, useToast, Heading, Text, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { registerUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await registerUser(data);
    toast({
      title: "¡Registro exitoso!",
      description: "Bienvenido a nuestra tienda 🛍️",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Center height="100vh">
      <Box
        maxW="500px"
        width="90%"
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        p={12}
        border="1px"
        borderColor="gray.300"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={4}>
          Crea una cuenta
        </Heading>
        <Text textAlign="center" mb={6} fontSize="md" color="gray.600">
          Ingresa tus datos para crear una cuenta y empezar a comprar.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
            <Input
              type="text"
              id="username"
              placeholder="Ingresa tu nombre de usuario"
              borderColor="black"
              {...register("username", { required: "Este campo es obligatorio" })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={5} isInvalid={errors.email}>
            <FormLabel htmlFor="email">Correo electrónico</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              borderColor="black"
              {...register("email", { required: "Este campo es obligatorio" })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={5} isInvalid={errors.password}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                borderColor="black"
                {...register("password", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                })}
              />
              <InputRightElement  width="4.0rem">
                <Button h="0rem" size="sm" onClick={handleClick}>
                  {show ? "Ocultar" : "Mostrar"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            mt={10}
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
            type="submit"
            width="100%"
          >
            Crear cuenta
          </Button>
        </form>
      </Box>
    </Center>
  );
};
