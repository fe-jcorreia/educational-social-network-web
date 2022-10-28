import React from "react";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { RepositoryData } from "@src/model";
import { Header } from "@src/components";
import Router from "next/router";
import { useAuthenticate } from "@src/domain/account";

interface RepositoryProps {
  repositoryData: RepositoryData;
}

interface ServerSideRepositoryParams extends ParsedUrlQuery {
  repository: string;
}

export default function Repository({ repositoryData }: RepositoryProps) {
  const { title, description } = repositoryData;

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
      <Flex>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { repository } = params as ServerSideRepositoryParams;

  console.log("GET ", repository);
  const response: RepositoryData = MOCK_DATA;

  return {
    props: {
      repositoryData: response,
    },
  };
};

const MOCK_DATA = {
  title: "title",
  description: "description",
  stars: 1507,
  hasLiked: true,
};
