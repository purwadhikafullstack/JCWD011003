import React from "react";
import { Box, Image, Link as ChakraLink, Center, Flex, Button, MenuItem, Text } from "@chakra-ui/react";
import "./404.css";
import { Link } from "react-router-dom"; 

const NotFoundPage = () => {
  return (
    <Box className="bg-purple" w={"100%"} h={"auto"}>
      <Box className="stars">
        <Flex
          className="central-body"
          alignContent={"center"}
          align="center" // Center the children vertically
          justify="center" // Center the children horizontally
          flexDirection="column" // Stack children vertically
          h="100vh" // Ensure the central-body takes up the full height
        >
          <Image
            className="image-404"
            src="LOGO.png"
            width="10%"
            height="auto"
          />
          <Text fontWeight={'bold'} fontSize={'4xl'} color="white">
            PAGE NOT FOUND
          </Text>
          <Image
            className="image-404"
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
            alt="404"
          />
          <ChakraLink
            as={Link} to="/" 
            textColor={"white"}
            className="btn-go-home"
            target="_blank"
          >
            GO BACK HOME
          </ChakraLink>
        </Flex>
        <Box className="custom-navbar">
          <Center className="box_astronaut">
            <Image
              className="object_rocket"
              src="1.png"
              width="10%"
              height="auto"
            />
            <Image
              className="object_astronaut"
              src="6.png"
              width="10%"
              height="auto"
            />
            <Image
              className="object_astronaut"
              src="3.png"
              width="10%"
              height="auto"
            />
          </Center>
        </Box>
        <Box className="objects">
          <Image
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
            alt="Rocket"
          />
          <Box className="earth-moon">
            <Image
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
              alt="Earth"
            />
            <Image
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
              alt="Moon"
            />
          </Box>
          <Box className="box_astronaut">
            <Image
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
              alt="Astronaut"
            />
            <Image
              className="object_rocket"
              src="4.png"
              width="10%"
              height="auto"
            />
            <Image
              className="object_astronaut"
              src="5.png"
              width="10%"
              height="auto"
            />
          </Box>
        </Box>
        <Box className="glowing_stars">
          <Box className="star"></Box>
          <Box className="star"></Box>
          <Box className="star"></Box>
          <Box className="star"></Box>
          <Box className="star"></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
