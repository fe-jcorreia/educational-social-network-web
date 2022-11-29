import React from "react";
import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import { Repository } from "@src/model";

interface HomeRecommendationCardProps {
  repository: Repository;
}

export const HomeRecommendationCard = (props: HomeRecommendationCardProps) => {
  const { title, description, repositoryNickname, id } = props?.repository;

  return (
    <>
      <Box alignItems="center" mb="1rem">
        <Link href={`/edu/${repositoryNickname}/${id}`}>
          <Heading textAlign="left" fontSize="xs">
            {title}
          </Heading>
          <Text fontSize="xs" textAlign="left" mb="0.5rem">
            {description}
          </Text>
        </Link>
      </Box>
      <Divider my="0.5rem" />
    </>
  );
};
