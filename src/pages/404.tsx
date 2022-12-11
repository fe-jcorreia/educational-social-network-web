import { Header } from "@src/components";

import { Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <>
      <Header />

      <Flex height="85vh" align="center" justify="center" color="blue.800">
        <Flex flexDir="column" w="40%">
          <Heading fontSize="8xl">404</Heading>
          <Heading fontSize="5xl">Você caiu em um buraco negro</Heading>
          <Text fontWeight="500" mt="2rem">
            Não é essa a página que você está procurando.
          </Text>
        </Flex>
        <Image src={"/blackhole.png"} alt="404" />
      </Flex>
    </>
  );
}
