import { Post, PostDatasource } from "@src/model";
import { nextApi } from "@src/services";
import React from "react";

interface UsePostFeed {
  getPosts: (data: PostFeedUseCaseParams) => Promise<GetPostsResponse>;
}

interface PostFeedUseCaseParams {
  userId: string;
  pageNumber: number;
}

interface GetPostsResponse {
  posts: Post[];
  hasNextPage: boolean;
}

export const useGetPostFeed = (): UsePostFeed => {
  const getPosts = React.useCallback(
    async ({
      userId,
      pageNumber,
    }: PostFeedUseCaseParams): Promise<GetPostsResponse> => {
      const { data } = await nextApi.post("/home/post", {
        userId,
        pageNumber,
      });

      const responsePosts = data.posts;

      return {
        posts: responsePosts?.map((post: PostDatasource) => {
          return {
            id: post.id,
            repositoryNickname: post.nickname,
            creationDate: post.creationDate,
            lastUpdateDate: post.lastUpdateDate,
            repositoryTitle: post.repositoryTitle,
            repositoryId: post.repositoryId,
            title: post.title,
            subtitle: post.subtitle,
            text: post.text,
            image: post.image,
            stars: post.likes,
            likeList: post.usersLiked,
            category: post.tags?.category,
          };
        }),
        hasNextPage: responsePosts?.length === 10,
      };
    },
    []
  );

  return { getPosts };
};
