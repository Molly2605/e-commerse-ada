import React from 'react';
import { Box, Button, Text, Icon, Flex, Image } from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useCart();

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleAdd = (product) => {
    addToCart(product);
  };

  return (
    <Box padding={12}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Mi Carrito
      </Text>

      {cart.length === 0 ? (
        <Text>No tienes productos en el carrito.</Text>
      ) : (
        <Box>
          {cart.map((product) => (
            <Flex
              key={product.id}
              align="center"
              justify="space-between"
              mb={4}
              borderBottom="1px solid #e2e8f0"
              pb={4}
            >
              <Flex align="center">
                <Image
                  src={product.img_url}
                  alt={product.name}
                  boxSize="80px"
                  objectFit="cover"
                  mr={4}
                />
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {product.name}
                  </Text>
                  <Text fontSize="lg" color="gray.500">
                    ${product.price}
                  </Text>
                </Box>
              </Flex>

              <Flex align="center">
                <Button
                  onClick={() => handleAdd(product)}
                  size="sm"
                  colorScheme="teal"
                  variant="outline"
                  mr={2}
                >
                  <Icon as={AddIcon} />
                </Button>
                <Button
                  onClick={() => handleRemove(product.id)}
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                >
                  <Icon as={DeleteIcon} />
                </Button>
              </Flex>
            </Flex>
          ))}
        </Box>
      )}

      {cart.length > 0 && (
        <Box mt={4}>
          <Button color="white"
            backgroundColor="black"
            _hover={{ backgroundColor: "#333" }}>
            Proceder al Pago
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;