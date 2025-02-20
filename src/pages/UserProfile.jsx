import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';

const UserProfile = () => {
  return (
    <Box padding={12}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Mi Perfil
      </Text>

      <Text fontSize="lg" mb={4}>
        Aquí puedes ver y editar tu información personal.
      </Text>

      <Link to="/order-history">
        <Button colorScheme="teal" size="lg">
          Ver Historial de Pedidos
        </Button>
      </Link>
    </Box>
  );
};

export default UserProfile;