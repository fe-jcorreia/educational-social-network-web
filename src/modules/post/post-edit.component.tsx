import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  HStack,
  Icon,
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
import { BiCheck, BiTrash } from "react-icons/bi";

import { AppStrings } from "@src/strings";
import { useAuthenticate, useUpdatePost } from "@src/domain";
import { EditPostForm, Post } from "@src/model";
import { Input, TextArea } from "@src/components";

interface RepositoryCardProps {
  post: Post;
  onEditingPost: (data: boolean) => void;
  onEditPostList: React.Dispatch<React.SetStateAction<Post[]>>;
  onEditPost: (data: Post) => void;
}

const strings = AppStrings.Post;

const postEditSchema = yup.object().shape({
  title: yup.string().required(strings.create.postRequirementes.title).trim(),
  subtitle: yup
    .string()
    .required(strings.create.postRequirementes.subtitle)
    .trim(),
  text: yup.string().required(strings.create.postRequirementes.text).trim(),
});

export const PostEdit = ({
  post,
  onEditingPost,
  onEditPostList,
  onEditPost,
}: RepositoryCardProps) => {
  const { id, repositoryNickname, title, subtitle, text } = post;
  const { user } = useAuthenticate();
  const { updatePost } = useUpdatePost();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const { register, handleSubmit, formState } = useForm<EditPostForm>({
    resolver: yupResolver(postEditSchema),
  });
  const errors = formState.errors;

  const handleEditPost: SubmitHandler<EditPostForm> = async (credentials) => {
    const newPost = await updatePost({ id, userId: user.id, ...credentials });

    onEditPostList((prev) =>
      prev.map((postData) => (postData.id === newPost.id ? newPost : postData))
    );
    onEditPost(newPost);
    onEditingPost(false);
  };

  const handleDeletePost = () => {};

  return (
    <>
      <VStack
        w="100%"
        as="form"
        spacing={4}
        onSubmit={handleSubmit(handleEditPost)}
      >
        <Input
          label={strings.edit.fields.title}
          value={title}
          error={errors.title}
          {...register("title")}
        />
        <Input
          label={strings.edit.fields.subtitle}
          value={subtitle}
          error={errors.subtitle}
          {...register("subtitle")}
        />
        <TextArea
          height="500px"
          label={strings.edit.fields.text}
          value={text}
          error={errors.text}
          {...register("text")}
        />

        {user?.nickname === repositoryNickname && (
          <HStack spacing={4}>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={formState.isSubmitting}
            >
              <Icon mr="0.5rem" as={BiCheck} /> {strings.edit.editButton}
            </Button>

            <Button variant="outline" colorScheme="red" onClick={onOpen}>
              <Icon mr="0.5rem" as={BiTrash} /> {strings.edit.deleteButton}
            </Button>
          </HStack>
        )}
      </VStack>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="lg">
            {strings.edit.onDelete.deleteConfirmation}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>{strings.edit.onDelete.confirmationWarning}</Text>
              <Button w="100%" colorScheme="teal" onClick={onClose}>
                {strings.edit.onDelete.declineButton}
              </Button>

              <Button
                w="100%"
                variant="outline"
                colorScheme="red"
                onClick={handleDeletePost}
              >
                {strings.edit.onDelete.deleteButton}
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
