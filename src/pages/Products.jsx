import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Box, Grid, Image, Text, Button, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hoverImages, setHoverImages] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = (id, hoverUrl) => {
    setHoverImages((prev) => ({ ...prev, [id]: hoverUrl }));
  };

  const handleMouseLeave = (id, originalUrl) => {
    setHoverImages((prev) => ({ ...prev, [id]: originalUrl }));
  };

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product);
    } else {
      alert("Este producto está agotado.");
    }
  };

  return (
    <Box padding={12}>
      <Grid templateColumns="repeat(4, 1fr)" gap={8}>
        {products.map((product) => (
          <Box
            key={product.id}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            height="600px"
            position="relative"
            opacity={product.stock === 0 ? 0.5 : 1}
          >
            <Box
              height="70%"
              width="100%"
              onMouseEnter={() => handleMouseEnter(product.id, product.img_hover_url)}
              onMouseLeave={() => handleMouseLeave(product.id, product.img_url)}
            >
              <Image
                src={hoverImages[product.id] || product.img_url}
                alt={product.name}
                objectFit="cover"
                height="100%"
                width="100%"
                transition="transform 0.2s ease-in-out"
                _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
                filter={product.stock === 0 ? "grayscale(100%)" : "none"}
              />
            </Box>
            <Box p="4" flex="1">
              <Text fontSize="sm" mb={2}>
                {product.name}
              </Text>
              <Text color="black" fontSize="lg" mb={4}>
                ${product.price}
              </Text>
              <Box display="flex" gap={3} alignItems="center">
                <Link to={`/products/${product.id}`}>
                  <Button
                    color="grey"
                    _hover={{ backgroundColor: "#333" }}
                    width="120px"
                    height="40px"
                  >
                    Ver Detalles
                  </Button>
                </Link>

                <Button
                  color="white"
                  backgroundColor="black"
                  _hover={{ backgroundColor: "#333" }}
                  width="50px"
                  height="45px"
                  position="absolute"
                  right="10px"
                  borderRadius="50%"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  <Icon as={FaShoppingCart} boxSize={6} />
                </Button>
              </Box>

              <Text mt={2} color={product.stock > 0 ? "green.500" : "red.500"}>
                {product.stock > 0 ? `Stock disponible: ${product.stock}` : "Sin stock"}
              </Text>
              
              {product.stock === 0 && (
                <Text color="red.500" mt={2}>
                  No hay stock disponible
                </Text>
              )}
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;