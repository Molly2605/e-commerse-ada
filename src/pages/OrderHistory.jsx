import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        try {
          const ordersRef = collection(db, 'orders');
          const q = query(ordersRef, where('userEmail', '==', currentUser.email));
          const querySnapshot = await getDocs(q);
          
          const fetchedOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error al obtener las órdenes: ", error);
        }
      };

      fetchOrders();
    }
  }, [currentUser]);

  return (
    <Box padding={12}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Historial de Compras
      </Text>

      {orders.length === 0 ? (
        <Text>No tienes compras anteriores.</Text>
      ) : (
        <Box>
          {orders.map((order) => (
            <Box
              key={order.id}
              borderBottom="1px solid #e2e8f0"
              pb={4}
              mb={4}
            >
              <Text fontSize="lg" fontWeight="bold">
                Compra realizada el {new Date(order.date).toLocaleDateString()}
              </Text>
              <Text fontSize="md" color="gray.500">
                Total: ${order.total}
              </Text>

              <Flex direction="column" mt={2}>
                {order.items.map((item, index) => (
                  <Box key={index} mb={2}>
                    <Text fontSize="md">{item.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Precio: ${item.price} | Cantidad: {item.quantity}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrderHistory;