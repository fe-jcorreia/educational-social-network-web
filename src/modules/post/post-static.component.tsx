import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";

import { AppStrings, replaceTemplateString } from "@src/strings";
import { getLowerCasePastTime } from "@src/utils";
import { useAuthenticate } from "@src/domain";
import { Post } from "@src/model";

interface RepositoryCardProps {
  post: Post;
  notInRepositoryView?: boolean;
  onEditingPost?: (data: boolean) => void;
}

const strings = AppStrings.Post;

export const PostStatic = ({
  post,
  onEditingPost,
  notInRepositoryView,
}: RepositoryCardProps) => {
  const {
    repositoryNickname,
    stars,
    likeList,
    creationDate,
    lastUpdateDate,
    title,
    subtitle,
    text,
    image,
  } = post;
  const { user } = useAuthenticate();

  const [trimText, setTrimText] = React.useState(true);
  const [liked, setLiked] = React.useState(likeList.includes(user.id));

  const handleLikePost = () => {
    console.log("update star");
    setLiked((prevState) => !prevState);
  };

  return (
    <>
      <Box
        p="0.75rem"
        border="1px"
        borderColor="gray.300"
        borderRadius="10px"
        w="100%"
      >
        <Heading mb="0.25rem" fontSize="2xl" textAlign="start">
          {title}
        </Heading>
        <Heading mb="0.5rem" fontSize="sm" textAlign="start">
          {subtitle}
        </Heading>
        <Text fontSize="sm" mb="1rem" textAlign="justify">
          {trimText ? text.split(" ").slice(0, 50).join(" ") : text}
          {trimText && (
            <Link>
              <strong onClick={() => setTrimText(false)}>
                {strings.expandText}
              </strong>
            </Link>
          )}
        </Text>
        {image && (
          <Image
            boxSize="100%"
            objectFit="cover"
            src={image}
            alt="image"
            mb="1rem"
          />
        )}

        <HStack spacing="2rem">
          <Link onClick={handleLikePost}>
            <Flex>
              <Icon
                size="xs"
                as={FaStar}
                color={liked ? "orange" : ""}
                mr="0.2rem"
              />{" "}
              <Text fontSize="sm">{stars}</Text>
            </Flex>
          </Link>

          {creationDate && (
            <Text fontSize="xs">
              {replaceTemplateString(strings.createdAt, {
                date: getLowerCasePastTime(new Date(creationDate)),
              })}
            </Text>
          )}

          {lastUpdateDate && (
            <Text fontSize="xs">
              {replaceTemplateString(strings.updatedAt, {
                date: getLowerCasePastTime(new Date(lastUpdateDate)),
              })}
            </Text>
          )}
        </HStack>
      </Box>

      {user?.nickname === repositoryNickname && !notInRepositoryView && (
        <Button
          variant="outline"
          onClick={() => onEditingPost && onEditingPost(true)}
          colorScheme="teal"
        >
          <Icon mr="0.5rem" as={BiEditAlt} /> {strings.description.editButton}
        </Button>
      )}
    </>
  );
};
