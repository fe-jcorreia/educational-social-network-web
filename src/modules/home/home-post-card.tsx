import { Avatar, Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Post } from "@src/model";
import { AppStrings } from "@src/strings";
import { PostStatic } from "@src/modules/post";

interface PostComponentProps {
  post: Post;
}

const strings = AppStrings.Home.repositoryCards;

export const HomePostCard = ({ post }: PostComponentProps) => {
  const { repositoryNickname, repositoryId } = post;

  return (
    <Box maxW="70%" mx="auto">
      <Flex align="center" mb="0.5rem">
        <Link href={`/edu/${repositoryNickname}`}>
          <Avatar size="sm" name={repositoryNickname} mr="0.5rem" />
        </Link>
        <Text mr="0.5rem">
          <Link href={`/edu/${repositoryNickname}`}>
            <strong>{repositoryNickname}</strong>
          </Link>
          {strings.sharedRepository}
          <Link href={`/edu/${repositoryNickname}/${repositoryId}`}>
            <strong>{strings.post}</strong>
          </Link>
        </Text>
      </Flex>

      <PostStatic post={post} notInRepositoryView />

      <Divider my="1.5rem" />
    </Box>
  );
};
