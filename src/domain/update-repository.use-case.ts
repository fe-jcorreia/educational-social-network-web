import { Repository } from "@src/model";
import { nextApi } from "@src/services";

interface UseUpdateRepository {
  updateRepository: (
    data: UpdateRepositoryUseCaseParams
  ) => Promise<Repository>;
}

interface UpdateRepositoryUseCaseParams {
  id: string;
  userId: string;
  title: string;
  description: string;
}

export const useUpdateRepository = (): UseUpdateRepository => {
  const updateRepository = async ({
    id,
    userId,
    title,
    description,
  }: UpdateRepositoryUseCaseParams): Promise<Repository> => {
    const { data } = await nextApi.post("/repository/update", {
      input: {
        id,
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

  return { updateRepository };
};
