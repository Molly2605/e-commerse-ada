import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Box, Grid, Image, Text, Button, Icon, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const categories = ["TODOS", "BAÑO", "DECO", "COCINA", "AROMA"];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
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
      setFilteredProducts(productsList);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "TODOS") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    const initialHoverImages = {};
    products.forEach(product => {
      initialHoverImages[product.id] = product.img_url;
    });
    setHoverImages(prev => ({ ...initialHoverImages, ...prev }));
  }, [products]);

  const handleMouseEnter = (id, hoverUrl) => {
    setHoverImages((prev) => ({ ...prev, [id]: hoverUrl || prev[id] }));
  };

  const handleMouseLeave = (id) => {
    setHoverImages((prev) => ({ ...prev, [id]: products.find(p => p.id === id)?.img_url || prev[id] }));
  };

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product);
    } else {
      alert("Este producto está agotado.");
    }
  };

  return (
    <Box padding={{ base: 4, md: 10, lg: 24 }}>
      <Flex
        justify="center"
        mb={6}
        gap={4}
        mt={5}
        flexWrap="nowrap"
        overflowX={{ base: "auto", md: "unset" }}
        px={{ base: 2, md: 0 }}
      >
        {categories.map((category) => (
          <Button
            mt={9}
            key={category}
            color={selectedCategory === category ? "purple.500" : "black"}
            variant="ghost"
            _hover={{ color: "purple.400" }}
            size={{ base: "xs", md: "sm" }}
            onClick={() => setSelectedCategory(category)}
            whiteSpace="nowrap"
          >
            {category}
          </Button>
        ))}
      </Flex>


      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={8}
        rowGap={20}
      >
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            position="relative"
            opacity={product.stock === 0 ? 0.5 : 1}
          >
            <Box
              height={{ base: "200px", sm: "180px", md: "400px" }}
              width="100%"
              onMouseEnter={() => handleMouseEnter(product.id, product.img_hover_url)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            >
              <Image
                src={hoverImages[product.id]}
                alt={product.name}
                objectFit="cover"
                height="100%"
                width="100%"
                transition="transform 0.2s ease-in-out"
                _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
                filter={product.stock === 0 ? "grayscale(100%)" : "none"}
              />
            </Box>

            <Box p={2} flex="1">
              <Text fontSize={{ base: "sm", md: "md" }} mb={1}>{product.name}</Text>
              <Text color="black" fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={4}>
                ${product.price}
              </Text>

              <Flex justify="space-between" align="center">
                <Link to={`/products/${product.id}`}>
                  <Button
                    color="grey"
                    _hover={{ backgroundColor: "#333" }}
                    size={{ base: "xs", md: "sm" }}
                  >
                    Ver Detalles
                  </Button>
                </Link>

                <Button
                  color="white"
                  backgroundColor="black"
                  _hover={{ backgroundColor: "#333" }}
                  size={{ base: "xs", md: "sm" }}
                  borderRadius="50%"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  <Icon as={FaShoppingCart} boxSize={4} />
                </Button>
              </Flex>

              <Text mt={2} fontSize={{ base: "xs", md: "sm" }} color={product.stock > 0 ? "green.500" : "red.500"}>
                {product.stock > 0 ? `Stock disponible: ${product.stock}` : "Sin stock"}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>

    </Box>
  );
};

export default Products;