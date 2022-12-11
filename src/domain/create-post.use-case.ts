import { Post } from "@src/model";
import { nextApi } from "@src/services";

interface UseCreatePost {
  createPost: (data: CreatePostUseCaseParams) => Promise<Post>;
}

interface CreatePostUseCaseParams {
  userId: string;
  repositoryId: string;
  title: string;
  subtitle: string;
  text: string;
  image?: string;
  category?: string;
}

export const useCreatePost = (): UseCreatePost => {
  const createPost = async ({
    userId,
    repositoryId,
    title,
    subtitle,
    text,
    image,
    category,
  }: CreatePostUseCaseParams): Promise<Post> => {
    const { data } = await nextApi.post("/post/create", {
      input: {
        userId,
        folderId: repositoryId,
        title,
        subtitle,
        text,
        image,
        tags: { category },
      },
    });

    return {
      id: data.id,
      repositoryNickname: data.nickname,
      creationDate: data.creationDate,
      lastUpdateDate: data.lastUpdateDate,
      repositoryTitle: data.repositoryTitle,
      repositoryId: data.repositoryId,
      title: data.title,
      subtitle: data.subtitle,
      text: data.text,
      image: data.image,
      stars: data.likes,
      likeList: data.usersLiked,
      category: data.tags.category,
    };
  };

  return { createPost };
};
