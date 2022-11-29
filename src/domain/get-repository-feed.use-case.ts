import { Repository, RepositoryDatasource } from "@src/model";
import { nextApi } from "@src/services";

interface UsePostFeed {
  getRepositories: (data: RepositoryFeedUseCaseParams) => Promise<Repository[]>;
}

interface RepositoryFeedUseCaseParams {
  userId: string;
  pageNumber: number;
}

export const useGetRepositoryFeed = (): UsePostFeed => {
  const getRepositories = async ({
    userId,
    pageNumber,
  }: RepositoryFeedUseCaseParams): Promise<Repository[]> => {
    const { data } = await nextApi.post("/home/repository", {
      userId,
      pageNumber,
    });

    const responseRepositories = data.folders;

    return responseRepositories?.map((repository: RepositoryDatasource) => {
      return {
        id: repository.id,
        title: repository.title,
        description: repository.description,
        repositoryNickname: repository.nickname,
        creationDate: repository.creationDate,
        lastUpdateDate: repository.lastUpdateDate,
      };
    });
  };

  return { getRepositories };
};
