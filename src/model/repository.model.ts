export type Repository = {
  id: string;
  title: string;
  description: string;
  repositoryNickname: string;
  creationDate: string;
  lastUpdateDate: string;
};

export type RepositoryDatasource = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  lastUpdateDate: string;
  nickname: string;
};

export type CreateRepositoryForm = {
  title: string;
  description: string;
};

export type EditRepositoryForm = {
  title: string;
  description: string;
};
