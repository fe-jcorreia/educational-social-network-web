import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiBuildings, BiEditAlt } from "react-icons/bi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

import { useAuthenticate } from "@src/domain";
import { User } from "@src/model";
import { AppStrings } from "@src/strings";

interface ProfileDescriptionStaticProps {
  profile: User;
  onEdit: (data: boolean) => void;
}

const strings = AppStrings.Profile;

export const ProfileDescriptionStatic = ({
  profile,
  onEdit,
}: ProfileDescriptionStaticProps) => {
  const { user } = useAuthenticate();
  const { name, description, career, email, location, nickname } = profile;

  return (
    <VStack py="3rem" px="4rem" w="100%" spacing={4} alignItems="left">
      <Avatar size="2xl" mb="1rem" name={name} alignSelf="center" />
      <Box>
        <Heading size="lg">{name}</Heading>
        <Text size="md">{nickname}</Text>
      </Box>
      {description && (
        <Text size="lg" fontWeight={500}>
          {description}
        </Text>
      )}
      <VStack spacing={1} align="left" fontWeight={600}>
        {career && (
          <Flex align="center">
            <Icon mr="0.25rem" as={BiBuildings} />
            <Text justifyContent="center">{career}</Text>
          </Flex>
        )}
        {location.city && (
          <Flex align="center">
            <Icon mr="0.25rem" as={HiOutlineLocationMarker} />
            <Text justifyContent="center">{`${location.city} - ${location.state}, ${location.country}`}</Text>
          </Flex>
        )}
        <Flex align="center">
          <Icon mr="0.25rem" as={HiOutlineMail} />
          <Text justifyContent="center">{email}</Text>
        </Flex>
      </VStack>

      {user?.nickname === nickname && (
        <Button
          variant="outline"
          onClick={() => onEdit(true)}
          colorScheme="teal"
        >
          <Icon mr="0.5rem" as={BiEditAlt} /> {strings.description.editButton}
        </Button>
      )}
    </VStack>
  );
};
