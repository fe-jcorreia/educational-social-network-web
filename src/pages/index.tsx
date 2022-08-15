import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { LoginCard } from "../modules/account/login-card";
import { AppStrings } from "../strings";

const strings = AppStrings.Login;

const Home: NextPage = () => {
  return (
    <div>
      <Box w="100%" h="85vh" bgGradient="linear(to-br, teal.300, blue.600)">
        <HStack maxW="1080px" mx="auto" h="inherit">
          <Box>
            <Heading color="white" mb="1rem">
              {strings.title}
            </Heading>
            <Text color="blue.900">{strings.subtitle}</Text>
          </Box>

          <LoginCard />
        </HStack>
      </Box>
    </div>
  );
};

export default Home;
