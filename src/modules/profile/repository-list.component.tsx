import React from "react";
import {
  Button,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";

import { useAuthenticate } from "@src/domain";
import { Repository, User } from "@src/model";
import { AppStrings } from "@src/strings";
import { CreateRepository, RepositoryCard } from "@src/modules/repository";

interface RepositoryListProps {
  user: User;
  repositoryList: Repository[];
}

const profileStrings = AppStrings.Profile;
const repositoryStrings = AppStrings.Repository;

export const RepositoryList = ({
  user,
  repositoryList,
}: RepositoryListProps) => {
  const { user: loggedUser } = useAuthenticate();

  const [repositories, setRepositories] =
    React.useState<Repository[]>(repositoryList);

  const { nickname } = user;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <>
      <VStack spacing={6} py="3rem" px="3rem" w="100%" align="start">
        <HStack spacing={4} mb="2rem">
          <Heading size="md">{profileStrings.myRepositories}</Heading>
          {loggedUser?.nickname === nickname && (
            <Button
              leftIcon={<Icon as={FiBookmark} />}
              colorScheme="green"
              size="xs"
              justifyContent="flex-end"
              onClick={onOpen}
            >
              {repositoryStrings.create.createButton}
            </Button>
          )}
        </HStack>
        {repositories?.map((repository) => (
          <RepositoryCard
            key={repository.id}
            repository={repository}
            nickname={nickname}
          />
        ))}
      </VStack>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="2xl">
            {repositoryStrings.create.creationTitle}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateRepository
              onSetRepositories={setRepositories}
              onCreationCompleted={onClose}
            />
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
