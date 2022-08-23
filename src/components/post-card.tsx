import React from "react";
import { Box, Flex, Heading, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { AppStrings, replaceTemplateString } from "../strings";
import { getLowerCasePastTime } from "../utils/date-formatter";

interface PostCardProps {
  postCard: {
    stars: number;
    hasLiked: boolean;
    lastUpdateDate: string;
    repositoryTitle: string;
    repositoryDescription: string;
  };
}

const strings = AppStrings.Home.postCards;

export const PostCard = (props: PostCardProps) => {
  const {
    stars,
    hasLiked,
    lastUpdateDate,
    repositoryTitle,
    repositoryDescription,
  } = props?.postCard;

  const [liked, setLiked] = React.useState(hasLiked);

  const handleUpdateRepositoryStars = () => {
    console.log("update star");
    setLiked((prevState) => !prevState);
  };

  return (
    <Box
      p="0.75rem"
      border="1px"
      borderColor="gray.300"
      borderRadius="10px"
      w="100%"
    >
      <Link href="/">
        <Heading mb="0.25rem" fontSize="lg">
          {repositoryTitle}
        </Heading>
        <Text fontSize="sm" mb="0.5rem">
          {repositoryDescription}
        </Text>
      </Link>

      <HStack spacing="2rem">
        <Link onClick={handleUpdateRepositoryStars}>
          <Flex>
            <Icon
              size="xs"
              as={FaStar}
              color={liked ? "orange" : ""}
              mr="0.2rem"
            />{" "}
            <Text fontSize="xs">{stars}</Text>
          </Flex>
        </Link>

        <Text fontSize="xs">
          {replaceTemplateString(strings.updatedAt, {
            date: getLowerCasePastTime(new Date(lastUpdateDate)),
          })}
        </Text>
      </HStack>
    </Box>
  );
};
