export type ProfileData = {
  username: string;
  name: string;
  lastName: string;
  bio: string;
  email: string;
  role: string;
  location: Location;
  repositories: Repository[];
};

export type Location = {
  city: string;
  state: string;
  country: string;
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
