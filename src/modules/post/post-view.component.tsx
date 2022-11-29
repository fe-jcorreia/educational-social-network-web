import React from "react";
import { Heading, Icon, VStack } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";

import { Post } from "@src/model";
import { AppStrings } from "@src/strings";
import { PostEdit } from "./post-edit.component";
import { PostStatic } from "./post-static.component";

interface PostViewProps {
  post?: Post;
  onEditPost: (data: Post) => void;
  onEditPostList: React.Dispatch<React.SetStateAction<Post[]>>;
}

const strings = AppStrings.Post;

export const PostView = ({
  post,
  onEditPost,
  onEditPostList,
}: PostViewProps) => {
  const [editingPost, setEditingPost] = React.useState(false);

  return (
    <>
      {post ? (
        <VStack spacing={6} align="center">
          {editingPost ? (
            <PostEdit
              post={post}
              onEditPost={onEditPost}
              onEditPostList={onEditPostList}
              onEditingPost={setEditingPost}
            />
          ) : (
            <PostStatic post={post} onEditingPost={setEditingPost} />
          )}
        </VStack>
      ) : (
        <VStack spacing={6} align="center">
          <Icon as={FiFile} w={200} h={200} />
          <Heading size="md">{strings.noSelectedPost}</Heading>
        </VStack>
      )}
    </>
  );
};
