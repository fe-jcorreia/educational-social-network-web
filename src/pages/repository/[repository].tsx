import { Flex, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { RepositoryData } from "@src/model";

interface RepositoryProps {
  repositoryData: RepositoryData;
}

interface ServerSideRepositoryParams extends ParsedUrlQuery {
  repository: string;
}

export default function Repository({ repositoryData }: RepositoryProps) {
  const { title, description } = repositoryData;

  return (
    <Flex>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
    </Flex>
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
