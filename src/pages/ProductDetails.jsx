import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Box, Image, Text, Button, Flex, Spinner } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Producto encontrado:", docSnap.data());
          setProduct(docSnap.data());
        } else {
          console.error("Producto no encontrado");
          navigate("/products");
        }
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id, navigate]);

  if (loading) return <Spinner size="xl" />;
  if (!product) return <Text>No se encontró el producto</Text>;

  return (
    <Box padding={12}>
      <Flex align="center" justify="center">
        <Image
          src={product.img_url}
          alt={product.name}
          boxSize="30%"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/400"
        />

        <Box p="4" ml="6" maxW="500px">
          <Text fontWeight="bold" fontSize="3xl">
            {product.name}
          </Text>
          <Text fontSize="2xl" color="black">
            ${product.price}
          </Text>
          <Text mt={4}>{product.description}</Text>
          <Button color="white"
            backgroundColor="black"
            _hover={{ backgroundColor: "#333" }} mt={4} onClick={() => addToCart(product)}>
            Agregar al Carrito
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductDetails;