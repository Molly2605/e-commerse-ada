import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, useToast, Center, Heading, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast({
        title: "Inicio de sesión exitoso",
        description: "¡Bienvenido de nuevo! 🎉",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          Iniciar sesión
        </Heading>
        <Text textAlign="center" mb={6} fontSize="md" color="gray.600">
          Ingresa tu correo electrónico y accede a los productos!!
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
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
            <Input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              borderColor="black"
              {...register("password", {
                required: "Este campo es obligatorio",
                minLength: { value: 6, message: "Debe tener al menos 6 caracteres" }
              })}
            />
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
            Continuar
          </Button>
        </form>
      </Box>
    </Center>
  );
};
