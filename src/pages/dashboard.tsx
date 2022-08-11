import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { FiUser } from "react-icons/fi";

const Dashboard: NextPage = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" mx="1rem" pt="1rem">
      <GridItem>
        <VStack alignItems="start">
          <Button
            leftIcon={<Icon as={FiUser} />}
            variant="ghost"
            colorScheme="teal"
            w="100%"
          >
            Amigos
          </Button>
          <Button
            leftIcon={<Icon as={FiUser} />}
            variant="ghost"
            colorScheme="teal"
            w="100%"
          >
            Grupos
          </Button>
          <Button
            leftIcon={<Icon as={FiUser} />}
            variant="ghost"
            colorScheme="teal"
            w="100%"
          >
            Marketplace
          </Button>
        </VStack>
      </GridItem>
      <GridItem colStart={2} colEnd={5}></GridItem>
      <GridItem></GridItem>
    </Grid>
  );
};

export default Dashboard;
