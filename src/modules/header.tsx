import { Flex, Heading, HStack, Link } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      bg="white"
      boxShadow="base"
      pos="sticky"
      top="0"
      as="header"
      zIndex="3"
    >
      <Flex
        maxW="1080px"
        mx="auto"
        h="15vh"
        w="100%"
        align="center"
        justify="space-between"
      >
        <Link href="/">
          <HStack spacing={0}>
            <Heading fontSize="5xl" fontWeight="600" color="blue.700">
              Edu
            </Heading>
            <Heading fontSize="5xl" fontWeight="600" color="teal.400">
              Share
            </Heading>
          </HStack>
        </Link>
      </Flex>
    </Flex>
  );
}
