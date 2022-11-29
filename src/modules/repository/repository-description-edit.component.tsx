import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Heading,
  HStack,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import { BiCheck, BiTrash } from "react-icons/bi";

import { EditRepositoryForm, Repository } from "@src/model";
import { Input, TextArea } from "@src/components";
import { useAuthenticate, useUpdateRepository } from "@src/domain";
import { AppStrings } from "@src/strings";

interface RepositoryDescriptionEditProps {
  onSetRepository: (data: Repository) => void;
  onSetEditRepository: (data: boolean) => void;
  nickname: string;
  repository: Repository;
}

const strings = AppStrings.Repository.edit;

const repositoryEditSchema = yup.object().shape({
  title: yup.string().required(strings.requiredTitle).trim(),
  description: yup.string().trim(),
});

export const RepositoryDescriptionEdit = ({
  onSetRepository,
  onSetEditRepository,
  nickname,
  repository,
}: RepositoryDescriptionEditProps) => {
  const { user } = useAuthenticate();
  const { updateRepository } = useUpdateRepository();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const { register, handleSubmit, formState } = useForm<EditRepositoryForm>({
    resolver: yupResolver(repositoryEditSchema),
  });
  const errors = formState.errors;

  const handleEditRepository: SubmitHandler<EditRepositoryForm> = async (
    credentials
  ) => {
    const newRepository = await updateRepository({
      id: repository.id,
      userId: user?.id,
      ...credentials,
    });

    onSetRepository(newRepository);
    onSetEditRepository(false);
  };

  const handleDeleteRepository = () => {};

  return (
    <>
      <VStack
        as="form"
        align="start"
        w="90%"
        spacing={4}
        onSubmit={handleSubmit(handleEditRepository)}
      >
        <HStack spacing={2}>
          <Heading size="md">
            <Icon as={FiBook} />{" "}
            <Link href={`/edu/${nickname}`}>{nickname}</Link>{" "}
          </Heading>
        </HStack>
        <Input
          label={strings.fields.title}
          value={repository.title}
          error={errors.title}
          {...register("title")}
        />
        <TextArea
          label={strings.fields.description}
          value={repository.description}
          error={errors.description}
          {...register("description")}
        />

        <HStack spacing={4}>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={formState.isSubmitting}
          >
            <Icon mr="0.5rem" as={BiCheck} /> {strings.editButton}
          </Button>

          <Button variant="outline" colorScheme="red" onClick={onOpen}>
            <Icon mr="0.5rem" as={BiTrash} /> {strings.deleteButton}
          </Button>
        </HStack>
      </VStack>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="lg">
            {strings.onDelete.deleteConfirmation}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>{strings.onDelete.confirmationWarning}</Text>
              <Button w="100%" colorScheme="teal" onClick={onClose}>
                {strings.onDelete.declineButton}
              </Button>

              <Button
                w="100%"
                variant="outline"
                colorScheme="red"
                onClick={handleDeleteRepository}
              >
                {strings.onDelete.deleteButton}
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
