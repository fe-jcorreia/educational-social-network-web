import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  Icon,
  VStack,
  Flex,
  Heading,
  HStack,
  Divider,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import {
  FcCollaboration,
  FcConferenceCall,
  FcFilingCabinet,
  FcShop,
} from "react-icons/fc";
import { FiStar } from "react-icons/fi";

const Dashboard: NextPage = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" mx="1rem" pt="1rem">
      <GridItem>
        <MenuComponent />
      </GridItem>
      <GridItem colStart={2} colEnd={5}>
        <PostComponent />
        <PostComponent />
        <PostComponent />
        <PostComponent />
      </GridItem>
      <GridItem>
        <Heading fontSize="sm" mb="1rem">
          Explore outros repositórios
        </Heading>
        <FriendComponent />
        <FriendComponent />
        <FriendComponent />
        <Text fontSize="xs">Explore mais</Text>
      </GridItem>
    </Grid>
  );
};

const PostComponent = () => {
  return (
    <Box maxW="70%" mx="auto">
      <Flex align="center" mb="0.5rem">
        <Avatar size="sm" name="Jorge Kinoshita" mr="0.5rem" />
        <Text mr="0.5rem">
          <strong>Jorge Kinoshita</strong> compartilhou um{" "}
          <strong>arquivo</strong>
        </Text>
        <Text fontSize="xs">4 semanas atrás</Text>
      </Flex>
      <Box p="0.75rem" border="1px" borderColor="gray.300" borderRadius="10px">
        <Heading mb="0.25rem" fontSize="lg">
          sistemas-operacionais/Turma 2021
        </Heading>
        <Text fontSize="sm" mb="0.5rem">
          Sistemas operacionais para POLI-USP
        </Text>

        <HStack spacing="2rem">
          <Flex>
            <Icon size="xs" as={FiStar} mr="0.2rem" />{" "}
            <Text fontSize="xs">98</Text>
          </Flex>

          <Text fontSize="xs">Atualizado ontem</Text>
        </HStack>
      </Box>
      <Divider my="1.5rem" />
    </Box>
  );
};

const MenuComponent = () => {
  return (
    <VStack alignItems="start">
      <Button
        leftIcon={<Icon as={FcFilingCabinet} />}
        size="lg"
        variant="ghost"
        colorScheme="teal"
        w="100%"
        justifyContent="flex-start"
      >
        Meus repositórios
      </Button>
      <Button
        leftIcon={<Icon as={FcCollaboration} />}
        size="lg"
        variant="ghost"
        colorScheme="teal"
        w="100%"
        justifyContent="flex-start"
      >
        Amigos
      </Button>
      <Button
        leftIcon={<Icon as={FcConferenceCall} />}
        size="lg"
        variant="ghost"
        colorScheme="teal"
        w="100%"
        justifyContent="flex-start"
      >
        Grupos
      </Button>
      <Button
        leftIcon={<Icon as={FcShop} />}
        size="lg"
        variant="ghost"
        colorScheme="teal"
        w="100%"
        justifyContent="flex-start"
      >
        Marketplace
      </Button>
    </VStack>
  );
};

const FriendComponent = () => {
  return (
    <>
      <Box alignItems="center" mb="1rem">
        <Heading textAlign="left" fontSize="xs">
          tamytakara/formar-na-poli
        </Heading>
        <Text fontSize="xs" textAlign="left" mb="0.5rem">
          Repositório destinados a todos os amiguinhos que estão na jornada de
          se formar na escola politécnica com todos os conhecimentos acumulados
          da maior guru dessa escola
        </Text>
        <Flex>
          <Icon size="xs" as={FiStar} mr="0.2rem" />{" "}
          <Text fontSize="xs">1506</Text>
        </Flex>
      </Box>
      <Divider my="0.5rem" />
    </>
  );
};

export default Dashboard;
