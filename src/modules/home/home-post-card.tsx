import { Avatar, Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { RepositoryCard } from "@src/components";
import { HomePostCardData } from "@src/model";
import { AppStrings } from "@src/strings";
import { getPastTime } from "@src/utils";

interface PostComponentProps {
  mainHomePosts: HomePostCardData;
}

const strings = AppStrings.Home.repositoryCards;

export const HomePostCard = (props: PostComponentProps) => {
  const {
    username,
    stars,
    hasLiked,
    creationDate,
    lastUpdateDate,
    repositoryTitle,
    repositoryDescription,
  } = props?.mainHomePosts;

  return (
    <Box maxW="70%" mx="auto">
      <Flex align="center" mb="0.5rem">
        <Link href={`/edu/${username}`}>
          <Avatar size="sm" name={username} mr="0.5rem" />
        </Link>
        <Text mr="0.5rem">
          <Link href={`/edu/${username}`}>
            <strong>{username}</strong>
          </Link>
          {strings.sharedRepository}
          <Link href={`/edu/${username}/${repositoryTitle}`}>
            <strong>{strings.file}</strong>
          </Link>
        </Text>
        <Text fontSize="xs">{getPastTime(new Date(creationDate))}</Text>
      </Flex>

      <RepositoryCard
        repositoryCard={{
          stars,
          hasLiked,
          lastUpdateDate,
          repositoryTitle,
          repositoryDescription,
        }}
        username={username}
      />

      <Divider my="1.5rem" />
    </Box>
  );
};
