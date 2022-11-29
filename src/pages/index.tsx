import { Box, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { LoginCard } from "@src/modules/account";
import { AppStrings } from "@src/strings";
import { useAuthenticate } from "@src/domain";
import Router from "next/router";
import { Header } from "@src/components";

const strings = AppStrings.Login;

const Home: NextPage = () => {
  const { logged, loading } = useAuthenticate();

  React.useEffect(() => {
    if (logged) {
      Router.push("/dashboard");
    }
  }, [logged]);

  return (
    <>
      {loading || logged ? (
        <Flex w="100%" h="100vh" alignItems="center" justify="center">
          <Image src="/book.gif" alt="Book Gif" />
        </Flex>
      ) : (
        <>
          <Header />
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
        </>
      )}
    </>
  );
};

export default Home;
