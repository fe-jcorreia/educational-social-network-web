import React from "react";
import { Box, Divider, Heading, HStack, Link, Text } from "@chakra-ui/react";

import { AppStrings, replaceTemplateString } from "@src/strings";
import { formatDayMontYearDate } from "@src/utils";
import { Repository } from "@src/model";

interface RepositoryCardProps {
  repository: Repository;
  nickname: string;
}

const strings = AppStrings.Repository;

export const RepositoryCard = ({
  repository,
  nickname,
}: RepositoryCardProps) => {
  const { id, creationDate, lastUpdateDate, title, description } = repository;

  return (
    <>
      <Box
        p="0.75rem"
        border="1px"
        borderColor="gray.300"
        borderRadius="10px"
        w="100%"
      >
        <Link href={`/edu/${nickname}/${id}`}>
          <Heading mb="0.25rem" fontSize="lg">
            {title}
          </Heading>
          <Text fontSize="sm" mb="0.5rem">
            {description}
          </Text>
        </Link>

        <HStack spacing="2rem">
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
      <Divider />
    </>
  );
};
