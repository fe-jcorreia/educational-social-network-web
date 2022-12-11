import { Header } from "@src/components";

import { Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Custom500() {
  return (
    <>
      <Header />

      <Flex height="85vh" align="center" justify="center" color="blue.800">
        <Flex flexDir="column" w="40%">
          <Heading fontSize="8xl">500</Heading>
          <Heading fontSize="5xl">Erro no servidor</Heading>
          <Text fontWeight="500" mt="2rem">
            Estamos cuidando disso, volte mais tarde.
          </Text>
        </Flex>
        <Image src={"/blackhole.png"} alt="404" />
      </Flex>
    </>
  );
}
