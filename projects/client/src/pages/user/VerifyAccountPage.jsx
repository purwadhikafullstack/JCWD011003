import { Box, Heading, Text, Button, Flex, Link, Center, Image } from "@chakra-ui/react";
import { Link as LinkChakra,} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const VerificationPage = () => {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const navigate = useNavigate();


  const handleVerify = async () => {
    try {
      const response = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Account verified successfully");
        navigate("/login");

        // Perform any additional actions after successful verification
      } else {
        console.log("Failed to verify account");
        // Handle verification failure
      }
    } catch (error) {
      console.log("Error verifying account:", error);
      // Handle error
    }
  };


  return (
    <Box>
          <Center>
            <Image src="LOGO.png" width="10%" height="auto"/>
          </Center>
      <Box m="auto" px={6} w={"80%"}>
        <Box
          maxW={{ base: "90%", md: "80%", lg: "50%" }}
          m="auto"
          p={6}
        >
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Verify your email
          </Heading>
            <Text mb={6} textAlign={'center'}>
              A verification email has been sent to your email address. Please
              follow the instructions in the email to verify your account.
            </Text>
            <center>
            <Button
              colorScheme="teal"
              onClick={handleVerify}
              mb={6}
              width="80"
            >
              Verify
            </Button>
            </center>
          {token ? null : (
            <Button
              colorScheme="gray"
              onClick={() => handleVerify()}
              mb={6}
              textColor={"black"}
              variant={"outline"}
              borderColor={"black"}
            >
              Verification email
            </Button>
          )}
          <Text>
            Didn't receive the email? Check your spam folder or{" "}
            <LinkChakra textColor={'teal'}>
            <Link to="/contact-us">
              contact us <ExternalLinkIcon mx="2px" />
            </Link>
            </LinkChakra>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default VerificationPage;
