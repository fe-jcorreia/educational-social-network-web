import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { LoginCard } from "../components/login-card/login-card";

const Home: NextPage = () => {
  return (
    <div>
      <Box w="100%" h="85vh" bgGradient="linear(to-br, teal.300, blue.600)">
        <HStack maxW="1080px" mx="auto" h="inherit">
          <Box>
            <Heading color="white" mb="1rem">
              Compartilhe seus conhecimentos com o mundo!
            </Heading>
            <Text color="blue.900">
              Conheça e explore a didática do seu jeito
            </Text>
          </Box>

          <LoginCard />
        </HStack>
      </Box>
    </div>
  );
};

export default Home;
