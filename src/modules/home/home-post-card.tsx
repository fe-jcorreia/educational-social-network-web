import { Avatar, Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { PostCard } from "../../components/post-card";
import { HomePostCardData } from "../../model/home";
import { AppStrings } from "../../strings";
import { getPastTime } from "../../utils/date-formatter";

interface PostComponentProps {
  mainHomePosts: HomePostCardData;
}

const strings = AppStrings.Home.postCards;

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
        <Link href={`/profile/${username}`}>
          <Avatar size="sm" name={username} mr="0.5rem" />
        </Link>
        <Text mr="0.5rem">
          <Link href={`/profile/${username}`}>
            <strong>{username}</strong>
          </Link>
          {strings.sharedRepository}
          <Link href="/">
            <strong>{strings.file}</strong>
          </Link>
        </Text>
        <Text fontSize="xs">{getPastTime(new Date(creationDate))}</Text>
      </Flex>

      <PostCard
        postCard={{
          stars,
          hasLiked,
          lastUpdateDate,
          repositoryTitle,
          repositoryDescription,
        }}
      />

      <Divider my="1.5rem" />
    </Box>
  );
};
