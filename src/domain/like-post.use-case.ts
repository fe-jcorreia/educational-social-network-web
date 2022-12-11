import { nextApi } from "@src/services";

interface UseLikePost {
  likePost: (data: LikePostUseCaseParams) => Promise<void>;
  deslikePost: (data: LikePostUseCaseParams) => Promise<void>;
}

interface LikePostUseCaseParams {
  postId: string;
  userId: string;
}

export const useLikePost = (): UseLikePost => {
  const likePost = async ({
    postId,
    userId,
  }: LikePostUseCaseParams): Promise<void> => {
    await nextApi.post("/post/like", {
      input: {
        id: postId,
        userId,
      },
    });
  };

  const deslikePost = async ({
    postId,
    userId,
  }: LikePostUseCaseParams): Promise<void> => {
    await nextApi.post("/post/deslike", {
      input: {
        id: postId,
        userId,
      },
    });
  };

  return { likePost, deslikePost };
};
