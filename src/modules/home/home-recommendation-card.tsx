import React from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface HomeRecommendationCardProps {
  recomendationCard: {
    stars: number;
    hasLiked: boolean;
    repositoryTitle: string;
    repositoryDescription: string;
  };
  username: string;
}

export const HomeRecommendationCard = (props: HomeRecommendationCardProps) => {
  const { stars, hasLiked, repositoryTitle, repositoryDescription } =
    props?.recomendationCard;

  const [liked, setLiked] = React.useState(hasLiked);

  const handleUpdateRepositoryStars = () => {
    console.log("update star");
    setLiked((prevState) => !prevState);
  };

  return (
    <>
      <Box alignItems="center" mb="1rem">
        <Link href={`/edu/${props?.username}/${repositoryTitle}`}>
          <Heading textAlign="left" fontSize="xs">
            {repositoryTitle}
          </Heading>
          <Text fontSize="xs" textAlign="left" mb="0.5rem">
            {repositoryDescription}
          </Text>
        </Link>
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
      </Box>
      <Divider my="0.5rem" />
    </>
  );
};
