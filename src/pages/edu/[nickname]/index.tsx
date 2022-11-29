import React from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Flex, Grid, GridItem, Image } from "@chakra-ui/react";

import { Header } from "@src/components";
import { Repository, RepositoryDatasource, User } from "@src/model";
import { useAuthenticate } from "@src/domain";
import { api } from "@src/services";
import { ProfileDescription, RepositoryList } from "@src/modules/profile";

interface ProfileProps {
  user: User;
  repositories: Repository[];
}

interface ServerSideProfileParams extends ParsedUrlQuery {
  nickname: string;
}

export default function ProfilePage({ user, repositories }: ProfileProps) {
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
          <ProfileDescription user={user} />
        </GridItem>

        <GridItem colStart={3} colEnd={6}>
          <RepositoryList user={user} repositoryList={repositories} />
        </GridItem>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { nickname } = params as ServerSideProfileParams;

  const userResponse = await api.get(`/user/nickname/${nickname}`);
  const userData = userResponse.data;

  const user = {
    id: userData.id,
    name: userData.name,
    description: userData.description,
    email: userData.email,
    career: userData.career,
    role: userData.role,
    nickname: userData.nickname,
    location: {
      city: userData.city,
      state: userData.state,
      country: userData.country,
    },
  };

  const repositoryResponse = await api.get(`/folder/user/${user.id}`);
  const repositoryData = repositoryResponse.data;

  const repositories = repositoryData.map(
    (repository: RepositoryDatasource) => {
      return {
        id: repository.id,
        title: repository.title,
        description: repository.description,
        repositoryNickname: repository.nickname,
        creationDate: repository.creationDate,
        lastUpdateDate: repository.lastUpdateDate,
      };
    }
  );

  return {
    props: {
      user,
      repositories,
    },
  };
};
