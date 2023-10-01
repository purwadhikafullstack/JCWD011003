import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { Search2Icon } from "@chakra-ui/icons";
import { BsPlusSlashMinus } from "react-icons/bs";
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import Category from "./Category";
import ProductDetail from "./ProductDetail";
import Pagination from "../user/PaginationProduct";
import { Link } from "react-router-dom";

export default function Product() {
  const toast = useToast();
  const bgColor = useColorModeValue("rgb(255,255,255, 0.9)", "gray.800");
  const [product, setProduct] = useState([]);
  const [quantities, setQuantities] = useState([]); // Initialize quantities state
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [totalPages, setTotalPages] = useState("");

  useEffect(() => {
    // Initialize quantities state with default quantity (1) for each product
    const initialQuantities = new Array(product.length).fill(1);
    setQuantities(initialQuantities);
  }, [product]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (categoryId) => {
    setCategory(categoryId);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    fetchProduct();
  };

  const fetchProduct = async () => {
    try {
      let apiUrl = `http://localhost:8000/api/stock/?page=${currentPage}`;

      if (searchQuery) {
        apiUrl += `&name=${searchQuery}`;
      }

      if (price) {
        apiUrl += `&orderByPrice=${price}`;
      }

      if (category) {
        apiUrl += `&id_category=${category}`;
      }

      if (name) {
        apiUrl += `&orderByName=${name}`;
      }

      const response = await axios.get(apiUrl);
      setProduct(response.data.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [currentPage, price, category, name, searchQuery]);

  const handleAddToCart = async (productId, index) => {
    // Pass the index of the product
    const token = localStorage.getItem("token"); // Replace with your actual token key

    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/transaction/start",
        {
          productId: productId,
          quantity: quantities[index], // Use the quantity for the specific product
        },
        config
      );
      setCartItems(response.data.cartItems);
      toast({
        title: "Item Added to Cart",
        description: "The item has been added to your cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Cart updated:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleSortPrice = (e) => {
    setPrice(e.target.value);
  };
  const handleSortName = (e) => {
    setName(e.target.value);
  };
  const handlefilterCategory = (value) => {
    setCategory(value);
  };

  const formatPriceAsIDR = (price) => {
    // Ensure the price is a number
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return "";
    }

    // Format the price without decimal part
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // Set both minimum and maximum to 0
    }).format(numericPrice);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <Box minW={"1190"} maxW={"1190"}>
      <Box width={"98%"} m={"4"}>
        <InputGroup borderRadius={"full"} size="sm">
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="white.600" />}
          />
          <Input
            type="text"
            placeholder="Search product..."
            border="1px solid white"
            rounded={"full"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputRightAddon p={0} borderRightRadius={"full"}>
            <Button
              size="sm"
              rounded={"full"}
              variant={"outline"}
              onClick={fetchProduct}
            >
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
      <Category
        price={price}
        setPrice={setPrice}
        handleSortPrice={handleSortPrice}
        category={category}
        handleFilterCategory={handleCategoryFilter}
        name={name}
        handleSortName={handleSortName}
        setName={setName}
        handleSearch={handleSearch}
      />
      <Flex w="100%" gap={6} wrap="wrap" ml={4} mb={4}>
        {product.map((product, index) => (
          <Box
            key={index}
            align={"center"}
            role="group"
            p={4}
            maxW="212px"
            w="full"
            bg={bgColor}
            boxShadow="md"
            rounded="lg"
            pos="relative"
            zIndex={1}
            mb={"3"}
          >
            <Link to={`/product/${product.id}`} key={index}>
              <Box
                rounded="lg"
                mt={-8}
                pos="relative"
                height="120px"
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 2,
                  left: 0,
                  backgroundImage: `url(http://localhost:8000/api/${product.Product.productImg})`,
                  filter: "blur(10px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(15px)",
                  },
                }}
              >
                <Image
                  borderRadius="xl"
                  height={130}
                  width={190}
                  objectFit="contain"
                  src={`http://localhost:8000/api/${product.Product.productImg}`}
                  alt="#"
                />
              </Box>
              <Stack pt={2} align="center">
                <Text
                  color="black"
                  fontSize="sm"
                  textTransform="uppercase"
                  fontFamily="monospace"
                >
                  {product.Product.Category?.category}
                </Text>
                <Heading color="black" fontFamily="cursive" fontSize="md" m={0}>
                  {product.Product.name}
                </Heading>
                <Stack align={"center"} justify={"center"}>
                  <Flex>
                    <Text fontWeight={800} fontSize={"md"} color={"teal"}>
                      {" "}
                      {formatPriceAsIDR(
                        product.Product.price -
                          (product.Product.price * product.discountPercent) /
                            100
                      )}
                    </Text>
                    <Text color={"red"} fontSize={"xs"}>
                      {product.discountPercent}%
                    </Text>{" "}
                  </Flex>
                  <Text
                    textDecoration={"line-through"}
                    color={"gray.600"}
                    fontSize={"xs"}
                  >
                    {formatPriceAsIDR(product.Product.price)}
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Flex>
              <BsPlusSlashMinus
                color="black"
                onClick={() =>
                  setQuantities((prevQuantities) => {
                    const updatedQuantities = [...prevQuantities];
                    updatedQuantities[index] = Math.max(
                      updatedQuantities[index] - 1,
                      1
                    );
                    return updatedQuantities;
                  })
                }
              />
              <Input
                type="number"
                textColor={"black"}
                value={quantities[index]}
                onChange={(e) =>
                  setQuantities((prevQuantities) => {
                    const updatedQuantities = [...prevQuantities];
                    updatedQuantities[index] = Math.max(
                      parseInt(e.target.value),
                      1
                    );
                    return updatedQuantities;
                  })
                }
                placeholder="Input Qty"
                w={"9"}
                size={"xs"}
              />
              <Spacer />
              <Button
                variant="link"
                onClick={() => handleAddToCart(product.id, index)}
              >
                <MdShoppingCartCheckout color="black" size={20} />
              </Button>
            </Flex>
          </Box>
        ))}
      </Flex>
      {/* Render ProductDetail as a modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onClose={handleCloseProductDetail}
        />
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </Box>
  );
}
