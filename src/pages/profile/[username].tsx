import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { BiBuildings } from "react-icons/bi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { RepositoryCard } from "@src/components";

import { ProfileData } from "@src/model";
import { AppStrings } from "@src/strings";

interface ProfileProps {
  profileData: ProfileData;
}

interface ServerSideProfileParams extends ParsedUrlQuery {
  username: string;
}

const strings = AppStrings.Profile;

export default function Profile({ profileData }: ProfileProps) {
  const { name, lastName, bio, email, role, username, location, repositories } =
    profileData;

  return (
    <Grid templateColumns="repeat(5, 1fr)" mx="1rem" pt="1rem">
      <GridItem colStart={1} colEnd={3}>
        <VStack py="3rem" px="4rem" w="100%" spacing={4} alignItems="left">
          <Avatar
            size="2xl"
            mb="1rem"
            name={name + lastName}
            alignSelf="center"
          />
          <Box>
            <Heading size="lg">{name + " " + lastName}</Heading>
            <Text size="md">{username}</Text>
          </Box>
          <Text size="lg" fontWeight={500}>
            {bio}
          </Text>
          <VStack spacing={1} align="left" fontWeight={600}>
            <Flex align="center">
              <Icon mr="0.25rem" as={BiBuildings} />
              <Text justifyContent="center">{role}</Text>
            </Flex>
            <Flex align="center">
              <Icon mr="0.25rem" as={HiOutlineLocationMarker} />
              <Text justifyContent="center">{`${location.city} - ${location.state}, ${location.country}`}</Text>
            </Flex>
            <Flex align="center">
              <Icon mr="0.25rem" as={HiOutlineMail} />
              <Text justifyContent="center">{email}</Text>
            </Flex>
          </VStack>
        </VStack>
      </GridItem>

      <GridItem colStart={3} colEnd={6}>
        <VStack spacing={6} py="3rem" px="3rem" w="100%" align="start">
          <Heading size="md" mb="2rem">
            {strings.myRepositories}
          </Heading>
          {repositories?.map((repository) => (
            <>
              <RepositoryCard key={repository.id} repositoryCard={repository} />
              <Divider />
            </>
          ))}
        </VStack>
      </GridItem>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params as ServerSideProfileParams;

  const response: ProfileData = { username, ...MOCK_DATA };

  return {
    props: {
      profileData: response,
    },
  };
};

const MOCK_DATA = {
  name: "Bruno",
  lastName: "Móvio",
  bio: "Brazilian React and Next developer. Javascript, React, React Native and Node.js enthusiast.",
  email: "bruno.movio@gmail.com.br",
  role: "Estudante",
  location: {
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
  },
  repositories: [
    {
      id: "1",
      username: "bmovio",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "2",
      username: "bmovio",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "3",
      username: "bmovio",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "4",
      username: "bmovio",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "5",
      username: "bmovio",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "6",
      username: "bmovio",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
  ],
};
