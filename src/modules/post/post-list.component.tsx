import React from "react";
import {
  Button,
  Divider,
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";

import { Post } from "@src/model";
import { CreatePostComponent } from "./create-post.component";
import { useAuthenticate } from "@src/domain";
import { AppStrings } from "@src/strings";

interface PostListProps {
  posts: Post[];
  onSetPostList: React.Dispatch<React.SetStateAction<Post[]>>;
  onSetShowPost: (data: Post) => void;
  repositoryId: string;
  nickname: string;
}

const strings = AppStrings.Post;

export const PostList = ({
  posts,
  onSetPostList,
  onSetShowPost,
  repositoryId,
  nickname,
}: PostListProps) => {
  const { user } = useAuthenticate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const PostTopic = ({ post }: { post: Post }) => {
    return (
      <Link w="100%" onClick={() => onSetShowPost(post)}>
        <Heading mb="0.25rem" fontSize="2xl" textAlign="start">
          {post.title}
        </Heading>
        <Heading mb="0.5rem" fontSize="sm" textAlign="start">
          {post.subtitle}
        </Heading>
        <Divider />
      </Link>
    );
  };

  return (
    <>
      <VStack spacing={4} align="start">
        <HStack spacing={6}>
          <Heading size="md">Postagens</Heading>
          {user?.nickname === nickname && (
            <Button
              leftIcon={<Icon as={FiBookmark} />}
              colorScheme="green"
              size="xs"
              justifyContent="flex-end"
              onClick={onOpen}
            >
              {strings.create.createButton}
            </Button>
          )}
        </HStack>

        <Divider />
        {posts.map((post) => (
          <PostTopic key={post.id} post={post} />
        ))}
      </VStack>

      <Modal
        size="4xl"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.900" fontSize="3xl">
            {strings.create.creationTitle}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreatePostComponent
              onSetPostList={onSetPostList}
              onCreationCompleted={onClose}
              repositoryId={repositoryId}
            />
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
