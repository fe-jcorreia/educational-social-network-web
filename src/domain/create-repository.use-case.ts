import { Repository } from "@src/model";
import { nextApi } from "@src/services";

interface UseCreateRepository {
  createRepository: (
    data: CreateRepositoryUseCaseParams
  ) => Promise<Repository>;
}

interface CreateRepositoryUseCaseParams {
  userId: string;
  title: string;
  description: string;
}

export const useCreateRepository = (): UseCreateRepository => {
  const createRepository = async ({
    userId,
    title,
    description,
  }: CreateRepositoryUseCaseParams): Promise<Repository> => {
    const { data } = await nextApi.post("/repository/create", {
      input: {
        userId,
        title,
        description,
      },
    });

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      repositoryNickname: data.nickname,
      creationDate: data.creationDate,
      lastUpdateDate: data.lastUpdateDate,
    };
  };

  return { createRepository };
};
