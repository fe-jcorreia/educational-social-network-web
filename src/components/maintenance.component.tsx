import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export function Maintenance() {
  return (
    <Flex my="9rem" align="center" justify="center" color="blue.800">
      <Flex flexDir="column" w="40%">
        <Heading fontSize="8xl">Oops!</Heading>
        <Heading fontSize="5xl">Em manutenção</Heading>
        <Text fontWeight="500" mt="2rem">
          Estamos trabalhando nisso no momento, volte mais tarde :)
        </Text>
      </Flex>
      <Image src={"/maintenance.png"} alt="manutencao" />
    </Flex>
  );
}
