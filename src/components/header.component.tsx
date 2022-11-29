import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { useAuthenticate } from "@src/domain";
import { FiLogOut } from "react-icons/fi";

export function Header() {
  const { user, logged, logout } = useAuthenticate();

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
        <Link href="/dashboard">
          <HStack spacing={0}>
            <Heading fontSize="5xl" fontWeight="600" color="blue.700">
              Edu
            </Heading>
            <Heading fontSize="5xl" fontWeight="600" color="teal.400">
              Share
            </Heading>
          </HStack>
        </Link>

        {logged && (
          <HStack spacing="1rem">
            <HStack spacing="1rem">
              <Button
                leftIcon={<Icon as={FiLogOut} />}
                variant="ghost"
                colorScheme="teal"
                justifyContent="flex-end"
                onClick={logout}
              >
                Logout
              </Button>
              <Link href={`/edu/${user?.nickname}`}>
                <HStack spacing="1rem">
                  <Box
                    textAlign="right"
                    pl="1rem"
                    borderLeft="1px"
                    borderColor="gray.300"
                  >
                    <Text>{user?.name}</Text>
                    <Text color="gray.500" fontSize="small">
                      {user?.email}
                    </Text>
                  </Box>

                  <Avatar size="md" name={user?.name} />
                </HStack>
              </Link>
            </HStack>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
}
