import { Post } from "@src/model";
import { nextApi } from "@src/services";

interface UseUpdatePost {
  updatePost: (data: UpdatePostUseCaseParams) => Promise<Post>;
}

interface UpdatePostUseCaseParams {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  text: string;
  image?: string;
  category?: string;
}

export const useUpdatePost = (): UseUpdatePost => {
  const updatePost = async ({
    id,
    userId,
    title,
    subtitle,
    text,
    image,
    category,
  }: UpdatePostUseCaseParams): Promise<Post> => {
    const { data } = await nextApi.post("/post/update", {
      input: {
        id,
        userId,
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

  return { updatePost };
};
