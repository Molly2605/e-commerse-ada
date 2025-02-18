import { Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";


const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <Box as="header" color="white" mt={16}>
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

              <NavLink to="/cart">
                <Button
                  variant="link"
                  color="black"
                  fontWeight="bold"
                  fontSize="18px"
                >
                  <Icon as={FaShoppingCart} boxSize={6} mr={2} />
                  ({getTotalItems()})
                </Button>
              </NavLink>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="link"
                  color="black"
                  fontWeight="bold"
                  _hover={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  fontSize={"18px"}

                >
                  <Icon as={FaUser} boxSize={6} mr={2} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={logout}
                    style={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Cerrar sesión
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