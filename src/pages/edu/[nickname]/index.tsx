import React from "react";
import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Header, RepositoryCard } from "@src/components";

import { RepositoriesData, UserData } from "@src/model";
import { AppStrings } from "@src/strings";
import { useAuthenticate } from "@src/domain/account";
import Router from "next/router";
import { api } from "@src/services";
import { ProfileDescription } from "@src/modules/profile";

interface ProfileProps {
  userData: UserData;
  repositoryData: RepositoriesData;
}

interface ServerSideProfileParams extends ParsedUrlQuery {
  nickname: string;
}

const strings = AppStrings.Profile;

export default function Profile({ userData, repositoryData }: ProfileProps) {
  const { nickname } = userData;
  const { repositories } = repositoryData;

  const { logged, loading } = useAuthenticate();

  React.useEffect(() => {
    if (!loading && !logged) {
      Router.push("/");
    }
  }, [logged, loading]);

  if (loading || !logged) {
    return (
      <Flex w="100%" h="100vh" alignItems="center" justify="center">
        <Image src="/book.gif" alt="Book Gif" />
      </Flex>
    );
  }

  return (
    <>
      <Header />

      <Grid templateColumns="repeat(5, 1fr)" mx="1rem" pt="1rem">
        <GridItem colStart={1} colEnd={3}>
          <ProfileDescription userData={userData} />
        </GridItem>

        <GridItem colStart={3} colEnd={6}>
          <VStack spacing={6} py="3rem" px="3rem" w="100%" align="start">
            <Heading size="md" mb="2rem">
              {strings.myRepositories}
            </Heading>
            {repositories?.map((repository) => (
              <>
                <RepositoryCard
                  key={repository.id}
                  repositoryCard={repository}
                  username={nickname}
                />
                <Divider />
              </>
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { nickname } = params as ServerSideProfileParams;

  const response = await api.get(`/user/nickname/${nickname}`);
  const user = response.data;

  const userData = {
    name: user.name,
    description: user.description,
    email: user.email,
    career: user.career,
    nickname: user.nickname,
    location: {
      city: user.city,
      state: user.state,
      country: user.country,
    },
  };

  const res = MOCK_DATA;

  return {
    props: {
      userData,
      repositoryData: res,
    },
  };
};

const MOCK_DATA = {
  repositories: [
    {
      id: "1",
      username: "fe-jcorreia2",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "2",
      username: "fe-jcorreia2",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "3",
      username: "fe-jcorreia2",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "4",
      username: "fe-jcorreia2",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "5",
      username: "fe-jcorreia2",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
    {
      id: "6",
      username: "fe-jcorreia2",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-22",
      repositoryTitle: "myApp",
      repositoryDescription: "App de prática dos conhecimentos em NodeJS",
      stars: 15,
      hasLiked: false,
    },
  ],
};
