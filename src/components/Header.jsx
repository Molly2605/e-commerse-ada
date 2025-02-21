import {
  Box, Flex, Button, Icon, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton,
  Text, Image, VStack, HStack, Menu, MenuButton, MenuList, MenuItem, useBreakpointValue
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handlePayment = () => {
    alert('GRACIAS POR TU COMPRA!✨✨✨');
    clearCart();
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bgGradient="linear(to-r, #e7e4d2, #dfd1f0, #d5ebf0)"
      py={4}
      px={6}
      borderBottom="2px solid rgba(53, 36, 61, 0.12)"
    >
      <Flex justify="space-between" alignItems="center">
        {isMobile ? (
          <Button variant="ghost" onClick={() => setIsMenuOpen(true)}>
            <Icon as={FaBars} boxSize={6} />
          </Button>
        ) : (
          <NavLink to="/" style={{ fontWeight: "bold", color: "black", fontSize: "18px" }}>
            HOME
          </NavLink>
        )}

        <Flex alignItems="center" gap={4}>
          <Button
            variant="link"
            color="black"
            fontWeight="bold"
            fontSize="18px"
            onClick={() => setIsCartOpen(true)}
            display="flex"
            alignItems="center"
          >
            <Icon as={FaShoppingCart} boxSize={6} mr={2} />
            <Text display="inline">({getTotalItems()})</Text>
          </Button>

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
        </Flex>

        <Drawer isOpen={isMenuOpen} placement="right" onClose={() => setIsMenuOpen(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody mt={12}>
              <VStack align="center" spacing={6}>
                {!user ? (
                  <>
                    <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Registrarse</NavLink>
                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>Productos</NavLink>
                    <NavLink to="/order-history" onClick={() => setIsMenuOpen(false)}>Historial de Pedidos</NavLink>
                    <Button onClick={logout} colorScheme="red" variant="ghost">
                      Cerrar Sesión
                    </Button>
                  </>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

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
                    <Button bg="black"
                      color="white" w="full" mt={4} onClick={handlePayment} isDisabled={cart.length === 0}>
                      Pagar
                    </Button>
                  </VStack>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Header;