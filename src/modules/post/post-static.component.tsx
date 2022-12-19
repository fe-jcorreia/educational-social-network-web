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
import { formatDayMontYearDate } from "@src/utils";
import { useAuthenticate, useLikePost } from "@src/domain";
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
    id,
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
  const { likePost, deslikePost } = useLikePost();

  const [trimText, setTrimText] = React.useState(true);
  const [liked, setLiked] = React.useState(likeList.includes(user.id));
  const [likeCount, setLikeCount] = React.useState(stars);

  const handleLikePost = () => {
    if (liked) {
      deslikePost({ postId: id, userId: user.id });
    } else {
      likePost({ postId: id, userId: user.id });
    }

    let starsCount;
    if (likeList.includes(user.id)) {
      starsCount = liked ? stars - 1 : stars;
    } else {
      starsCount = liked ? stars : stars + 1;
    }

    setLikeCount(starsCount);
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
        <Text fontSize="sm" mb="1rem" textAlign="justify" whiteSpace="pre-wrap">
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
          <>
            {image.substring(image.length - 3) === "mp4" ? (
              <Image
                as="video"
                controls
                boxSize="100%"
                objectFit="cover"
                src={image}
                alt="image"
                mb="1rem"
              />
            ) : (
              <Image
                boxSize="100%"
                objectFit="cover"
                src={image}
                alt="image"
                mb="1rem"
              />
            )}
          </>
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
              <Text fontSize="sm">{likeCount}</Text>
            </Flex>
          </Link>

          {creationDate && (
            <Text fontSize="xs">
              {replaceTemplateString(strings.createdAt, {
                date: formatDayMontYearDate(creationDate),
              })}
            </Text>
          )}

          {lastUpdateDate && (
            <Text fontSize="xs">
              {replaceTemplateString(strings.updatedAt, {
                date: formatDayMontYearDate(lastUpdateDate),
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
