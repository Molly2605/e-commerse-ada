import React, { useEffect, useState } from "react";
import { Box, Button, Text, Icon, Flex, Image } from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const Cart = () => {
  const { cart, removeFromCart, addToCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchOrderHistory = async () => {
        const ordersRef = collection(db, "orders");
        const ordersQuery = query(ordersRef, where("userEmail", "==", user.email));
        const querySnapshot = await getDocs(ordersQuery);
        const orders = querySnapshot.docs.map(doc => doc.data());
        setOrderHistory(orders);
      };

      fetchOrderHistory();
    }
  }, [user]);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleAdd = (product) => {
    addToCart(product);
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes estar logueado para finalizar la compra.");
      return;
    }

    try {
      const order = {
        userEmail: user.email,
        items: cart,
        total: getTotalPrice(),
        date: new Date().toISOString(),
      };

      await addDoc(collection(db, "orders"), order);

      clearCart();
      alert("Compra realizada con éxito.");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al procesar la compra.");
    }
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
          <Button
            color="white"
            backgroundColor="black"
            _hover={{ backgroundColor: "#333" }}
            onClick={handleCheckout}
          >
            Proceder al Pago
          </Button>
        </Box>
      )}

      <Box mt={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Historial de Compras
        </Text>

        {orderHistory.length === 0 ? (
          <Text>No has realizado compras aún.</Text>
        ) : (
          <Box>
            {orderHistory.map((order, index) => (
              <Box key={index} mb={4} p={4} border="1px solid #e2e8f0">
                <Text fontSize="lg" fontWeight="bold">
                  Pedido realizado el {new Date(order.date).toLocaleDateString()}
                </Text>
                <Text>Correo: {order.userEmail}</Text>
                <Text>Total: ${order.total}</Text>
                <Box mt={2}>
                  <Text fontWeight="bold">Productos:</Text>
                  {order.items.map((item, idx) => (
                    <Text key={idx}>
                      {item.name} - {item.quantity} x ${item.price}
                    </Text>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Cart;