import { Repository } from "./repository.model";

export type UserData = {
  nickname: string;
  name: string;
  description: string;
  email: string;
  career: string;
  location: Location;
};

export type RepositoriesData = {
  repositories: Repository[];
};

export type Location = {
  city: string;
  state: string;
  country: string;
};

export type EditProfileFormData = {
  name: string;
  description: string;
  career: string;
  location: Location;
};
