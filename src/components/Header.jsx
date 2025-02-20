import { Box, Flex, Button, Icon, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, Text, Image, VStack, HStack, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handlePayment = () => {
    alert('GRACIAS POR TU COMPRA!✨✨✨');
    clearCart();
  };

  return (
    <Box
      as="header"
      mt={0}
      position="fixed"
      left={20}
      right={20}
      zIndex={10}
      bgGradient="linear(to-r, #e7e4d2, #dfd1f0, #d5ebf0)"
      height="40px"
      py={12}
      borderBottom="2px solid rgba(53, 36, 61, 0.12)"
    >
      <Flex justify="space-between" alignItems="center">
        <NavLink to="/" style={{ fontWeight: "bold", color: "black", fontSize: "18px" }}>
          Home
        </NavLink>

        <Flex gap={4} alignItems="center" ml={4}>
          {!user ? (
            <>
              <NavLink to="/register" style={{ fontWeight: "bold", color: "black", fontSize: "18px" }}>
                Registrarse
              </NavLink>
              <NavLink to="/login" style={{ fontWeight: "bold", color: "black", fontSize: "18px" }}>
                Iniciar Sesión
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/products" style={{ fontWeight: "bold", color: "black", fontSize: "18px" }}>
                Productos
              </NavLink>

              <Button variant="link" color="black" fontWeight="bold" fontSize="18px" onClick={() => setIsCartOpen(true)}>
                <Icon as={FaShoppingCart} boxSize={6} mr={2} />
                ({getTotalItems()})
              </Button>

              <Drawer isOpen={isCartOpen} placement="right" onClose={() => setIsCartOpen(false)}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody mt={20}>
                    <VStack align="center" spacing={4}>
                      {cart.length === 0 ? (
                        <>
                          <Image
                            src="https://images.emojiterra.com/google/android-11/512px/1f494.png"
                            alt="Corazón roto"
                            boxSize="50px"
                            mb={4}
                          />
                          <Text fontSize="xl" textAlign="center">
                            ¡OMG, tu carrito está vacío!
                          </Text>
                        </>
                      ) : (
                        <VStack spacing={4} align="stretch">
                          {cart.map((product) => (
                            <HStack key={product.id} justify="space-between" borderBottom="1px solid #e2e8f0" pb={2}>
                              <Image src={product.img_url} alt={product.name} boxSize="50px" objectFit="cover" />
                              <Text fontSize="lg">{product.name}</Text>
                              <Button size="sm" colorScheme="red" onClick={() => removeFromCart(product.id)}>
                                <Icon as={DeleteIcon} />
                              </Button>
                            </HStack>
                          ))}

                          <Flex justify="space-between" alignItems="center" w="full" mt={4}>
                            <Text fontSize="xl" fontWeight="bold">Total:</Text>
                            <Text fontSize="xl" fontWeight="bold">${getTotalPrice()}</Text>
                          </Flex>

                          <Button colorScheme="teal" w="full" mt={4} onClick={handlePayment} isDisabled={cart.length === 0}>
                            Pagar
                          </Button>
                        </VStack>
                      )}
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>

              <Menu>
                <MenuButton as={Button} variant="link" color="black" fontWeight="bold" fontSize="18px">
                  <Icon as={FaUser} boxSize={6} mr={2} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={NavLink} to="/order-history" color="black">
                    Historial de Pedidos
                  </MenuItem>

                  <MenuItem onClick={logout} color="black">
                    Cerrar Sesión
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;