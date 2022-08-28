export type RepositoryData = {
  title: string;
  description: string;
  stars: number;
  hasLiked: boolean;
};

export type Repository = {
  id: string;
  username: string;
  creationDate: string;
  lastUpdateDate: string;
  repositoryTitle: string;
  repositoryDescription: string;
  stars: number;
  hasLiked: boolean;
};